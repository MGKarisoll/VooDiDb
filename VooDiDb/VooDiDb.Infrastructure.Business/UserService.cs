using System;
using System.Collections.Generic;
using System.Linq;
using NLog;
using VooDiDb.Domain.Core;
using VooDiDb.Domain.Interfaces;
using VooDiDb.Infrastructure.Business.ValidationServices;
using VooDiDb.Services.Core;
using VooDiDb.Services.Core.MappingExtensions;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.Infrastructure.Business {
    public class UserService : IUserService {
        private readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly IRepository<User> repository;

        public UserService(IRepository<User> repository) {
            this.repository = repository;
        }

        public UserDTO Create(UserRegistrationDTO userRegistrationDTO, string login) {
            try {
                if(this.repository.FindBy(x => x.Login == login).Role != UserRolesEnum.Administrator)
                    throw new ArgumentException("User has no permissions to add new user.", nameof(login));

                var user = userRegistrationDTO.MapToUser();
                this.repository.Insert(user);
                this.logger?.Trace(new { Message = "User created", Value = user, CreatedByUserLogin = login });
                return this.repository.FindBy(x => x.Login == user.Login).MapToUserDTO();
            } catch(Exception exception) {
                this.logger?.Error(exception);
                throw;
            }
        }

        public ICollection<UserDTO> Get(string login) {
            var currentUser = this.repository.FindBy(x => x.Login == login);
            IQueryable<User> query;
            switch(currentUser.Role) {
                case UserRolesEnum.Administrator:
                    query = this.repository.GetAll();
                    break;
                case UserRolesEnum.User:
                    query = this.repository.GetAll(x => !x.IsDeleted);
                    break;
                default:
                    return new UserDTO[] { };
            }

            return query.ToList().Select(x => x.MapToUserDTO()).ToList();
        }

        public object GetService(Type serviceType) {
            if(serviceType == typeof(CreationUserValidationService))
                return new CreationUserValidationService(this.repository);
            if(serviceType == typeof(EditionUserValidationService))
                return new EditionUserValidationService(this.repository);
            return null;
        }

        public UserDTO Update(UserDTO user, string login) {
            var currentUser = this.repository.FindBy(x => x.Login == login);
            if(currentUser.Role != UserRolesEnum.Administrator) throw new ArgumentException("User has no permissions to edit user.", nameof(login));
            this.repository.Update(user.MapToUser());
            return this.repository.FindById(user.Id).MapToUserDTO();
        }

        public int Delete(long userId, string login) {
            var currentUser = this.repository.FindBy(x => x.Login == login);
            if(currentUser.Role != UserRolesEnum.Administrator) throw new ArgumentException("User has no permissions to delete user.", nameof(login));
            var entry = this.repository.FindById(userId);
            entry.IsDeleted = true;
            return this.repository.Update(entry);
        }

        public UserDTO LogIn(UserLoginDTO loginModel) {
            try {
                var item = loginModel.MapToUser();
                var user = this.repository.FindBy(x =>
                    x.Login == item.Login && x.Password == item.Password && x.IsDeleted == item.IsDeleted);
                if(user != null) {
                    this.logger?.Trace(new { Message = "User logged in", Value = new { user.Login } });
                    return user.MapToUserDTO();
                }

                this.logger?.Warn(new { Message = "User can not log in", Value = new { loginModel.Login } });
                return null;
            } catch(Exception exception) {
                this.logger?.Error(new { exception.Message, exception.InnerException, exception.StackTrace });
                return null;
            }
        }
    }
}

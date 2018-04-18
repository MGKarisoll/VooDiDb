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
        private readonly Logger m_logger = LogManager.GetCurrentClassLogger();
        private readonly IRepository<User> m_repository;

        public UserService(IRepository<User> repository) {
            this.m_repository = repository;
        }

        public UserDTO Create(UserRegistrationDTO userRegistrationDTO, string login) {
            try {
                if(this.m_repository.FindBy(x => x.Login == login).Role != UserRoles.ADMINISTRATOR)
                    throw new ArgumentException("User has no permissions to add new user.", nameof(login));

                var user = userRegistrationDTO.MapToUser();
                this.m_repository.Insert(user);
                this.m_logger?.Trace(new { Message = "User created", Value = user, CreatedByUserLogin = login });
                return this.m_repository.FindBy(x => x.Login == user.Login).MapToUserDTO();
            } catch(Exception exception) {
                this.m_logger?.Error(exception);
                throw;
            }
        }

        public IQueryable<UserDTO> Get(string login) {
            var currentUser = this.m_repository.FindBy(x => x.Login == login);
            IQueryable<User> query;
            switch(currentUser.Role) {
                case UserRoles.ADMINISTRATOR:
                    query = this.m_repository.GetAll();
                    break;
                case UserRoles.USER:
                    query = this.m_repository.GetAll(x => !x.IsDeleted);
                    break;
                default:
                    return new List<UserDTO>().AsQueryable();
            }

            return query.OrderBy(x => x.Id).Select(x => new UserDTO {
                Login = x.Login,
                Id = x.Id,
                Name = x.Name,
                FullName = x.FullName,
                Role = x.Role,
                PostId = x.PostId,
                DepartmentId = x.DepartmentId,
                RowVersion = x.RowVersion,
                SortOrder = x.SortOrder,
                IsActive = !x.IsDeleted
            });
        }

        public UserDTO Get(long id, string login) {
            var currentUser = this.m_repository.FindBy(x => x.Login == login);
            if(currentUser == null) return null;
            if(currentUser.Role == UserRoles.ADMINISTRATOR) {
                if(id == 0)
                    return new User {
                        PostId = 1,
                        Role = UserRoles.USER,
                        DepartmentId = 1
                    }.MapToUserDTO();

                return this.m_repository.FindById(id).MapToUserDTO();
            }

            return this.m_repository.FindBy(x => x.Id == id && !x.IsDeleted).MapToUserDTO();
        }

        public object GetService(Type serviceType) {
            if(serviceType == typeof(CreationUserValidationService))
                return new CreationUserValidationService(this.m_repository);
            if(serviceType == typeof(EditionUserValidationService))
                return new EditionUserValidationService(this.m_repository);
            return null;
        }

        public UserDTO Update(UserDTO user, string login) {
            var currentUser = this.m_repository.FindBy(x => x.Login == login);
            if(currentUser.Role != UserRoles.ADMINISTRATOR) throw new ArgumentException("User has no permissions to edit user.", nameof(login));
            var entryUser = this.m_repository.FindById(user.Id);
            var updatingUser = user.MapToUser();
            updatingUser.Password = entryUser.Password;
            this.m_repository.Update(updatingUser);
            return this.m_repository.FindById(user.Id).MapToUserDTO();
        }

        public int Delete(long userId, string login) {
            var currentUser = this.m_repository.FindBy(x => x.Login == login);
            if(currentUser.Role != UserRoles.ADMINISTRATOR) throw new ArgumentException("User has no permissions to delete user.", nameof(login));
            var entry = this.m_repository.FindById(userId);
            entry.IsDeleted = true;
            return this.m_repository.Update(entry) == null ? 0 : 1;
        }

        public IDictionary<string, string> GetUserDetails(long id) {
            var entry = this.m_repository.FindById(id);
            if(entry == null) return null;
            return new Dictionary<string, string> {
                { "Department", entry.Department.Name },
                { "Post", entry.Post.Name }
            };
        }

        public UserDTO LogIn(UserLoginDTO loginModel) {
            try {
                var item = loginModel.MapToUser();
                var user = this.m_repository.FindBy(x =>
                    x.Login == item.Login && x.Password == item.Password && x.IsDeleted == item.IsDeleted);
                if(user != null) {
                    this.m_logger?.Trace(new { Message = "User logged in", Value = new { user.Login } });
                    return user.MapToUserDTO();
                }

                this.m_logger?.Warn(new { Message = "User can not log in", Value = new { loginModel.Login } });
                return null;
            } catch(Exception exception) {
                this.m_logger?.Error(new { exception.Message, exception.InnerException, exception.StackTrace });
                return null;
            }
        }
    }
}

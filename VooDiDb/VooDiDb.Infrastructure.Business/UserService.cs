using System;
using System.Collections.Generic;
using System.Linq;
using NLog;
using VooDiDb.Domain.Core;
using VooDiDb.Domain.Interfaces;
using VooDiDb.Infrastructure.Business.ValidationServices;
using VooDiDb.Services.Core;
using VooDiDb.Services.Interfaces;
using VooDiDb.Utilites.Util;

namespace VooDiDb.Infrastructure.Business {
    public class UserService : IUserService {
        private readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly IRepository<User> repository;

        public UserService(IRepository<User> repository) {
            this.repository = repository;
        }

        public void RegisterUser(UserRegistrationDTO userRegistrationDTO, int currentUserId) {
            var userModel = new UserDTO
            {
                Login = userRegistrationDTO.Login,
                Department = new DepartmentDTO { Id = userRegistrationDTO.DepartmentId },
                FullName = userRegistrationDTO.FullName,
                Name = userRegistrationDTO.Name,
                Post = new PostDTO { Id = userRegistrationDTO.PostId },
                Role = userRegistrationDTO.Role
            };
            var loginModel = new LoginDTO { Login = userRegistrationDTO.Login, Password = userRegistrationDTO.Password };
            try
            {
                if (this.repository.FindById(currentUserId).Role != UserRolesEnum.Administrator)
                    throw new ArgumentException("User has no permissions to add new user.", nameof(currentUserId));

                var user = new User
                {
                    DepartmentId = userModel.Department.Id,
                    FullName = userModel.FullName,
                    Name = userModel.Name,
                    Login = userModel.Login,
                    Password = Security.GetMd5HashString(loginModel.Password),
                    PostId = userModel.Post.Id,
                    Role = userModel.Role
                };

                this.repository.Insert(user);
                this.logger?.Trace(new { Message = "User created", Value = user, CreatedByUserId = currentUserId });
            }
            catch (Exception exception)
            {
                this.logger?.Error(exception);
                throw;
            }
        }

        public UserDTO LogIn(LoginDTO loginModel) {
            try {
                var passwordHash = Security.GetMd5HashString(loginModel.Password);
                var user = this.repository.FindBy(x =>
                    x.Login == loginModel.Login && x.Password == passwordHash && !x.IsDeleted);
                if(user != null) {
                    this.logger?.Trace(new { Message = "User logged in", Value = new { user.Login } });
                    return new UserDTO {
                        Id = user.Id.ToString("D"),
                        Login = user.Login,
                        FullName = user.FullName,
                        Name = user.Name,
                        Department = new DepartmentDTO {
                            Id = user.Department.Id,
                            Name = user.Department.Name,
                            FullName = user.Department.FullName
                        },
                        Post = new PostDTO {
                            Id = user.Post.Id,
                            Name = user.Post.Name
                        },
                        Role = user.Role
                    };
                }

                this.logger?.Warn(new { Message = "User can not log in", Value = new { loginModel.Login } });
                return null;
            } catch(Exception exception) {
                this.logger?.Error(new { exception.Message, exception.InnerException, exception.StackTrace });
                return null;
            }
        }

        public IEnumerable<UserDTO> GetUsers(int currentUserId) {
            var currentUser = this.repository.FindById(currentUserId);
            switch(currentUser.Role) {
                case UserRolesEnum.Administrator:
                    return this.repository.GetAll().Select(x => new UserExtendedDTO {
                        Login = x.Login,
                        Id = x.Id.ToString(),
                        Department = new DepartmentDTO { Id = x.Department.Id, FullName = x.Department.FullName, Name = x.Department.Name },
                        FullName = x.FullName,
                        Name = x.Name,
                        Role = x.Role,
                        Post = new PostDTO { Id = x.Post.Id, Name = x.Post.Name },
                        IsDeleted = x.IsDeleted
                    });
                case UserRolesEnum.User:
                    return this.repository.GetAll(x => !x.IsDeleted).Select(x => new UserDTO {
                        Login = x.Login,
                        Id = x.Id.ToString(),
                        Department = new DepartmentDTO { Id = x.Department.Id, FullName = x.Department.FullName, Name = x.Department.Name },
                        FullName = x.FullName,
                        Name = x.Name,
                        Role = x.Role,
                        Post = new PostDTO { Id = x.Post.Id, Name = x.Post.Name }
                    });
                default:
                    return new UserDTO[] { };
            }
        }

        public void EditUser(UserEditDTO user, int currentUserId) {
            var currentUser = this.repository.FindById(currentUserId);
            if (currentUser.Role != UserRolesEnum.Administrator) throw new ArgumentException(nameof(currentUserId));
        }

        public object GetService(Type serviceType) {
            if(serviceType == typeof(CreationUserValidationService))
                return new CreationUserValidationService(this.repository);
            return null;
        }
    }
}

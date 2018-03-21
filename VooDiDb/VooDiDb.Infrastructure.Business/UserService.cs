using System;
using NLog;
using VooDiDb.Domain.Core;
using VooDiDb.Domain.Interfaces;
using VooDiDb.Infrastructure.Business.ValidationServices;
using VooDiDb.Services.Core;
using VooDiDb.Services.Interfaces;
using VooDiDb.Utilites.Util;

namespace VooDiDb.Infrastructure.Business
{
    public class UserService : IUserService
    {
        private readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly IRepository<User> repository;

        public UserService(IRepository<User> repository)
        {
            this.repository = repository;
        }

        public void RegisterUser(UserDTO userModel, LoginDTO loginModel, int registratorUserId)
        {
            try
            {
                if (repository.FindById(registratorUserId).Role != UserRolesEnum.Administrator)
                    throw new ArgumentException("User has no permissions to add new user.", nameof(registratorUserId));

                var user = new User
                {
                    DepartmentId = 1,
                    FullName = userModel.FullName,
                    Name = userModel.Name,
                    Login = userModel.Login,
                    Password = Security.GetMd5HashString(loginModel.Password),
                    PostId = 1,
                    Role = UserRolesEnum.User
                };

                repository.Insert(user);
                logger?.Trace(new {Message = "User created", Value = user, CreatedByUserId = registratorUserId});
            }
            catch (Exception exception)
            {
                logger?.Error(exception);
                throw;
            }
        }

        public UserDTO LogIn(LoginDTO loginModel)
        {
            try
            {
                var passwordHash = Security.GetMd5HashString(loginModel.Password);
                var user = repository.FindBy(x =>
                    x.Login == loginModel.Login && x.Password == passwordHash && !x.IsDeleted);
                if (user != null)
                {
                    logger?.Trace(new {Message = "User logged in", Value = new {user.Login}});
                    return new UserDTO
                    {
                        Id = user.Id.ToString("N"),
                        Login = user.Login,
                        FullName = user.FullName,
                        Name = user.Name,
                        Department = new DepartmentDTO
                        {
                            Id = user.Department.Id,
                            Name = user.Department.Name,
                            FullName = user.Department.FullName
                        },
                        Post = new PostDTO
                        {
                            Id = user.Post.Id,
                            Name = user.Post.Name
                        },
                        Role = user.Role
                    };
                }

                logger?.Warn(new { Message = "User can not log in", Value = new { loginModel.Login } });
                return null;
            }
            catch (Exception exception)
            {
                logger?.Error(new {exception.Message, exception.InnerException, exception.StackTrace});
                return null;
            }
        }

        public object GetService(Type serviceType)
        {
            if (serviceType == typeof(CreationUserValidationService))
                return new CreationUserValidationService(repository);
            return null;
        }
    }
}
using System;
using VooDiDb.Services.Core;

namespace VooDiDb.Services.Interfaces
{
    public interface IUserService : IServiceProvider
    {
        void RegisterUser(UserDTO user, LoginDTO login, int registratorUserId);
        UserDTO LogIn(LoginDTO loginModel);
    }
}
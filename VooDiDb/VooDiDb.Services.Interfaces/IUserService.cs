using System;
using System.Collections.Generic;
using VooDiDb.Services.Core;

namespace VooDiDb.Services.Interfaces
{
    public interface IUserService : IServiceProvider
    {
        void RegisterUser(UserRegistrationDTO userRegistrationDTO, int currentUserId);
        UserDTO LogIn(LoginDTO loginModel);

        IEnumerable<UserDTO> GetUsers(int currentUserId);

        void EditUser(UserEditDTO user, int currentUserId);
    }
}
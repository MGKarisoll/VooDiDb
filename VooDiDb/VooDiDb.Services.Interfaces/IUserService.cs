using System;
using System.Collections.Generic;
using VooDiDb.Services.Core;

namespace VooDiDb.Services.Interfaces
{
    public interface IUserService : IServiceProvider
    {
        UserDTO Create(UserRegistrationDTO userRegistrationDTO, string login);
        UserDTO LogIn(UserLoginDTO loginModel);

        ICollection<UserDTO> Get(string login);

        UserDTO Update(UserDTO user, string login);

        int Delete(long userId, string login);
    }
}
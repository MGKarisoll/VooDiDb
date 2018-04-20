using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using VooDiDb.Services.Core;

namespace VooDiDb.Services.Interfaces
{
    public interface IUserService : IServiceProvider
    {
        UserDTO Create(UserRegistrationDTO userRegistrationDTO, string login);
        UserDTO LogIn(UserLoginDTO loginModel);

        IQueryable<UserDTO> Get(string login);

        UserDTO Get(long id, string login);

        UserDTO Update(UserDTO user, string login);

        int Delete(long userId, string login);

        IDictionary<string, string> GetUserDetails(long id);
    }

    public abstract class BaseCRUDService<T> {
        public virtual T Create<T>(T item) {
            return item;
        }
    }

    public class ConcreteService : BaseCRUDService<UserDTO> {
        public override T Create<T>(T item) {
            Debug.WriteLine(item);
            return base.Create(item);
        }
    }
}
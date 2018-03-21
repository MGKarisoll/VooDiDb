using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using VooDiDb.Domain.Core;
using VooDiDb.Domain.Interfaces;
using VooDiDb.Services.Core;
using VooDiDb.Services.Core.Validation;

namespace VooDiDb.Infrastructure.Business.ValidationServices
{
    public class CreationUserValidationService : IValidationService<UserDTO>
    {
        private readonly IRepository<User> repository;

        public CreationUserValidationService(IRepository<User> repository)
        {
            this.repository = repository;
        }

        public IEnumerable<ValidationResult> Validate(UserDTO item)
        {
            if (repository.Any(x => x.Login == item.Login))
                yield return new ValidationResult($"Another user has login '{item.Login}'");
        }

        public object GetService(Type serviceType)
        {
            return serviceType == GetType() ? this : null;
        }
    }
}
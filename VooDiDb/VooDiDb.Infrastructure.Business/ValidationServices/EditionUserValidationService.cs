using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using VooDiDb.Domain.Core;
using VooDiDb.Domain.Interfaces;
using VooDiDb.Services.Core;
using VooDiDb.Services.Core.Validation;

namespace VooDiDb.Infrastructure.Business.ValidationServices {
    public class EditionUserValidationService : IValidationService<UserDTO> {
        private readonly IRepository<User> repository;

        public EditionUserValidationService(IRepository<User> repository) {
            this.repository = repository;
        }

        public IEnumerable<ValidationResult> Validate(UserDTO item) {
            if(item == null) {
                yield return new ValidationResult("User can not be null.");
                yield break;
            }

            var entry = this.repository.FindById(item.Id);
            if(entry == null) {
                yield return new ValidationResult("User not found.");
                yield break;
            }

            if(!entry.RowVersion.SequenceEqual(item.RowVersion))
                yield return new ValidationResult("Version of user is not compatible", new[] { nameof(item.RowVersion) });
        }

        public object GetService(Type serviceType) {
            return serviceType == this.GetType() ? this : null;
        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using VooDiDb.Domain.Core;
using VooDiDb.Domain.Interfaces;
using VooDiDb.Services.Core;
using VooDiDb.Services.Core.Validation;

namespace VooDiDb.Infrastructure.Business.ValidationServices
{
    public class CreationAudienceValidationService : IValidationService<AudienceDTO>
    {
        private readonly IRepository<Audience> repository;

        public CreationAudienceValidationService(IRepository<Audience> repository)
        {
            this.repository = repository;
        }

        public IEnumerable<ValidationResult> Validate(AudienceDTO item)
        {
            if (repository.Any(x => x.ClientId == item.ClientId))
                yield return new ValidationResult("Another audience has the same client id",
                    new[] {nameof(item.ClientId)});
            if (repository.Any(x => x.Name == item.Name))
                yield return new ValidationResult("Another audience has the same name",
                    new[] {nameof(item.Name)});
        }

        public object GetService(Type serviceType)
        {
            return serviceType == GetType() ? this : null;
        }
    }
}
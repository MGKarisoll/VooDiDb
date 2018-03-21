using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using VooDiDb.Services.Core.Validation;

namespace VooDiDb.Services.Core
{
    public class AudienceDTO : IValidatableObject
    {
        public string ClientId { get; set; }
        public string Base64Secret { get; set; }
        [MaxLength(100)]
        [Required]
        public string Name { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var results = new List<ValidationResult>();
            if (!(validationContext.GetService(typeof(IValidationService<AudienceDTO>)) is IValidationService<AudienceDTO> validationService))
                return results;
            results.AddRange(validationService.Validate(this));
            return results;
        }
    }
}
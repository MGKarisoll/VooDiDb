using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using VooDiDb.Services.Core.Validation;

namespace VooDiDb.Services.Core
{
    public class LoginDTO : IValidatableObject
    {
        [Required] [MaxLength(100)] public string Login { get; set; }

        [Required] [MaxLength(100)] public string Password { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var results = new List<ValidationResult>();
            if (!(validationContext.GetService(typeof(IValidationService<LoginDTO>)) is IValidationService<LoginDTO>
                validationService))
                return results;
            results.AddRange(validationService.Validate(this));
            return results;
        }
    }
}
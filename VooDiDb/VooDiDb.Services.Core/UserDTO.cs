using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using VooDiDb.Domain.Core;
using VooDiDb.Services.Core.Validation;

namespace VooDiDb.Services.Core {
    public abstract class UserBaseDTO : IValidatableObject {
        public string Login { get; set; }
        public virtual IEnumerable<ValidationResult> Validate(ValidationContext validationContext) {
            var results = new List<ValidationResult>();
            if(!(validationContext.GetService(typeof(IValidationService<UserBaseDTO>)) is IValidationService<UserBaseDTO> validationService))
                return results;
            results.AddRange(validationService.Validate(this));
            return results;
        }
    }

    public class UserLoginDTO : UserBaseDTO {
        public string Password { get; set; }
    }

    public class UserRegistrationDTO : UserLoginDTO {
        public string Name { get; set; }
        public string FullName { get; set; }
        public long DepartmentId { get; set; }
        public long PostId { get; set; }
        public string Role { get; set; }
    }

    public class UserDTO : UserBaseDTO {
        public long Id { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public long DepartmentId { get; set; }
        public long PostId { get; set; }
        public string Role { get; set; }
        public bool IsActive { get; set; }
        public int SortOrder { get; set; }
        public byte[] RowVersion { get; set; }
    }
}

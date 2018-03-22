using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using VooDiDb.Domain.Core;
using VooDiDb.Services.Core.Validation;

namespace VooDiDb.Services.Core
{
    public class UserRegistrationDTO {
        public string Name { get; set; }
        public string FullName { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public int DepartmentId { get; set; }
        public int PostId { get; set; }
        public UserRolesEnum Role { get; set; }
    }

    public class UserEditDTO {
        public string Id { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public string Login { get; set; }
        public int DepartmentId { get; set; }
        public int PostId { get; set; }
        public UserRolesEnum Role { get; set; }
    }
    public class UserDTO : IValidatableObject
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public string Login { get; set; }
        public DepartmentDTO Department { get; set; }
        public PostDTO Post { get; set; }
        public UserRolesEnum Role { get; set; }
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var results = new List<ValidationResult>();
            if (!(validationContext.GetService(typeof(IValidationService<UserDTO>)) is IValidationService<UserDTO> validationService))
                return results;
            results.AddRange(validationService.Validate(this));
            return results;
        }
    }

    public class UserExtendedDTO : UserDTO {
        public bool IsDeleted { get; set; }
    }
}
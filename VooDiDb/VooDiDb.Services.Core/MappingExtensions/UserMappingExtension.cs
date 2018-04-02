using VooDiDb.Domain.Core;
using VooDiDb.Utilites.Util;

namespace VooDiDb.Services.Core.MappingExtensions {
    public static class UserMappingExtension {
        public static UserDTO MapToUserDTO(this User entity) {
            return new UserDTO {
                Login = entity.Login,
                Id = entity.Id,
                FullName = entity.FullName,
                Name = entity.Name,
                Role = entity.Role,
                PostId = entity.PostId,
                DepartmentId = entity.DepartmentId,
                IsActive = !entity.IsDeleted,
                RowVersion = entity.RowVersion
            };
        }

        public static User MapToUser(this UserDTO dto) {
            return new User {
                Login = dto.Login,
                Id = dto.Id,
                DepartmentId = dto.DepartmentId,
                FullName = dto.FullName,
                IsDeleted = !dto.IsActive,
                Name = dto.Name,
                PostId = dto.PostId,
                Role = UserRolesEnum.User,
                SortOrder = dto.SortOrder,
                RowVersion = dto.RowVersion
            };
        }

        public static User MapToUser(this UserLoginDTO dto) {
            return new User {
                Login = dto.Login,
                Password = Security.GetMd5HashString(dto.Password)
            };
        }

        public static User MapToUser(this UserRegistrationDTO dto) {
            return new User {
                Login = dto.Login,
                Password = string.IsNullOrEmpty(dto.Password) ? string.Empty : Security.GetMd5HashString(dto.Password),
                DepartmentId = dto.DepartmentId,
                PostId = dto.PostId,
                Role = dto.Role
            };
        }
    }
}

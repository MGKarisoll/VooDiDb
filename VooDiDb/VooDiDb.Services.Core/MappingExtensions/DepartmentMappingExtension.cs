using System;
using System.Linq;
using VooDiDb.Domain.Core;

namespace VooDiDb.Services.Core.MappingExtensions {
    public static class DepartmentMappingExtension {
        public static DepartmentDTO MapToDepartmentDTO(this Department entity) {
            return new DepartmentDTO {
                Id = entity.Id,
                ParentId = entity.ParentId,
                FullName = entity.FullName,
                Name = entity.FullName,
                IsActive = !entity.IsDeleted,
                SortOrder = entity.SortOrder,
                RowVersion = entity.RowVersion
            };
        }

        public static DepartmentNestedDTO MapToDepartmentNestedDTO(this Department entity) {
            return new DepartmentNestedDTO {
                Id = entity.Id,
                ParentId = entity.ParentId,
                FullName = entity.FullName,
                Name = entity.FullName,
                IsActive = !entity.IsDeleted,
                SortOrder = entity.SortOrder,
                RowVersion = entity.RowVersion,
                Parent = entity.Parent.MapToDepartmentNestedDTO(),
                Children = entity.Children.Select(x => x.MapToDepartmentNestedDTO()).ToList()
            };
        }

        public static Department MapToDepartment(this DepartmentDTO dto) {
            return new Department {
                Id = dto.Id,
                FullName = dto.FullName,
                Name = dto.Name,
                IsDeleted = !dto.IsActive,
                SortOrder = dto.SortOrder,
                ParentId = dto.ParentId,
                RowVersion = dto.RowVersion
            };
        }
    }
}

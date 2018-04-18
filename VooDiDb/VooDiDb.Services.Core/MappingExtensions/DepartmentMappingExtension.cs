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

using System.Collections.Generic;
using System.Linq;
using VooDiDb.Domain.Core;

namespace VooDiDb.Services.Core {
    public class DepartmentDTO {
        public DepartmentDTO() { }

        public DepartmentDTO(Department entity) {
            this.Id = entity.Id;
            this.ParentId = entity.ParentId;
            this.Name = entity.Name;
            this.FullName = entity.FullName;
            this.IsActive = !entity.IsDeleted;
            this.SortOrder = entity.SortOrder;
            this.RowVersion = entity.RowVersion;
        }

        public long Id { get; set; }
        public long? ParentId { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public bool IsActive { get; set; }
        public int SortOrder { get; set; }
        public byte[] RowVersion { get; set; }
    }

    public class DepartmentNestedDTO : DepartmentDTO {
        public DepartmentNestedDTO() { }

        public DepartmentNestedDTO(Department entity) : base(entity) {
            this.Parent = new DepartmentDTO(entity.Parent);
            this.Children = entity.Children?.Select(x => new DepartmentNestedDTO(x)).ToList();
        }

        public DepartmentDTO Parent { get; set; }
        public ICollection<DepartmentNestedDTO> Children { get; set; }
    }
}

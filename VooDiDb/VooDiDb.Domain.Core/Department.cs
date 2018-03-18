using System.Collections.Generic;
using VooDiDb.Domain.Core.Base;

namespace VooDiDb.Domain.Core
{
    public class Department : BaseEntity, IName, IFullName
    {
        public string Name { get; set; }
        public string FullName { get; set; }

        public long? ParentId { get; set; }

        public virtual Department Parent { get; set; }
        public virtual ICollection<Department> Children { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
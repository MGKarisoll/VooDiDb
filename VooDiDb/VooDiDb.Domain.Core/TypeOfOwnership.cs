using System.Collections.Generic;
using VooDiDb.Domain.Core.Base;

namespace VooDiDb.Domain.Core
{
    public class TypeOfOwnership : BaseEntity, IName, IFullName
    {
        public string Name { get; set; }
        public string FullName { get; set; }

        public virtual ICollection<Institution> Institutions { get; set; }
    }
}
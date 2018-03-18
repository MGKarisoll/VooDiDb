using System.Collections.Generic;
using VooDiDb.Domain.Core.Base;

namespace VooDiDb.Domain.Core
{
    public class Post : BaseEntity, IName
    {
        public string Name { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
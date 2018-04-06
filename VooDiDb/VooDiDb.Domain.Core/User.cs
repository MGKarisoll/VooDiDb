using VooDiDb.Domain.Core.Base;

namespace VooDiDb.Domain.Core
{
    public class User : BaseEntity, IName, IFullName
    {
        public string Name { get; set; }
        public string FullName { get; set; }
        public long PostId { get; set; }
        public long DepartmentId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

        public virtual Post Post { get; set; }
        public virtual Department Department { get; set; }
    }
}
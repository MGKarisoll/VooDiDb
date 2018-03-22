using VooDiDb.Domain.Core.Base;

namespace VooDiDb.Domain.Core
{
    public class Audience : BaseEntity
    {
        public string ClientId { get; set; }
        public string Base64Secret { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
    }
}
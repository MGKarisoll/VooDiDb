using VooDiDb.Domain.Core.Base;

namespace VooDiDb.Domain.Core
{
    public class Institution : BaseEntity, IName
    {
        public string UniqueIdentifier { get; set; }
        public string Name { get; set; }
        public string ManagerName { get; set; }
        public long TypeOfOwnershipId { get; set; }
        public string LegalAdress { get; set; }
        public string ManufacturersAddress { get; set; }
        public long ManufactureTypeId { get; set; }
        public string Description { get; set; }

        public virtual TypeOfOwnership TypeOfOwnership { get; set; }
        public virtual ManufactureType ManufactureType { get; set; }
    }
}
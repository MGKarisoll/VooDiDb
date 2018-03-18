namespace VooDiDb.Domain.Core.Base
{
    public abstract class BaseEntity
    {
        public long Id { get; set; }
        public byte[] RowVersion { get; set; }
    }
}
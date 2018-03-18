using System.Data.Entity;

namespace VooDiDb.Infrastructure.Data.Scheme.Interfaces
{
    public interface IEntitySchema
    {
        void Configure(DbModelBuilder modelBuilder);
    }
}
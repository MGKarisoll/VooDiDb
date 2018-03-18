using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using VooDiDb.Domain.Core.Base;
using VooDiDb.Infrastructure.Data.Scheme.Interfaces;

namespace VooDiDb.Infrastructure.Data.Scheme.Base
{
    public abstract class BaseEntitySchema<T> : IEntitySchema where T: BaseEntity 
    {
        public virtual void Configure(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<T>().HasKey(x => x.Id);
            modelBuilder.Entity<T>().Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<T>().Property(x => x.RowVersion).IsRowVersion();
        }
    }
}
using System.Data.Entity;
using VooDiDb.Domain.Core;
using VooDiDb.Infrastructure.Data.Scheme.Base;

namespace VooDiDb.Infrastructure.Data.Scheme
{
    public class ManufactureTypeSchema : BaseEntitySchema<ManufactureType>
    {
        public override void Configure(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ManufactureType>().ToTable("ManufactureTypes");
            base.Configure(modelBuilder);
            modelBuilder.Entity<ManufactureType>().Property(x => x.Name)
                .HasMaxLength(200)
                .IsRequired();
            modelBuilder.Entity<ManufactureType>().Property(x => x.FullName)
                .HasMaxLength(200)
                .IsRequired();

            modelBuilder.Entity<ManufactureType>().HasIndex(x => x.Name)
                .HasName("IX_Name")
                .IsUnique();
            modelBuilder.Entity<ManufactureType>().HasIndex(x => x.FullName)
                .HasName("IX_FullName")
                .IsUnique();
        }
    }
}
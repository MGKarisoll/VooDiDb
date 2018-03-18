using System.Data.Entity;
using VooDiDb.Domain.Core;
using VooDiDb.Infrastructure.Data.Scheme.Base;

namespace VooDiDb.Infrastructure.Data.Scheme
{
    public class TypeOfOwnershipSchema : BaseEntitySchema<TypeOfOwnership>
    {
        public override void Configure(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TypeOfOwnership>().ToTable("TypesOfOwnership");
            base.Configure(modelBuilder);
            modelBuilder.Entity<TypeOfOwnership>().Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(200);
            modelBuilder.Entity<TypeOfOwnership>().Property(x => x.FullName)
                .IsRequired()
                .HasMaxLength(200);

            modelBuilder.Entity<TypeOfOwnership>().HasIndex(x => x.Name)
                .HasName("IX_Name")
                .IsUnique();
            modelBuilder.Entity<TypeOfOwnership>().HasIndex(x => x.FullName)
                .HasName("IX_FullName")
                .IsUnique();
        }
    }
}
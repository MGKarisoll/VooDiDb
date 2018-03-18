using System.Data.Entity;
using VooDiDb.Domain.Core;
using VooDiDb.Infrastructure.Data.Scheme.Base;

namespace VooDiDb.Infrastructure.Data.Scheme
{
    public class InstitutuionSchema : BaseEntitySchema<Institution>
    {
        public override void Configure(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Institution>().ToTable("Institutions");
            base.Configure(modelBuilder);
            modelBuilder.Entity<Institution>().Property(x => x.UniqueIdentifier)
                .HasMaxLength(200)
                .IsRequired();

            modelBuilder.Entity<Institution>().HasIndex(x => x.UniqueIdentifier)
                .HasName("IX_UniqueIdentifier")
                .IsUnique();

            modelBuilder.Entity<Institution>()
                .HasRequired(x => x.TypeOfOwnership)
                .WithMany(x => x.Institutions)
                .HasForeignKey(x => x.TypeOfOwnershipId);
            modelBuilder.Entity<Institution>()
                .HasRequired(x => x.ManufactureType)
                .WithMany(x => x.Institutions)
                .HasForeignKey(x => x.ManufactureTypeId);
        }
    }
}
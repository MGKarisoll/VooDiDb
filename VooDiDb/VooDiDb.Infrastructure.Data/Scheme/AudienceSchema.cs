using System.Data.Entity;
using VooDiDb.Domain.Core;
using VooDiDb.Infrastructure.Data.Scheme.Interfaces;

namespace VooDiDb.Infrastructure.Data.Scheme
{
    public class AudienceSchema : IEntitySchema
    {
        public void Configure(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Audience>().ToTable("Audience");

            modelBuilder.Entity<Audience>().HasIndex(x => x.ClientId).IsUnique();
            modelBuilder.Entity<Audience>().Property(x => x.ClientId).HasMaxLength(32);
            modelBuilder.Entity<Audience>().Property(x => x.ClientId).IsRequired();

            modelBuilder.Entity<Audience>().Property(x => x.Base64Secret).HasMaxLength(80);
            modelBuilder.Entity<Audience>().Property(x => x.Base64Secret).IsRequired();

            modelBuilder.Entity<Audience>().Property(x => x.Name).HasMaxLength(100);
            modelBuilder.Entity<Audience>().Property(x => x.Name).IsRequired();
        }
    }
}
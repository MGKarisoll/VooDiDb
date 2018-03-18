using System.Data.Entity;
using VooDiDb.Domain.Core;
using VooDiDb.Infrastructure.Data.Scheme.Base;

namespace VooDiDb.Infrastructure.Data.Scheme
{
    public class PostSchema : BaseEntitySchema<Post>
    {
        public override void Configure(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>().ToTable("Posts");
            base.Configure(modelBuilder);
            modelBuilder.Entity<Post>().Property(x => x.Name)
                .HasMaxLength(200)
                .IsRequired();

            modelBuilder.Entity<Post>().HasIndex(x => x.Name)
                .HasName("IX_Name")
                .IsUnique();
        }
    }
}
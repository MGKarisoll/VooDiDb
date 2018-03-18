using System.Data.Entity;
using VooDiDb.Domain.Core;
using VooDiDb.Infrastructure.Data.Scheme.Base;

namespace VooDiDb.Infrastructure.Data.Scheme
{
    public class UserSchema : BaseEntitySchema<User>
    {
        public override void Configure(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Users");
            base.Configure(modelBuilder);
            modelBuilder.Entity<User>().Property(x => x.FullName)
                .HasMaxLength(200)
                .IsRequired();
            modelBuilder.Entity<User>().Property(x => x.Login)
                .HasMaxLength(200)
                .IsRequired();

            modelBuilder.Entity<User>().HasIndex(x => x.FullName)
                .HasName("IX_FullName")
                .IsUnique();
            modelBuilder.Entity<User>().HasIndex(x => x.Login)
                .HasName("IX_Login")
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasRequired(x => x.Post)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.PostId);
            modelBuilder.Entity<User>()
                .HasRequired(x => x.Department)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.DepartmentId);
        }
    }
}
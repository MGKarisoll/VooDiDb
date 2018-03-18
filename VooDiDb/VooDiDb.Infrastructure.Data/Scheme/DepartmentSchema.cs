using System.Data.Entity;
using VooDiDb.Domain.Core;
using VooDiDb.Infrastructure.Data.Scheme.Base;

namespace VooDiDb.Infrastructure.Data.Scheme
{
    public class DepartmentSchema : BaseEntitySchema<Department>
    {
        public override void Configure(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>().ToTable("Departments");
            base.Configure(modelBuilder);
            modelBuilder.Entity<Department>()
                .HasOptional(x => x.Parent)
                .WithMany(x => x.Children)
                .HasForeignKey(x => x.ParentId);
        }
    }
}
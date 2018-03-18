using System.Configuration;
using System.Data.Entity;
using VooDiDb.Domain.Core;
using VooDiDb.Infrastructure.Data.Scheme;
using VooDiDb.Infrastructure.Data.Scheme.Interfaces;

namespace VooDiDb.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        private static readonly string ConnectionString = "";

        static AppDbContext()
        {
#if DEBUG
            ConnectionString = @"Data Source=.\SQLEXPRESS;Initial Catalog=AppDb;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
#endif
        }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Institution> Institutions { get; set; }
        public DbSet<ManufactureType> ManufactureTypes { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<TypeOfOwnership> TypeOfOwnerships { get; set; }
        public DbSet<User> Users { get; set; }

        public AppDbContext(): base(ConnectionString) { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            var scheme = new IEntitySchema[]
            {
                new DepartmentSchema(),
                new InstitutuionSchema(),
                new ManufactureTypeSchema(),
                new PostSchema(),
                new TypeOfOwnershipSchema(),
                new UserSchema()
            };
            foreach (var schema in scheme)
            {
                schema.Configure(modelBuilder);
            }
            base.OnModelCreating(modelBuilder);
        }
    }
}
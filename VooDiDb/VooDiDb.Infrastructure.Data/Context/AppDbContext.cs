using System.Configuration;
using System.Data.Entity;
using VooDiDb.Infrastructure.Data.Scheme;
using VooDiDb.Infrastructure.Data.Scheme.Interfaces;

namespace VooDiDb.Infrastructure.Data.Context
{
    public class AppDbContext : DbContext {
        private static readonly string s_connectionString = ConfigurationManager.ConnectionStrings["AppDbConnectionString"].ConnectionString;
        public AppDbContext() : base(s_connectionString) { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            var scheme = new IEntitySchema[]
            {
                new AudienceSchema(),
                new DepartmentSchema(),
                new InstitutuionSchema(),
                new ManufactureTypeSchema(),
                new PostSchema(),
                new TypeOfOwnershipSchema(),
                new UserSchema()
            };
            foreach (var schema in scheme) schema.Configure(modelBuilder);
            base.OnModelCreating(modelBuilder);
        }
    }
}
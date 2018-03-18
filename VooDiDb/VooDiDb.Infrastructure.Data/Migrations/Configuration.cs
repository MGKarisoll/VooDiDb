using System.Data.Entity.Migrations;

namespace VooDiDb.Infrastructure.Data.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<AppDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(AppDbContext context)
        {
            SeedConfiguration.Seed(context);
        }
    }
}
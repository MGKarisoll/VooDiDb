using VooDiDb.Infrastructure.Data.Configuration;
using VooDiDb.Infrastructure.Data.Context;

namespace VooDiDb.Infrastructure.Data.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

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

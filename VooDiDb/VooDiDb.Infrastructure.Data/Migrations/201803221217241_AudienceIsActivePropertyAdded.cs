namespace VooDiDb.Infrastructure.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AudienceIsActivePropertyAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Audience", "IsActive", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Audience", "IsActive");
        }
    }
}

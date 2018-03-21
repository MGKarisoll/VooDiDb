namespace VooDiDb.Infrastructure.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AudienceColumns_changed : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.Audience");
            AddColumn("dbo.Audience", "Id", c => c.Long(nullable: false, identity: true));
            AddColumn("dbo.Audience", "RowVersion", c => c.Binary());
            AddColumn("dbo.Audience", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Audience", "SortOrder", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.Audience", "Id");
            CreateIndex("dbo.Audience", "ClientId", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.Audience", new[] { "ClientId" });
            DropPrimaryKey("dbo.Audience");
            DropColumn("dbo.Audience", "SortOrder");
            DropColumn("dbo.Audience", "IsDeleted");
            DropColumn("dbo.Audience", "RowVersion");
            DropColumn("dbo.Audience", "Id");
            AddPrimaryKey("dbo.Audience", "ClientId");
        }
    }
}

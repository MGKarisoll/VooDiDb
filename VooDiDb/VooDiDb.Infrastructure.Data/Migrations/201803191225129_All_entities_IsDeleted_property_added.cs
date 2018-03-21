namespace VooDiDb.Infrastructure.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class All_entities_IsDeleted_property_added : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Departments", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Users", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Posts", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Institutions", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.ManufactureTypes", "IsDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.TypesOfOwnership", "IsDeleted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TypesOfOwnership", "IsDeleted");
            DropColumn("dbo.ManufactureTypes", "IsDeleted");
            DropColumn("dbo.Institutions", "IsDeleted");
            DropColumn("dbo.Posts", "IsDeleted");
            DropColumn("dbo.Users", "IsDeleted");
            DropColumn("dbo.Departments", "IsDeleted");
        }
    }
}

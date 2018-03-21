namespace VooDiDb.Infrastructure.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Entities_SortOrder_Property_Added : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Departments", "SortOrder", c => c.Int(nullable: false));
            AddColumn("dbo.Users", "SortOrder", c => c.Int(nullable: false));
            AddColumn("dbo.Posts", "SortOrder", c => c.Int(nullable: false));
            AddColumn("dbo.Institutions", "SortOrder", c => c.Int(nullable: false));
            AddColumn("dbo.ManufactureTypes", "SortOrder", c => c.Int(nullable: false));
            AddColumn("dbo.TypesOfOwnership", "SortOrder", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TypesOfOwnership", "SortOrder");
            DropColumn("dbo.ManufactureTypes", "SortOrder");
            DropColumn("dbo.Institutions", "SortOrder");
            DropColumn("dbo.Posts", "SortOrder");
            DropColumn("dbo.Users", "SortOrder");
            DropColumn("dbo.Departments", "SortOrder");
        }
    }
}

namespace VooDiDb.Infrastructure.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class All_PK_Changed : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Departments", "ParentId", "dbo.Departments");
            DropForeignKey("dbo.Users", "DepartmentId", "dbo.Departments");
            DropForeignKey("dbo.Users", "PostId", "dbo.Posts");
            DropForeignKey("dbo.Institutions", "ManufactureTypeId", "dbo.ManufactureTypes");
            DropForeignKey("dbo.Institutions", "TypeOfOwnershipId", "dbo.TypesOfOwnership");
            DropPrimaryKey("dbo.Departments");
            DropPrimaryKey("dbo.Users");
            DropPrimaryKey("dbo.Posts");
            DropPrimaryKey("dbo.Institutions");
            DropPrimaryKey("dbo.ManufactureTypes");
            DropPrimaryKey("dbo.TypesOfOwnership");
            AlterColumn("dbo.Departments", "Id", c => c.Long(nullable: false, identity: true));
            AlterColumn("dbo.Users", "Id", c => c.Long(nullable: false, identity: true));
            AlterColumn("dbo.Posts", "Id", c => c.Long(nullable: false, identity: true));
            AlterColumn("dbo.Institutions", "Id", c => c.Long(nullable: false, identity: true));
            AlterColumn("dbo.ManufactureTypes", "Id", c => c.Long(nullable: false, identity: true));
            AlterColumn("dbo.TypesOfOwnership", "Id", c => c.Long(nullable: false, identity: true));
            AddPrimaryKey("dbo.Departments", "Id");
            AddPrimaryKey("dbo.Users", "Id");
            AddPrimaryKey("dbo.Posts", "Id");
            AddPrimaryKey("dbo.Institutions", "Id");
            AddPrimaryKey("dbo.ManufactureTypes", "Id");
            AddPrimaryKey("dbo.TypesOfOwnership", "Id");
            AddForeignKey("dbo.Departments", "ParentId", "dbo.Departments", "Id");
            AddForeignKey("dbo.Users", "DepartmentId", "dbo.Departments", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Users", "PostId", "dbo.Posts", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Institutions", "ManufactureTypeId", "dbo.ManufactureTypes", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Institutions", "TypeOfOwnershipId", "dbo.TypesOfOwnership", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Institutions", "TypeOfOwnershipId", "dbo.TypesOfOwnership");
            DropForeignKey("dbo.Institutions", "ManufactureTypeId", "dbo.ManufactureTypes");
            DropForeignKey("dbo.Users", "PostId", "dbo.Posts");
            DropForeignKey("dbo.Users", "DepartmentId", "dbo.Departments");
            DropForeignKey("dbo.Departments", "ParentId", "dbo.Departments");
            DropPrimaryKey("dbo.TypesOfOwnership");
            DropPrimaryKey("dbo.ManufactureTypes");
            DropPrimaryKey("dbo.Institutions");
            DropPrimaryKey("dbo.Posts");
            DropPrimaryKey("dbo.Users");
            DropPrimaryKey("dbo.Departments");
            AlterColumn("dbo.TypesOfOwnership", "Id", c => c.Long(nullable: false));
            AlterColumn("dbo.ManufactureTypes", "Id", c => c.Long(nullable: false));
            AlterColumn("dbo.Institutions", "Id", c => c.Long(nullable: false));
            AlterColumn("dbo.Posts", "Id", c => c.Long(nullable: false));
            AlterColumn("dbo.Users", "Id", c => c.Long(nullable: false));
            AlterColumn("dbo.Departments", "Id", c => c.Long(nullable: false));
            AddPrimaryKey("dbo.TypesOfOwnership", "Id");
            AddPrimaryKey("dbo.ManufactureTypes", "Id");
            AddPrimaryKey("dbo.Institutions", "Id");
            AddPrimaryKey("dbo.Posts", "Id");
            AddPrimaryKey("dbo.Users", "Id");
            AddPrimaryKey("dbo.Departments", "Id");
            AddForeignKey("dbo.Institutions", "TypeOfOwnershipId", "dbo.TypesOfOwnership", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Institutions", "ManufactureTypeId", "dbo.ManufactureTypes", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Users", "PostId", "dbo.Posts", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Users", "DepartmentId", "dbo.Departments", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Departments", "ParentId", "dbo.Departments", "Id");
        }
    }
}

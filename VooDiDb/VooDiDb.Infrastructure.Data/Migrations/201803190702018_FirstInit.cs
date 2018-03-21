namespace VooDiDb.Infrastructure.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FirstInit : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Departments",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        FullName = c.String(),
                        ParentId = c.Long(nullable: true),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Departments", t => t.ParentId)
                .Index(t => t.ParentId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(),
                        FullName = c.String(nullable: false, maxLength: 200),
                        PostId = c.Long(nullable: false),
                        DepartmentId = c.Long(nullable: false),
                        Login = c.String(nullable: false, maxLength: 200),
                        Password = c.String(),
                        Role = c.Int(nullable: false),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Departments", t => t.DepartmentId, cascadeDelete: true)
                .ForeignKey("dbo.Posts", t => t.PostId, cascadeDelete: true)
                .Index(t => t.FullName, unique: true)
                .Index(t => t.PostId)
                .Index(t => t.DepartmentId)
                .Index(t => t.Login, unique: true);
            
            CreateTable(
                "dbo.Posts",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 200),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true);
            
            CreateTable(
                "dbo.Institutions",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        UniqueIdentifier = c.String(nullable: false, maxLength: 200),
                        Name = c.String(),
                        ManagerName = c.String(),
                        TypeOfOwnershipId = c.Long(nullable: false),
                        LegalAdress = c.String(),
                        ManufacturersAddress = c.String(),
                        ManufactureTypeId = c.Long(nullable: false),
                        Description = c.String(),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ManufactureTypes", t => t.ManufactureTypeId, cascadeDelete: true)
                .ForeignKey("dbo.TypesOfOwnership", t => t.TypeOfOwnershipId, cascadeDelete: true)
                .Index(t => t.UniqueIdentifier, unique: true)
                .Index(t => t.TypeOfOwnershipId)
                .Index(t => t.ManufactureTypeId);
            
            CreateTable(
                "dbo.ManufactureTypes",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 200),
                        FullName = c.String(nullable: false, maxLength: 200),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true)
                .Index(t => t.FullName, unique: true);
            
            CreateTable(
                "dbo.TypesOfOwnership",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 200),
                        FullName = c.String(nullable: false, maxLength: 200),
                        RowVersion = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true)
                .Index(t => t.FullName, unique: true);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Institutions", "TypeOfOwnershipId", "dbo.TypesOfOwnership");
            DropForeignKey("dbo.Institutions", "ManufactureTypeId", "dbo.ManufactureTypes");
            DropForeignKey("dbo.Users", "PostId", "dbo.Posts");
            DropForeignKey("dbo.Users", "DepartmentId", "dbo.Departments");
            DropForeignKey("dbo.Departments", "ParentId", "dbo.Departments");
            DropIndex("dbo.TypesOfOwnership", new[] { "FullName" });
            DropIndex("dbo.TypesOfOwnership", new[] { "Name" });
            DropIndex("dbo.ManufactureTypes", new[] { "FullName" });
            DropIndex("dbo.ManufactureTypes", new[] { "Name" });
            DropIndex("dbo.Institutions", new[] { "ManufactureTypeId" });
            DropIndex("dbo.Institutions", new[] { "TypeOfOwnershipId" });
            DropIndex("dbo.Institutions", new[] { "UniqueIdentifier" });
            DropIndex("dbo.Posts", new[] { "Name" });
            DropIndex("dbo.Users", new[] { "Login" });
            DropIndex("dbo.Users", new[] { "DepartmentId" });
            DropIndex("dbo.Users", new[] { "PostId" });
            DropIndex("dbo.Users", new[] { "FullName" });
            DropIndex("dbo.Departments", new[] { "ParentId" });
            DropTable("dbo.TypesOfOwnership");
            DropTable("dbo.ManufactureTypes");
            DropTable("dbo.Institutions");
            DropTable("dbo.Posts");
            DropTable("dbo.Users");
            DropTable("dbo.Departments");
        }
    }
}

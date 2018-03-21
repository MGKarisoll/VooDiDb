namespace VooDiDb.Infrastructure.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AudienceAdded : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Audience",
                c => new
                    {
                        ClientId = c.String(nullable: false, maxLength: 32),
                        Base64Secret = c.String(nullable: false, maxLength: 80),
                        Name = c.String(nullable: false, maxLength: 100),
                    })
                .PrimaryKey(t => t.ClientId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Audience");
        }
    }
}

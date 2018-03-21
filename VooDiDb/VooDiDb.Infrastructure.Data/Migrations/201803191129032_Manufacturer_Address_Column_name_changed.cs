namespace VooDiDb.Infrastructure.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Manufacturer_Address_Column_name_changed : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Institutions", "LegalAddress", c => c.String());
            DropColumn("dbo.Institutions", "LegalAdress");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Institutions", "LegalAdress", c => c.String());
            DropColumn("dbo.Institutions", "LegalAddress");
        }
    }
}

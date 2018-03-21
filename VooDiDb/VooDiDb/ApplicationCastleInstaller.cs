using System.Configuration;
using System.Data.Entity;
using System.Web.Http.Controllers;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using VooDiDb.Domain.Interfaces;
using VooDiDb.Infrastructure.Data;
using VooDiDb.Infrastructure.Data.Context;

namespace VooDiDb
{
    public class ApplicationCastleInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["AppDbConnectionString"].ConnectionString;

            container.Register(Component.For<DbContext>().ImplementedBy<AppDbContext>()
                .DependsOn(Dependency.OnValue("connectionString", connectionString)));

            container.Register(
                Classes.FromThisAssembly()
                    .BasedOn(typeof(IHttpController))
                    .Configure(c => c.LifestylePerWebRequest()
                    ));
        }
    }
}
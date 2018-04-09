using System.Data.Entity;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using VooDiDb.Domain.Interfaces;
using VooDiDb.Infrastructure.Business;
using VooDiDb.Infrastructure.Data;
using VooDiDb.Infrastructure.Data.Context;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.Api.WindsorConfig {
    public class AppWindsorInstaller : IWindsorInstaller {
        public void Install(IWindsorContainer container, IConfigurationStore store) {
            container.Register(Component.For<DbContext>().ImplementedBy<AppDbContext>()
                                        .LifestylePerWebRequest());

            container.Register(Component.For(typeof(IRepository<>)).ImplementedBy(typeof(Repository<>))
                                        .LifestylePerWebRequest());

            container.Register(Component.For<IAudienceService>().ImplementedBy<AudienceService>()
                                        .LifestylePerWebRequest());

            container.Register(Component.For<IUserService>().ImplementedBy<UserService>()
                                        .LifestylePerWebRequest());

            container.Register(Component.For<IPostService>().ImplementedBy<PostService>()
                                        .LifestylePerWebRequest());

            container.Register(Component.For<IDepartmentService>().ImplementedBy<DepartmentService>()
                                        .LifestylePerWebRequest());

            container.Register(Classes.FromThisAssembly()
                                      .BasedOn<ApiController>()
                                      .Configure(configurer => configurer.Named(configurer.Implementation.Name))
                                      .LifestylePerWebRequest());
        }

        public void InstallFromAssembly(IWindsorContainer container, IConfigurationStore store, Assembly assembly) {
            container.Register(Classes.FromAssembly(assembly).BasedOn<IHttpController>().LifestyleTransient());
            container.Register(Classes.FromAssembly(assembly).BasedOn<FilterAttribute>().LifestyleTransient());
        }
    }
}

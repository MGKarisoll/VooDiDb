using System.Configuration;
using System.Data.Entity;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using VooDiDb.Domain.Core;
using VooDiDb.Domain.Interfaces;
using VooDiDb.Infrastructure.Business;
using VooDiDb.Infrastructure.Data;
using VooDiDb.Infrastructure.Data.Context;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.Api.WindsorConfig {
    public class AppWindsorInstaller : IWindsorInstaller {
        public void Install(IWindsorContainer container, IConfigurationStore store) {
            //container.Register(Classes.FromThisAssembly().BasedOn<ApiController>().Configure(c => c.Named(c.Implementation.Namespace))
            //                          .LifestylePerWebRequest());
            container.Register(Classes.FromThisAssembly()
                                      .BasedOn<ApiController>()
                                      .Configure(configurer => configurer.Named(configurer.Implementation.Name))
                                      .LifestylePerWebRequest());

            container.Register(Component.For<DbContext>().ImplementedBy<AppDbContext>()
                                        .DependsOn(Dependency.OnValue("connectionString",
                                            ConfigurationManager.ConnectionStrings["AppDbConnectionString"].ConnectionString)));

            container.Register(Component.For(typeof(IRepository<>)).ImplementedBy(typeof(Repository<>))
                                        .DependsOn(Dependency.OnValue("context", container.Resolve<DbContext>())));

            container.Register(Component.For<IAudienceService>().ImplementedBy<AudienceService>()
                                        .DependsOn(Dependency.OnValue("repository", container.Resolve<IRepository<Audience>>())));

            container.Register(Component.For<IUserService>().ImplementedBy<UserService>()
                                        .DependsOn(Dependency.OnValue("repository", container.Resolve<IRepository<User>>())));

            container.Register(Component.For<IPostService>().ImplementedBy<PostService>()
                                        .DependsOn(Dependency.OnValue<IRepository<User>>(container.Resolve<IRepository<User>>()))
                                        .DependsOn(Dependency.OnValue<IRepository<Post>>(container.Resolve<IRepository<Post>>())));

            container.Register(Component.For<IDepartmentService>().ImplementedBy<DepartmentService>()
                                        .DependsOn(Dependency.OnValue<IRepository<User>>(container.Resolve<IRepository<User>>()))
                                        .DependsOn(Dependency.OnValue<IRepository<Department>>(container.Resolve<IRepository<Department>>())));
        }

        public void InstallFromAssembly(IWindsorContainer container, IConfigurationStore store, Assembly assembly) {
            container.Register(Classes.FromAssembly(assembly).BasedOn<IHttpController>().LifestyleTransient());
            container.Register(Classes.FromAssembly(assembly).BasedOn<FilterAttribute>().LifestyleTransient());
        }
    }
}

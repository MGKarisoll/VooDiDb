using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Dependencies;
using Castle.Windsor;

namespace VooDiDb.Api.WindsorConfig {
    public class WindsorHttpDependencyResolver : IDependencyResolver {
        private readonly IWindsorContainer container;

        public WindsorHttpDependencyResolver(IWindsorContainer container) {
            this.container = container ?? throw new ArgumentNullException(nameof(container));
        }

        public object GetService(Type t) {
            return this.container.Kernel.HasComponent(t)
                ? this.container.Resolve(t)
                : null;
        }

        public IEnumerable<object> GetServices(Type t) {
            return this.container.ResolveAll(t)
                       .Cast<object>().ToArray();
        }

        public IDependencyScope BeginScope() {
            return new WindsorDependencyScope(this.container);
        }

        public void Dispose() { }
    }
}

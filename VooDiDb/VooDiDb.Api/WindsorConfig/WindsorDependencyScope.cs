using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Dependencies;
using Castle.MicroKernel.Lifestyle;
using Castle.Windsor;

namespace VooDiDb.Api.WindsorConfig {
    public class WindsorDependencyScope : IDependencyScope {
        private readonly IWindsorContainer m_container;
        private readonly IDisposable m_scope;

        public WindsorDependencyScope(IWindsorContainer container) {
            this.m_container = container ?? throw new ArgumentNullException(nameof(container));
            this.m_scope = container.BeginScope();
        }

        public object GetService(Type t) {
            return this.m_container.Kernel.HasComponent(t)
                ? this.m_container.Resolve(t)
                : null;
        }

        public IEnumerable<object> GetServices(Type t) {
            return this.m_container.ResolveAll(t)
                       .Cast<object>().ToArray();
        }

        public void Dispose() {
            this.m_scope.Dispose();
        }
    }
}

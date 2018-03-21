using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Dependencies;
using Castle.MicroKernel.Lifestyle;
using Castle.Windsor;

namespace VooDiDb.SecurityServer.WindsorConfig
{
    public class WindsorDependencyScope : IDependencyScope
    {
        private readonly IWindsorContainer container;
        private readonly IDisposable scope;

        public WindsorDependencyScope(IWindsorContainer container)
        {
            this.container = container ?? throw new ArgumentNullException(nameof(container));
            scope = container.BeginScope();
        }

        public object GetService(Type t)
        {
            return container.Kernel.HasComponent(t) ? container.Resolve(t) : null;
        }

        public IEnumerable<object> GetServices(Type t)
        {
            return container.ResolveAll(t).Cast<object>().ToArray();
        }

        public void Dispose()
        {
            scope.Dispose();
        }
    }
}
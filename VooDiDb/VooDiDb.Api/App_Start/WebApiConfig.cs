using System.Web.Http;
using VooDiDb.Api.Filters;

namespace VooDiDb.Api {
    public static class WebApiConfig {
        public static void Register(HttpConfiguration config) {
            // Web API configuration and services

            config.Routes.MapHttpRoute(
                "DefaultApi",
                "api/{controller}/{id}",
                new { id = RouteParameter.Optional }
            );

            config.Filters.Add(new AuthorizeAttribute());
        }
    }
}

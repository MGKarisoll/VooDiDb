using System;
using System.Web;
using System.Web.Http;
using Castle.Windsor;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using VooDiDb;
using VooDiDb.Services.Interfaces;

[assembly: OwinStartup(typeof(Startup))]

namespace VooDiDb
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            //Web API routes
            config.MapHttpAttributeRoutes();
        }

        public void ConfigureOAuth(IAppBuilder app)
        {
            var host = HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Authority);
            var OAuthServerOptions = new OAuthAuthorizationServerOptions
            {
#if DEBUG
                AllowInsecureHttp = true,
#else
                AllowInsecureHttp = false,
#endif
                TokenEndpointPath = new PathString("/oauth2/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(30),
                Provider = new CustomOAuthProvider(new WindsorContainer().Resolve<IAudienceService>()),
                AccessTokenFormat = new CustomJwtFormat("http://localhost:50890/")
            };

            // OAuth 2.0 Bearer Access Token Generation
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
        }
    }
}
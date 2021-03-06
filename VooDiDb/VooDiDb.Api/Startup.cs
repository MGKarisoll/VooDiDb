﻿using System;
using System.Web.Http;
using Castle.Windsor;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security.OAuth;
using Owin;
using VooDiDb.Api;
using VooDiDb.Api.OAuth;
using VooDiDb.Api.WindsorConfig;
using VooDiDb.Services.Interfaces;

[assembly : OwinStartup(typeof(Startup))]

namespace VooDiDb.Api {
    public class Startup {
        public void Configuration(IAppBuilder app) {
            var container = new WindsorContainer().Install(new AppWindsorInstaller());

            var config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                "DefaultApi",
                "api/{controller}/{id}",
                new { id = RouteParameter.Optional }
            );

            app.Map("/chat",
                map => {
                    map.UseCors(CorsOptions.AllowAll);
                    map.RunSignalR(new HubConfiguration { EnableJSONP = true });
                });

            app.UseCors(CorsOptions.AllowAll);
            this.ConfigureOAuthServer(app, container);
            this.ConfigureOAuthClient(app);
            config.DependencyResolver = new WindsorHttpDependencyResolver(container);
            app.UseWebApi(config);
        }

        public void ConfigureOAuthServer(IAppBuilder app, IWindsorContainer container) {
            var audienceService = container.Resolve<IAudienceService>();
            var userService = container.Resolve<IUserService>();
            var oAuthServerOptions = new OAuthAuthorizationServerOptions {
                //For Dev enviroment only (on production should be AllowInsecureHttp = false)
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/oauth2/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(30),
                Provider = new CustomOAuthProvider(audienceService, userService),
                AccessTokenFormat = new CustomJwtFormat("http://localhost:7507/", audienceService)
            };

            // OAuth 2.0 Bearer Access Token Generation
            app.UseOAuthAuthorizationServer(oAuthServerOptions);
        }

        public void ConfigureOAuthClient(IAppBuilder app) {
            var issuer = "http://localhost:7507/";
            var audience = "44c11f290c604cc8a73da9e99c73be06";
            var secret = TextEncodings.Base64Url.Decode("DZ88Y-Z0U6a6hWALALUdc7Xz_vD57vJuwEnT6FkRvp8");

            app.UseJwtBearerAuthentication(
                new JwtBearerAuthenticationOptions {
                    AuthenticationMode = AuthenticationMode.Active,
                    AllowedAudiences = new[] { audience },
                    IssuerSecurityKeyProviders = new IIssuerSecurityKeyProvider[] {
                        new SymmetricKeyIssuerSecurityKeyProvider(issuer, secret)
                    }
                });
        }
    }
}

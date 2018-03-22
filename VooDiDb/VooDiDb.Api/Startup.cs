using System.Web.Http;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.Jwt;
using Owin;
using VooDiDb.Api;

[assembly : OwinStartup(typeof(Startup))]

namespace VooDiDb.Api {
    public class Startup {
        public void Configuration(IAppBuilder app) {
            var config = new HttpConfiguration();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            config.MapHttpAttributeRoutes();
            this.ConfigureOAuth(app);
            app.UseCors(CorsOptions.AllowAll);
            app.UseWebApi(config);
        }

        public void ConfigureOAuth(IAppBuilder app) {
            var issuer = "http://localhost:7507/";
            var audience = "15554e6365ef40c3be5683a4de57a644";
            var secret = TextEncodings.Base64Url.Decode("EMI7mlaz8WYm5K97xGvkNsWjrKVVLdgTEkmI2FANKng");

            // Api controllers with an [Authorize] attribute will be validated with JWT
            app.UseJwtBearerAuthentication(
                new JwtBearerAuthenticationOptions {
                    AuthenticationMode = AuthenticationMode.Active,
                    AllowedAudiences = new[] { audience },
                    IssuerSecurityTokenProviders = new IIssuerSecurityTokenProvider[] {
                        new SymmetricKeyIssuerSecurityTokenProvider(issuer, secret)
                    }
                });
        }
    }
}

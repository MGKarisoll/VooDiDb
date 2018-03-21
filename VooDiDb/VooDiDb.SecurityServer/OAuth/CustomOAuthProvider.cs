using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using VooDiDb.Domain.Core;
using VooDiDb.Domain.Interfaces;
using VooDiDb.Services.Core;
using VooDiDb.Services.Interfaces;
using VooDiDb.Utilites.Util;

namespace VooDiDb.SecurityServer.OAuth
{
    public class CustomOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly IAudienceService audienceService;
        private readonly IUserService userService;

        public CustomOAuthProvider(IAudienceService audienceService, IUserService userService)
        {
            this.audienceService = audienceService;
            this.userService = userService;
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            var clientId = string.Empty;
            var clientSecret = string.Empty;

            if (!context.TryGetBasicCredentials(out clientId, out clientSecret))
                context.TryGetFormCredentials(out clientId, out clientSecret);

            if (context.ClientId == null)
            {
                context.SetError("invalid_clientId", "client_Id is not set");
                return Task.FromResult<object>(null);
            }

            var audience = audienceService.FindAudience(context.ClientId);

            if (audience == null)
            {
                context.SetError("invalid_clientId", $"Invalid client_id '{context.ClientId}'");
                return Task.FromResult<object>(null);
            }

            context.Validated();
            return Task.FromResult<object>(null);
        }

        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] {"*"});
            var user = userService.LogIn(new LoginDTO{ Login = context.UserName, Password = context.Password });
            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect");
                return Task.FromResult<object>(null);
            }

            var identity = new ClaimsIdentity("JWT");

            identity.AddClaim(new Claim(ClaimTypes.Name, user.Name));
            identity.AddClaim(new Claim("FullName", user.FullName));
            identity.AddClaim(new Claim(ClaimTypes.Role, user.Role.ToString()));

            var props = new AuthenticationProperties(new Dictionary<string, string>
            {
                {
                    "audience", context.ClientId == null ? string.Empty : context.ClientId
                }
            });

            var ticket = new AuthenticationTicket(identity, props);
            context.Validated(ticket);
            return Task.FromResult<object>(null);
        }
    }
}
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin.Security;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.SecurityServer.OAuth
{
    public class CustomJwtFormat : ISecureDataFormat<AuthenticationTicket>
    {
        private const string AudiencePropertyKey = "audience";
        private readonly IAudienceService audienceService;
        private readonly string issuer;

        public CustomJwtFormat(string issuer, IAudienceService audienceService)
        {
            this.issuer = issuer;
            this.audienceService = audienceService;
        }

        public string Protect(AuthenticationTicket data)
        {
            if (data == null) throw new ArgumentNullException(nameof(data));

            var audienceId = data.Properties.Dictionary.ContainsKey(AudiencePropertyKey)
                ? data.Properties.Dictionary[AudiencePropertyKey]
                : null;
            if (string.IsNullOrEmpty(audienceId))
                throw new InvalidOperationException("AuthenticationTicket.Properties does not include audience");

            var audience = audienceService.FindAudience(audienceId);

            var symmetricKeyAsBase64 = audience.Base64Secret;

            var securityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(symmetricKeyAsBase64));
            var signingKey = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var issued = data.Properties.IssuedUtc;
            var expires = data.Properties.ExpiresUtc;

            var token = new JwtSecurityToken(issuer, audienceId, data.Identity.Claims, issued.Value.UtcDateTime,
                expires.Value.UtcDateTime, signingKey);

            var handler = new JwtSecurityTokenHandler();

            var jwt = handler.WriteToken(token);

            return jwt;
        }

        public AuthenticationTicket Unprotect(string protectedText)
        {
            throw new NotImplementedException();
        }
    }
}
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.Api.OAuth {
    public class CustomJwtFormat : ISecureDataFormat<AuthenticationTicket> {
        private const string AUDIENCE_PROPERTY_KEY = "audience";
        private readonly IAudienceService audienceService;
        private readonly string issuer;

        public CustomJwtFormat(string issuer, IAudienceService audienceService) {
            this.issuer = issuer;
            this.audienceService = audienceService;
        }

        public string Protect(AuthenticationTicket data) {
            if(data == null) throw new ArgumentNullException(nameof(data));

            var audienceId = data.Properties.Dictionary.ContainsKey(AUDIENCE_PROPERTY_KEY)
                ? data.Properties.Dictionary[AUDIENCE_PROPERTY_KEY]
                : null;
            if(string.IsNullOrEmpty(audienceId))
                throw new InvalidOperationException("AuthenticationTicket.Properties does not include audience");

            var audience = this.audienceService.FindAudience(audienceId);
            var symmetricKeyAsBase64 = audience.Base64Secret;
            var keyByteArray = TextEncodings.Base64Url.Decode(symmetricKeyAsBase64);

            var securityKey = new SymmetricSecurityKey(keyByteArray);

            var signingKey = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var issued = data.Properties.IssuedUtc;
            var expires = data.Properties.ExpiresUtc;

            var token = new JwtSecurityToken(this.issuer, audienceId, data.Identity.Claims, issued.Value.UtcDateTime, expires.Value.UtcDateTime, signingKey);

            var handler = new JwtSecurityTokenHandler();

            var jwt = handler.WriteToken(token);

            return jwt;
        }

        public AuthenticationTicket Unprotect(string protectedText) {
            throw new NotImplementedException();
        }
    }
}

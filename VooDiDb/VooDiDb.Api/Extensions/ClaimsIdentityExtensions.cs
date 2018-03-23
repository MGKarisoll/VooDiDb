using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace VooDiDb.Api.Extensions {
    public static class ClaimsIdentityExtensions {
        public static bool TryClaimsUserIdentity(this IPrincipal principal, out string login) {
            if(principal is ClaimsPrincipal claimsIdentity) {
                login = claimsIdentity.Claims.FirstOrDefault(x => x.Type == "Identity")?.Value ?? string.Empty;
                return !string.IsNullOrEmpty(login);
            }
            login = string.Empty;
            return false;

        }
    }
}

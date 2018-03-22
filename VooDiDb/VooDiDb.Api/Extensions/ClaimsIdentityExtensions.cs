using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace VooDiDb.Api.Extensions {
    public static class ClaimsIdentityExtensions {
        public static bool TryClaimsUserId(this IPrincipal principal, out int userId) {
            if(principal is ClaimsPrincipal claimsIdentity)
                return int.TryParse((claimsIdentity.Claims.FirstOrDefault(x => x.Type == "Identity")?.Value ?? string.Empty), out userId);
            userId = 0;
            return false;

        }
    }
}

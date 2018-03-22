using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace VooDiDb.SecurityServer.Controllers {
    [Authorize]
    [RoutePrefix("api/protected")]
    public class ProtectedController : ApiController {
        [Route("")]
        public HttpResponseMessage Get() {
            var identity = this.User.Identity as ClaimsIdentity;

            var responceData = identity.Claims.Select(c => new {
                c.Type,
                c.Value
            });

            return this.Request.CreateResponse(HttpStatusCode.OK, responceData);
        }
    }
}

using System.Net;
using System.Net.Http;
using System.Web.Http;
using VooDiDb.Api.Extensions;
using VooDiDb.Services.Core;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.Api.Controllers {
    [Authorize]
    [RoutePrefix("api/users")]
    public class UsersController : ApiController {
        private readonly IUserService userService;

        public UsersController(IUserService userService) {
            this.userService = userService;
        }

        public HttpResponseMessage Get() {
            if(!this.User.TryClaimsUserId(out var currentUserId))
                return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User Identity is invalid");
            var data = this.userService.GetUsers(currentUserId);
            return this.Request.CreateResponse(HttpStatusCode.OK, data);
        }

        public HttpResponseMessage Post(UserRegistrationDTO userRegistrationDTO) {
            if(!this.User.TryClaimsUserId(out var currentUserId))
                return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User Identity is invalid");
            if(!this.ModelState.IsValid)
                return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, this.ModelState);

            this.userService.RegisterUser(userRegistrationDTO, currentUserId);
            return this.Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}

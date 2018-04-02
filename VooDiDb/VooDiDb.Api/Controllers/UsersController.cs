using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VooDiDb.Api.Extensions;
using VooDiDb.Infrastructure.Business.ValidationServices;
using VooDiDb.Services.Core;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.Api.Controllers {
    [Authorize]
    public class UsersController : ApiController {
        private readonly IUserService userService;

        public UsersController(IUserService userService) {
            this.userService = userService;
        }

        public HttpResponseMessage Get() {
            if(!this.User.TryClaimsUserIdentity(out var login))
                return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User Identity is invalid.");
            var data = this.userService.Get(login);
            return this.Request.CreateResponse(HttpStatusCode.OK, data);
        }

        public HttpResponseMessage Get(long id) {
            if (!this.User.TryClaimsUserIdentity(out var login))
                return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User Identity is invalid.");
            try {
                return this.Request.CreateResponse(HttpStatusCode.OK, this.userService.Get(id, login));
            } catch(NullReferenceException) {
                return this.Request.CreateErrorResponse(HttpStatusCode.NotFound, "User not found.");
            } catch(Exception) {
                return this.Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Unsupported exception.");
            }
            
        }

        public HttpResponseMessage Post(UserRegistrationDTO model) {
            if(!this.User.TryClaimsUserIdentity(out var login))
                return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User Identity is invalid.");
            this.userService.GetService(typeof(CreationUserValidationService), model, this.ModelState);
            if(!this.ModelState.IsValid)
                return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, this.ModelState);

            return this.Request.CreateResponse(HttpStatusCode.OK, this.userService.Create(model, login));
        }

        [HttpPut]
        public HttpResponseMessage Put(long id, UserDTO model) {
            if(!this.User.TryClaimsUserIdentity(out var login))
                return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User Identity is invalid.");
            this.userService.GetService(typeof(EditionUserValidationService), model, this.ModelState);
            if(!this.ModelState.IsValid) return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, this.ModelState);

            return this.Request.CreateResponse(HttpStatusCode.OK, this.userService.Update(model, login));
        }

        public HttpResponseMessage Delete(long id) {
            if (!this.User.TryClaimsUserIdentity(out var login))
                return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User Identity is invalid.");
            return this.Request.CreateResponse(HttpStatusCode.OK, this.userService.Delete(id, login));
        }
    }
}

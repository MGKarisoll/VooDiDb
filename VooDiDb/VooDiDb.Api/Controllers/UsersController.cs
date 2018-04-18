using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VooDiDb.Api.Extensions;
using VooDiDb.Api.Filters;
using VooDiDb.Infrastructure.Business.ValidationServices;
using VooDiDb.Services.Core;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.Api.Controllers {
    [Authorize]
    public class UsersController : ApiController {
        private readonly IUserService m_userService;

        public UsersController(IUserService userService) {
            this.m_userService = userService;
        }

        [HttpGet]
        [Pagination]
        public HttpResponseMessage Get() {
            if(!this.User.TryClaimsUserIdentity(out var login))
                return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User Identity is invalid.");
            if(!(this.Request.GetPagination() is Pagination pagination))
                return this.Request.CreateResponse(HttpStatusCode.OK, new PagedList<UserDTO>(0, 1, this.m_userService.Get(login)));
            var all = this.m_userService.Get(login);
            var data = all.Skip(pagination.Size * pagination.Page).Take(pagination.Size);
            return this.Request.CreateResponse(HttpStatusCode.OK,
                new PagedList<UserDTO>(pagination.Page, all.LongCount() / pagination.Size, data)
            );
        }

        public HttpResponseMessage Get(long id) {
            if(!this.User.TryClaimsUserIdentity(out var login))
                return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User Identity is invalid.");
            try {
                return this.Request.CreateResponse(HttpStatusCode.OK, this.m_userService.Get(id, login));
            } catch(NullReferenceException) {
                return this.Request.CreateErrorResponse(HttpStatusCode.NotFound, "User not found.");
            } catch(Exception) {
                return this.Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Unsupported exception.");
            }
        }

        public HttpResponseMessage Post(UserRegistrationDTO model) {
            if(!this.User.TryClaimsUserIdentity(out var login))
                return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User Identity is invalid.");
            this.m_userService.GetService(typeof(CreationUserValidationService), model, this.ModelState);
            if(!this.ModelState.IsValid)
                return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, this.ModelState);

            return this.Request.CreateResponse(HttpStatusCode.OK, this.m_userService.Create(model, login));
        }

        [HttpPut]
        public HttpResponseMessage Put(long id, UserDTO model) {
            if(!this.User.TryClaimsUserIdentity(out var login))
                return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User Identity is invalid.");
            this.m_userService.GetService(typeof(EditionUserValidationService), model, this.ModelState);
            if(!this.ModelState.IsValid) return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, this.ModelState);

            return this.Request.CreateResponse(HttpStatusCode.OK, this.m_userService.Update(model, login));
        }

        public HttpResponseMessage Delete(long id) {
            if(!this.User.TryClaimsUserIdentity(out var login))
                return this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User Identity is invalid.");
            return this.Request.CreateResponse(HttpStatusCode.OK, this.m_userService.Delete(id, login));
        }
    }
}

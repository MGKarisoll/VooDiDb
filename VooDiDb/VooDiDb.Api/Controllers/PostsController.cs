using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VooDiDb.Api.Extensions;
using VooDiDb.Services.Core;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.Api.Controllers {
    [Authorize]
    [RoutePrefix("api/posts")]
    public class PostsController : ApiController {
        private readonly IPostService service;

        public PostsController(IPostService service) {
            this.service = service;
        }

        [HttpGet]
        [Route("{id}")]
        public HttpResponseMessage Get(long id) {
            if(!this.User.TryClaimsUserIdentity(out var login))
                return this.Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "User Identity is invalid");
            try {
                return this.Request.CreateResponse(HttpStatusCode.OK, this.service.GetById(id, login));
            } catch {
                return this.Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Unsupported exception.");
            }
        }

        [HttpGet]
        [Route("")]
        public HttpResponseMessage Get() {
            if(!this.User.TryClaimsUserIdentity(out var login))
                return this.Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "User Identity is invalid");
            try {
                return this.Request.CreateResponse(HttpStatusCode.OK, this.service.GetAll(login));
            } catch {
                return this.Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Unsupported exception.");
            }
        }

        [HttpPost]
        [Route("")]
        public HttpResponseMessage Post(PostDTO model) {
            if(!this.User.TryClaimsUserIdentity(out var login))
                return this.Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "User Identity is invalid");
            try {
                return this.Request.CreateResponse(HttpStatusCode.Created, this.service.Create(model, login));
            } catch(ArgumentException exception) when(exception.ParamName == "login") {
                return this.Request.CreateErrorResponse(HttpStatusCode.Forbidden, exception.Message);
            } catch {
                return this.Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Unsupported exception.");
            }
        }

        [HttpPut]
        [Route("{id}")]
        public HttpResponseMessage Put(long id, PostDTO model) {
            if(!this.User.TryClaimsUserIdentity(out var login))
                return this.Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "User Identity is invalid");
            try {
                return this.Request.CreateResponse(HttpStatusCode.Created, this.service.Update(model, login));
            } catch(ArgumentException exception) when(exception.ParamName == "login") {
                return this.Request.CreateErrorResponse(HttpStatusCode.Forbidden, exception.Message);
            } catch {
                return this.Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Unsupported exception.");
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public HttpResponseMessage Delete(long id) {
            if(!this.User.TryClaimsUserIdentity(out var login))
                return this.Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "User Identity is invalid");
            try {
                return this.Request.CreateResponse(HttpStatusCode.Created, this.service.Delete(id, login));
            } catch(ArgumentException exception) when(exception.ParamName == "login") {
                return this.Request.CreateErrorResponse(HttpStatusCode.Forbidden, exception.Message);
            } catch {
                return this.Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Unsupported exception.");
            }
        }

        [HttpGet]
        [Route("{id}/users")]
        public HttpResponseMessage GetUsersByPostId(long id) {
            if(!this.User.TryClaimsUserIdentity(out var login))
                return this.Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "User Identity is invalid");
            try {
                return this.Request.CreateResponse(HttpStatusCode.Created, this.service.GetUsersByPostId(id, login));
            } catch(ArgumentException exception) when(exception.ParamName == "login") {
                return this.Request.CreateErrorResponse(HttpStatusCode.Forbidden, exception.Message);
            } catch {
                return this.Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Unsupported exception.");
            }
        }
    }
}

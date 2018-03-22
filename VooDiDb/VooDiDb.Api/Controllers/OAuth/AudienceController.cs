using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VooDiDb.Api.Extensions;
using VooDiDb.Infrastructure.Business.ValidationServices;
using VooDiDb.Services.Core;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.Api.Controllers.OAuth {
    [RoutePrefix("api/audience")]
    public class AudienceController : ApiController {
        private readonly IAudienceService audienceService;

        public AudienceController(IAudienceService audienceService) {
            this.audienceService = audienceService;
        }

        [Route("")]
        public HttpResponseMessage Post(AudienceDTO model) {
            this.audienceService.GetService(typeof(CreationAudienceValidationService), model, this.ModelState);
            if(!this.ModelState.IsValid) return this.Request.CreateResponse(HttpStatusCode.BadRequest, this.ModelState);

            try {
                return this.Request.CreateResponse(HttpStatusCode.OK, this.audienceService.AddAudience(model));
            } catch(Exception ex) {
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}

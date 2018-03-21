using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VooDiDb.Infrastructure.Business.ValidationServices;
using VooDiDb.SecurityServer.Extensions;
using VooDiDb.Services.Core;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.SecurityServer.Controllers
{
    [RoutePrefix("api/audience")]
    public class AudienceController : ApiController
    {
        private readonly IAudienceService audienceService;

        public AudienceController(IAudienceService audienceService)
        {
            this.audienceService = audienceService;
        }

        [Route("")]
        public HttpResponseMessage Post(AudienceDTO model)
        {
            audienceService.GetService(typeof(CreationAudienceValidationService), model, ModelState);
            if (!ModelState.IsValid) return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);

            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, audienceService.AddAudience(model));
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
using System.Web.Http;
using VooDiDb.Domain.Interfaces;
using VooDiDb.Infrastructure.Business;
using VooDiDb.Services.Core;

namespace VooDiDb.Controllers
{
    [RoutePrefix("api/audience")]
    public class AudienceController : ApiController
    {
        private readonly AudienceService audienceService;

        public AudienceController(AudienceService audienceService)
        {
            this.audienceService = audienceService;
        }

        [Route("")]
        public IHttpActionResult Post(AudienceModel audienceModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var newAudience = audienceService.AddAudience(audienceModel.Name);

            return Ok(newAudience);
        }
    }
}
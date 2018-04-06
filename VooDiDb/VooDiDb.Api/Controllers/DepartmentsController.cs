using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VooDiDb.Services.Core;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.Api.Controllers
{
    [Authorize]
    public class DepartmentsController : ApiController {
        private readonly IDepartmentService departmentService;
        public DepartmentsController(IDepartmentService departmentService) {
            this.departmentService = departmentService;
        }
        [HttpGet]
        public HttpResponseMessage Get() {
            return this.Request.CreateResponse(HttpStatusCode.OK, this.departmentService.GetByParentId(null, string.Empty) ?? new DepartmentDTO[0]);
        }

        [HttpGet]
        public HttpResponseMessage Get(long id) {
            return this.Request.CreateResponse(HttpStatusCode.OK, this.departmentService.GetById(id, string.Empty));
        }

        [HttpGet]
        [Route("api/departments/{id}/children")]
        public HttpResponseMessage GetByParentId(long id) {
            return this.Request.CreateResponse(HttpStatusCode.OK, this.departmentService.GetByParentId(id, string.Empty) ?? new DepartmentDTO[0]);
        }
    }
}

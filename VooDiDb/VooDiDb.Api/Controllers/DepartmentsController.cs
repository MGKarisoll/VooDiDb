using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using VooDiDb.Api.Extensions;
using VooDiDb.Api.Filters;
using VooDiDb.Services.Core;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.Api.Controllers {
    [Authorize]
    public class DepartmentsController : ApiController {
        private readonly IDepartmentService m_departmentService;

        public DepartmentsController(IDepartmentService departmentService) {
            this.m_departmentService = departmentService;
        }

        [HttpGet]
        [Pagination]
        public HttpResponseMessage Get() {
            if(this.Request.GetPagination() is Pagination pagination) {
                var all = this.m_departmentService.GetAll(string.Empty);
                var list = all.Skip(pagination.Page * pagination.Size).Take(pagination.Size).ToList();
                return this.Request.CreateResponse(HttpStatusCode.OK, new PagedList<DepartmentDTO>(pagination.Page, all.LongCount() / pagination.Size, list));
            } else {
                var list = this.m_departmentService.GetAll(string.Empty);
                return list == null
                    ? this.Request.CreateResponse(HttpStatusCode.OK, new PagedList<DepartmentDTO>(0, 1, new DepartmentDTO[0]))
                    : this.Request.CreateResponse(HttpStatusCode.OK, new PagedList<DepartmentDTO>(0, 1, list));
            }
        }

        [HttpGet]
        public HttpResponseMessage Get(long id) {
            return this.Request.CreateResponse(HttpStatusCode.OK, this.m_departmentService.GetById(id, string.Empty));
        }

        [HttpGet]
        [Route("api/departments/{id}/children")]
        public HttpResponseMessage GetByParentId(long id) {
            var list = this.m_departmentService.GetByParentId(id, string.Empty);
            if(list == null) return this.Request.CreateResponse(HttpStatusCode.OK, new DepartmentDTO[0]);
            return this.Request.CreateResponse(HttpStatusCode.OK, list);
        }
    }
}

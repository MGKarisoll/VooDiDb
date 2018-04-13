using System;
using System.Collections.Generic;
using System.Globalization;
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
            var pagination = string.Empty;
            if(this.Request.Headers.TryGetValues("X-Pagination", out var paginationValues)) {
                pagination = string.Join(", ", paginationValues ?? new string[] { });
            }

            var pageString = pagination.Split(';')[0].Split('=')[1];
            var sizeString = pagination.Split(';')[1].Split('=')[1];
            if(int.TryParse(pageString, out var page)) {
                int.TryParse(sizeString, out var size);
                var list = this.departmentService.GetAll(string.Empty).Skip(page * size).Take(size).ToList();
                return this.Request.CreateResponse(HttpStatusCode.OK, list);
            } else {
                var list = this.departmentService.GetAll(string.Empty);
                return list == null ? this.Request.CreateResponse(HttpStatusCode.OK, new DepartmentDTO[0]) : this.Request.CreateResponse(HttpStatusCode.OK, list);
            }
        }

        [HttpGet]
        public HttpResponseMessage Get(long id) {
            return this.Request.CreateResponse(HttpStatusCode.OK, this.departmentService.GetById(id, string.Empty));
        }

        [HttpGet]
        [Route("api/departments/{id}/children")]
        public HttpResponseMessage GetByParentId(long id) {
            var list = this.departmentService.GetByParentId(id, string.Empty);
            if(list == null) {
                return this.Request.CreateResponse(HttpStatusCode.OK, new DepartmentDTO[0]);
            } else {
                return this.Request.CreateResponse(HttpStatusCode.OK,  list);
            }
        }
    }
}

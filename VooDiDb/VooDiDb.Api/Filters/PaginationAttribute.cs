using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using VooDiDb.Api.Extensions;

namespace VooDiDb.Api.Filters {
    public class PaginationAttribute : ActionFilterAttribute {
        public override void OnActionExecuting(HttpActionContext actionContext) {
            actionContext.Request.SetPagination();
            base.OnActionExecuting(actionContext);
        }

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext) {
            actionExecutedContext.Request.SetPagination(null);
            base.OnActionExecuted(actionExecutedContext);
        }
    }
}

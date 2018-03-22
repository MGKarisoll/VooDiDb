using System.Security.Claims;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace VooDiDb.Api.Filters {
    public class ExtendedUserClaimsAuthorizeAttribute : ActionFilterAttribute {
        public override void OnActionExecuting(HttpActionContext actionContext) {
            // access to the HttpContextBase instance can be done using the Properties collection MS_HttpContext
            var context = (HttpContextBase)actionContext.Request.Properties["MS_HttpContext"];
            var userIdentity = context.User.Identity as ClaimsIdentity;
            //var user = new WebUserInfo(context);
            //actionContext.ActionArguments["claimsUser"] = user; // key name here must match the parameter name in the methods you want to populate with this instance
            base.OnActionExecuting(actionContext);
        }
    }
}

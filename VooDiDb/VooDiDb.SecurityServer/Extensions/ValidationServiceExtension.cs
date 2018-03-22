using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Http.ModelBinding;
using VooDiDb.Services.Core.Validation;

namespace VooDiDb.SecurityServer.Extensions {
    public static class ValidationServiceExtension {
        public static IEnumerable<ValidationResult> Validate<T>(this IValidationService<T> service,
                                                                T model,
                                                                ModelStateDictionary modelState) where T : IValidatableObject {
            var validatioonResults = service.Validate(model)?.ToList();
            if(validatioonResults == null) return null;
            foreach(var validatioonResult in validatioonResults)
            foreach(var memberName in validatioonResult.MemberNames)
                modelState.AddModelError(memberName, validatioonResult.ErrorMessage);
            return validatioonResults;
        }

        public static object GetService<T>(this IServiceProvider service,
                                           Type type,
                                           T model,
                                           ModelStateDictionary modelState) where T : IValidatableObject {
            if(!(service.GetService(type) is IValidationService<T> validationService)) return null;
            validationService.Validate(model, modelState);
            return validationService;
        }
    }
}

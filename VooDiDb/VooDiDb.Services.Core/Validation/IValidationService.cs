using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VooDiDb.Services.Core.Validation
{
    public interface IValidationService<in T> : IServiceProvider where T: IValidatableObject
    {
        IEnumerable<ValidationResult> Validate(T item);
    }
}
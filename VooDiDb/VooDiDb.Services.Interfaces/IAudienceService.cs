using System;
using VooDiDb.Services.Core;

namespace VooDiDb.Services.Interfaces
{
    public interface IAudienceService : IServiceProvider
    {
        AudienceDTO AddAudience(AudienceDTO model);
        AudienceDTO FindAudience(string id);
    }
}
using System;
using System.Security.Cryptography;
using Microsoft.Owin.Security.DataHandler.Encoder;
using VooDiDb.Domain.Core;
using VooDiDb.Domain.Interfaces;
using VooDiDb.Infrastructure.Business.ValidationServices;
using VooDiDb.Services.Core;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.Infrastructure.Business {
    public class AudienceService : IAudienceService {
        private readonly IRepository<Audience> repository;

        public AudienceService(IRepository<Audience> repository) {
            this.repository = repository;
        }

        public AudienceDTO AddAudience(AudienceDTO model) {
            var clientId = Guid.NewGuid().ToString("N");
            var key = new byte[32];
            RandomNumberGenerator.Create().GetBytes(key);
            var base64Secret = TextEncodings.Base64Url.Encode(key);

            var newAudience = new Audience { ClientId = clientId, Base64Secret = base64Secret, Name = model.Name };
            this.repository.Insert(newAudience);
            return new AudienceDTO {
                Name = newAudience.Name,
                ClientId = newAudience.ClientId,
                Base64Secret = newAudience.Base64Secret
            };
        }

        public AudienceDTO FindAudience(string id) {
            var entry = this.repository.FindBy(x => x.ClientId == id);
            if(entry == null) return null;
            return new AudienceDTO {
                Name = entry.Name,
                ClientId = entry.ClientId,
                Base64Secret = entry.Base64Secret
            };
        }

        public object GetService(Type serviceType) {
            if(serviceType == typeof(CreationAudienceValidationService))
                return new CreationAudienceValidationService(this.repository);
            return null;
        }
    }
}

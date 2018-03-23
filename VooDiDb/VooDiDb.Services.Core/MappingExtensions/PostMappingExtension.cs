using VooDiDb.Domain.Core;

namespace VooDiDb.Services.Core.MappingExtensions {
    public static class PostMappingExtension {
        public static PostDTO MapToPostDTO(this Post entity) {
            return new PostDTO {
                Id = entity.Id,
                Name = entity.Name,
                RowVersion = entity.RowVersion,
                IsActive = !entity.IsDeleted,
                SortOrder = entity.SortOrder
            };
        }

        public static Post MapToPost(this PostDTO dto) {
            return new Post {
                Id = dto.Id,
                Name = dto.Name,
                IsDeleted = !dto.IsActive,
                RowVersion = dto.RowVersion,
                SortOrder = dto.SortOrder
            };
        }
    }
}

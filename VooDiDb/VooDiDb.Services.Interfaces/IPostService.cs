using System;
using System.Collections.Generic;
using VooDiDb.Services.Core;

namespace VooDiDb.Services.Interfaces {
    public interface IPostService : IServiceProvider {
        PostDTO GetById(long id, string login);

        ICollection<PostDTO> GetAll(string login);

        ICollection<UserDTO> GetUsersByPostId(long postId, string login);

        PostDTO Create(PostDTO model, string login);

        PostDTO Update(PostDTO model, string login);

        int Delete(long id, string login);
    }
}

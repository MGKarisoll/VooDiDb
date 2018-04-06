using System;
using System.Collections.Generic;
using System.Linq;
using NLog;
using VooDiDb.Domain.Core;
using VooDiDb.Domain.Interfaces;
using VooDiDb.Services.Core;
using VooDiDb.Services.Core.MappingExtensions;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.Infrastructure.Business {
    public class PostService : IPostService {
        private readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly IRepository<Post> repository;
        private readonly IRepository<User> userRepository;

        public PostService(IRepository<Post> repository, IRepository<User> userRepository) {
            this.repository = repository;
            this.userRepository = userRepository;
        }

        public object GetService(Type serviceType) {
            return null;
        }

        public PostDTO GetById(long id, string login) {
            try {
                var user = this.userRepository.FindBy(x => x.Login == login && !x.IsDeleted);
                if(user == null) return null;
                return user.Role == UserRoles.ADMINISTRATOR
                    ? this.repository.FindById(id).MapToPostDTO()
                    : this.repository.FindBy(x => x.Id == id && !x.IsDeleted).MapToPostDTO();
            } catch(Exception exception) {
                this.logger?.Error(exception);
                throw;
            }
        }

        public ICollection<PostDTO> GetAll(string login) {
            try {
                var user = this.userRepository.FindBy(x => x.Login == login && !x.IsDeleted);
                if(user == null) return new PostDTO[] { };
                IQueryable<Post> query;
                switch(user.Role) {
                    case UserRoles.ADMINISTRATOR:
                        query = this.repository.GetAll();
                        break;
                    case UserRoles.USER:
                        query = this.repository.GetAll(x => !x.IsDeleted);
                        break;
                    default:
                        return new PostDTO[] { };
                }

                return query?.ToList().Select(x => x.MapToPostDTO()).ToList() ?? new List<PostDTO>(0);
            } catch(Exception exception) {
                this.logger?.Error(exception);
                throw;
            }
        }

        public ICollection<UserDTO> GetUsersByPostId(long postId, string login) {
            try {
                var user = this.userRepository.FindBy(x => x.Login == login && !x.IsDeleted);
                if(user == null) return new UserDTO[] { };
                IQueryable<User> query;
                switch(user.Role) {
                    case UserRoles.ADMINISTRATOR:
                        query = this.userRepository.GetAll(x => x.PostId == postId);
                        break;
                    case UserRoles.USER:
                        query = this.userRepository.GetAll(x => x.PostId == postId && !x.IsDeleted);
                        break;
                    default:
                        return new UserDTO[] { };
                }

                return query?.ToList().Select(x => x.MapToUserDTO()).ToList() ?? new List<UserDTO>(0);
            } catch(Exception exception) {
                this.logger?.Error(exception);
                throw;
            }
        }

        public PostDTO Create(PostDTO model, string login) {
            try {
                var user = this.userRepository.FindBy(x => x.Login == login && !x.IsDeleted);
                if(user == null) throw new ArgumentException("User has no permissions to add new post.", nameof(login));
                if(user.Role != UserRoles.ADMINISTRATOR) throw new ArgumentException("User has no permissions to add new post.", nameof(login));

                return this.repository.Insert(model.MapToPost()).MapToPostDTO();
            } catch(Exception exception) {
                this.logger?.Error(exception);
                throw;
            }
        }

        public PostDTO Update(PostDTO model, string login) {
            try {
                var user = this.userRepository.FindBy(x => x.Login == login && !x.IsDeleted);
                if(user == null) throw new ArgumentException("User has no permissions to edit post.", nameof(login));
                if(user.Role != UserRoles.ADMINISTRATOR) throw new ArgumentException("User has no permissions to edit post.", nameof(login));

                return this.repository.Update(model.MapToPost()).MapToPostDTO();
            } catch(Exception exception) {
                this.logger?.Error(exception);
                throw;
            }
        }

        public int Delete(long id, string login) {
            try {
                var user = this.userRepository.FindBy(x => x.Login == login && !x.IsDeleted);
                if(user == null) throw new ArgumentException("User has no permissions to delete post.", nameof(login));
                if(user.Role != UserRoles.ADMINISTRATOR) throw new ArgumentException("User has no permissions to delete post.", nameof(login));

                var entry = this.repository.FindById(id);
                if(entry == null) throw new ArgumentException("Post not found.", nameof(id));
                entry.IsDeleted = true;
                return this.repository.Update(entry) == null ? 0 : 1;
            } catch(Exception exception) {
                this.logger?.Error(exception);
                throw;
            }
        }
    }
}

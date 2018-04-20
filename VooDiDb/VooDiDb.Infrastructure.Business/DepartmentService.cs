using System;
using System.Linq;
using VooDiDb.Domain.Core;
using VooDiDb.Domain.Interfaces;
using VooDiDb.Services.Core;
using VooDiDb.Services.Core.MappingExtensions;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.Infrastructure.Business {
    public class DepartmentService : IDepartmentService {
        private readonly IRepository<Department> m_departmentRepository;
        private readonly IRepository<User> m_userRepository;

        public DepartmentService(IRepository<Department> departmentRepository, IRepository<User> userRepository) {
            this.m_departmentRepository = departmentRepository;
            this.m_userRepository = userRepository;
        }

        public object GetService(Type serviceType) {
            return null;
        }

        public DepartmentDTO GetById(long id, string login) {
            return this.m_departmentRepository
                       .FindById(id)?
                       .MapToDepartmentDTO();
        }

        public IQueryable<DepartmentDTO> GetByParentId(long? id, string login) {
            return this.m_departmentRepository
                       .GetAll(x => x.ParentId == id)
                       .Select(entity => new DepartmentDTO {
                           Id = entity.Id,
                           ParentId = entity.ParentId,
                           FullName = entity.FullName,
                           Name = entity.FullName,
                           IsActive = !entity.IsDeleted,
                           SortOrder = entity.SortOrder,
                           RowVersion = entity.RowVersion
                       });
        }

        public IQueryable<DepartmentDTO> GetAll(string login) {
            return this.m_departmentRepository
                       .GetAll(x => true)
                       .Select(entity => new DepartmentDTO {
                           Id = entity.Id,
                           ParentId = entity.ParentId,
                           FullName = entity.FullName,
                           Name = entity.FullName,
                           IsActive = !entity.IsDeleted,
                           SortOrder = entity.SortOrder,
                           RowVersion = entity.RowVersion
                       })
                       .OrderBy(x => x.Id);
        }
        public DepartmentDTO Create(DepartmentDTO item, string login) {
            var data = this.m_departmentRepository.Insert(new Department {
                Id = item.Id,
                Name = item.Name,
                FullName = item.FullName,
                IsDeleted = !item.IsActive,
                ParentId = item.ParentId,
                RowVersion = item.RowVersion,
                SortOrder = item.SortOrder
            }).MapToDepartmentDTO();
            return data;
        }

        public DepartmentDTO Update(DepartmentDTO item, string login) {
            throw new NotImplementedException();
        }

        public int Delete(long id, string login) {
            throw new NotImplementedException();
        }
    }
}

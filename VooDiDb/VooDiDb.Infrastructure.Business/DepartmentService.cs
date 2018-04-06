using System;
using System.Collections.Generic;
using System.Linq;
using VooDiDb.Domain.Core;
using VooDiDb.Domain.Interfaces;
using VooDiDb.Services.Core;
using VooDiDb.Services.Core.MappingExtensions;
using VooDiDb.Services.Interfaces;

namespace VooDiDb.Infrastructure.Business {
    public class DepartmentService : IDepartmentService {
        private readonly IRepository<Department> departmentRepository;
        private readonly IRepository<User> userRepository;

        public DepartmentService(IRepository<Department> departmentRepository, IRepository<User> userRepository) {
            this.departmentRepository = departmentRepository;
            this.userRepository = userRepository;
        }

        public object GetService(Type serviceType) {
            return null;
        }

        public DepartmentDTO GetById(long id, string login) {
            return this.departmentRepository.FindById(id)?.MapToDepartmentDTO();
        }

        public IEnumerable<DepartmentDTO> GetByParentId(long? id, string login) {
            return this.departmentRepository.GetAll(x => x.ParentId == id).ToList().Select(x => x.MapToDepartmentDTO());
        }

        public DepartmentDTO Create(DepartmentDTO item, string login) {
            throw new NotImplementedException();
        }

        public DepartmentDTO Update(DepartmentDTO item, string login) {
            throw new NotImplementedException();
        }

        public int Delete(long id, string login) {
            throw new NotImplementedException();
        }
    }
}

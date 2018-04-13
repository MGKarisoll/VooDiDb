using System;
using System.Collections.Generic;
using System.Linq;
using VooDiDb.Services.Core;

namespace VooDiDb.Services.Interfaces {
    public interface IDepartmentService : IServiceProvider {
        DepartmentDTO GetById(long id, string login);
        IQueryable<DepartmentDTO> GetByParentId(long? id, string login);
        IQueryable<DepartmentDTO> GetAll(string login);
        DepartmentDTO Create(DepartmentDTO item, string login);
        DepartmentDTO Update(DepartmentDTO item, string login);
        int Delete(long id, string login);
    }
}

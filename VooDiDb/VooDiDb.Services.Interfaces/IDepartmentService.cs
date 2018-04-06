using System;
using System.Collections.Generic;
using VooDiDb.Services.Core;

namespace VooDiDb.Services.Interfaces {
    public interface IDepartmentService : IServiceProvider {
        DepartmentDTO GetById(long id, string login);

        IEnumerable<DepartmentDTO> GetByParentId(long? id, string login);

        DepartmentDTO Create(DepartmentDTO item, string login);

        DepartmentDTO Update(DepartmentDTO item, string login);

        int Delete(long id, string login);
    }
}

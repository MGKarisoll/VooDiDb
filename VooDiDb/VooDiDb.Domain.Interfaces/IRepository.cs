﻿using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using VooDiDb.Domain.Core.Base;

namespace VooDiDb.Domain.Interfaces
{
    public interface IRepository<T> where T : BaseEntity 
    {
        IQueryable<T> GetAll();
        IQueryable<T> GetAll(Expression<Func<T, bool>> expression);
        T FindById(long id);
        T FindBy(Expression<Func<T,  bool>> expression);
        bool Any(Expression<Func<T, bool>> expression);
        T Insert(T value);
        T Update(T value);
        bool Delete(T value);

        Task<IQueryable<T>> GetAllAsync();
        Task<IQueryable<T>> GetAllAsync(Expression<Func<T, bool>> expression);
        Task<T> FindByIdAsync(long id);
        Task<T> FindByAsync(Expression<Func<T, bool>> expression);
        Task<bool> AnyAsync(Expression<Func<T, bool>> expression);
        Task<T> InsertAsync(T value);
        Task<T> UpdateAsync(T value);
        Task<bool> DeleteAsync(T value);
    }
}
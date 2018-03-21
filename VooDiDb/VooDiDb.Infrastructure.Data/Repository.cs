using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using VooDiDb.Domain.Core.Base;
using VooDiDb.Domain.Interfaces;

namespace VooDiDb.Infrastructure.Data
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly DbContext context;

        public Repository(DbContext context)
        {
            this.context = context;
        }

        public IQueryable<T> GetAll()
        {
            return context.Set<T>().AsQueryable();
        }

        public IQueryable<T> GetAll(Expression<Func<T, bool>> expression)
        {
            return context.Set<T>().Where(expression).AsQueryable();
        }

        public T FindById(long id)
        {
            return context.Set<T>().Find(id);
        }

        public T FindBy(Expression<Func<T, bool>> expression)
        {
            return context.Set<T>().FirstOrDefault(expression);
        }

        public bool Any(Expression<Func<T, bool>> expression)
        {
            return context.Set<T>().Any(expression);
        }

        public void Insert(T value)
        {
            context.Set<T>().Add(value);
            context.SaveChanges();
        }

        public void Update(T value)
        {
            context.Entry(value).State = EntityState.Modified;
            context.SaveChanges();
        }

        public void Delete(T value)
        {
            context.Entry(value).State = EntityState.Deleted;
            context.SaveChanges();
        }

        public async Task<IQueryable<T>> GetAllAsync()
        {
            return await Task.FromResult(context.Set<T>().AsQueryable());
        }

        public async Task<IQueryable<T>> GetAllAsync(Expression<Func<T, bool>> expression)
        {
            return await Task.FromResult(context.Set<T>().Where(expression).AsQueryable());
        }

        public async Task<T> FindByIdAsync(long id)
        {
            return await context.Set<T>().FindAsync(id);
        }

        public async Task<T> FindByAsync(Expression<Func<T, bool>> expression)
        {
            return await context.Set<T>().FirstOrDefaultAsync(expression);
        }

        public async Task<bool> AnyAsync(Expression<Func<T, bool>> expression)
        {
            return await context.Set<T>().AnyAsync(expression);
        }

        public async Task InsertAsync(T value)
        {
            context.Set<T>().Add(value);
            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(T value)
        {
            context.Entry(value).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public async Task DeleteAsync(T value)
        {
            context.Entry(value).State = EntityState.Deleted;
            await context.SaveChangesAsync();
        }

        public bool Any()
        {
            return context.Set<T>().Any();
        }
    }
}
using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using VooDiDb.Domain.Core.Base;
using VooDiDb.Domain.Interfaces;

namespace VooDiDb.Infrastructure.Data {
    public class Repository<T> : IRepository<T> where T : BaseEntity {
        private readonly DbContext context;

        public Repository(DbContext context) {
            this.context = context;
        }

        public IQueryable<T> GetAll() {
            return this.context.Set<T>().AsQueryable();
        }

        public IQueryable<T> GetAll(Expression<Func<T, bool>> expression) {
            return this.context.Set<T>().Where(expression).AsQueryable();
        }

        public T FindById(long id) {
            return this.context.Set<T>().Find(id);
        }

        public T FindBy(Expression<Func<T, bool>> expression) {
            return this.context.Set<T>().FirstOrDefault(expression);
        }

        public bool Any(Expression<Func<T, bool>> expression) {
            return this.context.Set<T>().Any(expression);
        }

        public T Insert(T value) {
            this.context.Set<T>().Add(value);
            this.context.SaveChanges();
            return value;
        }

        public T Update(T value) {
            var entry = this.context.Set<T>().Find(value.Id);
            this.context.Entry(entry).CurrentValues.SetValues(value);
            this.context.Entry(entry).State = EntityState.Modified;
            this.context.SaveChanges();
            return entry;
        }

        public bool Delete(T value) {
            this.context.Entry(value).State = EntityState.Deleted;
            return this.context.SaveChanges() > 0;
        }

        public async Task<IQueryable<T>> GetAllAsync() {
            return await Task.FromResult(this.context.Set<T>().AsQueryable());
        }

        public async Task<IQueryable<T>> GetAllAsync(Expression<Func<T, bool>> expression) {
            return await Task.FromResult(this.context.Set<T>().Where(expression).AsQueryable());
        }

        public async Task<T> FindByIdAsync(long id) {
            return await this.context.Set<T>().FindAsync(id);
        }

        public async Task<T> FindByAsync(Expression<Func<T, bool>> expression) {
            return await this.context.Set<T>().FirstOrDefaultAsync(expression);
        }

        public async Task<bool> AnyAsync(Expression<Func<T, bool>> expression) {
            return await this.context.Set<T>().AnyAsync(expression);
        }

        public async Task<T> InsertAsync(T value) {
            this.context.Set<T>().Add(value);
            await this.context.SaveChangesAsync();
            return value;
        }

        public async Task<T> UpdateAsync(T value) {
            this.context.Entry(value).State = EntityState.Modified;
            await this.context.SaveChangesAsync();
            return value;
        }

        public async Task<bool> DeleteAsync(T value) {
            this.context.Entry(value).State = EntityState.Deleted;
            return await this.context.SaveChangesAsync() > 0;
        }

        public bool Any() {
            return this.context.Set<T>().Any();
        }
    }
}

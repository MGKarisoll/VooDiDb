using System.Data.Entity.Migrations;
using VooDiDb.Domain.Core;

namespace VooDiDb.Infrastructure.Data
{
    public class SeedConfiguration
    {
        public static void Seed(AppDbContext context)
        {
            // seed departments
            context.Departments.AddOrUpdate(x => x.Id,
                new Department
                {
                    Id = 1,
                    ParentId = null,
                    FullName = "УЗО \"Гродненский зональный центр гигиены и эпидемиологии\"",
                    Name = "Учреждение"
                }, new Department {Id = 2, ParentId = 1, FullName = "Отдел охраны труда", Name = "Отдел ОТ"});
            // seed posts
            context.Posts.AddOrUpdate(x => x.Id,
                new Post {Id = 1, Name = "Системная учетная запись"},
                new Post {Id = 2, Name = "Главный врач"},
                new Post {Id = 3, Name = "Помошник главного врача"},
                new Post {Id = 4, Name = "Врач-гигенист"},
                new Post {Id = 5, Name = "Помошник врача-гигиениста"},
                new Post {Id = 6, Name = "Заведующий отделением"},
                new Post {Id = 7, Name = "Инженер"},
                new Post {Id = 8, Name = "Оператор ЭВМ"});
        }
    }
}
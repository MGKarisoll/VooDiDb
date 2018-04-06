using System.Data.Entity.Migrations;
using VooDiDb.Domain.Core;
using VooDiDb.Infrastructure.Data.Context;
using VooDiDb.Utilites.Util;

namespace VooDiDb.Infrastructure.Data.Configuration
{
    public class SeedConfiguration
    {
        public static void Seed(AppDbContext context)
        {
            // seed departments
            context.Set<Department>().AddOrUpdate(x => x.Id,
                new Department
                {
                    Id = 1,
                    ParentId = null,
                    FullName = "УЗО \"Гродненский зональный центр гигиены и эпидемиологии\"",
                    Name = "Учреждение"
                },
                new Department {Id = 2, ParentId = 1, FullName = "Отдел охраны труда", Name = "Отдел ОТ"},
                new Department {Id = 3, ParentId = 2, FullName = "Отдел охраны труда 1", Name = "Отдел ОТ1"},
                new Department {Id = 4, ParentId = 2, FullName = "Отдел охраны труда 2", Name = "Отдел ОТ2"});
                
            // seed posts
            context.Set<Post>().AddOrUpdate(x => x.Id,
                new Post {Id = 1, Name = "Системная учетная запись"},
                new Post {Id = 2, Name = "Главный врач"},
                new Post {Id = 3, Name = "Помошник главного врача"},
                new Post {Id = 4, Name = "Врач-гигенист"},
                new Post {Id = 5, Name = "Помошник врача-гигиениста"},
                new Post {Id = 6, Name = "Заведующий отделением"},
                new Post {Id = 7, Name = "Инженер"},
                new Post {Id = 8, Name = "Оператор ЭВМ"});

            // seed administrator
            context.Set<User>().AddOrUpdate(x => x.Id,
                new User
                {
                    Id = 1,
                    Login = @"admin\admin",
                    DepartmentId = 1,
                    FullName = "Administrator",
                    Name = "Admin",
                    Password = Security.GetMd5HashString("admin13"),
                    PostId = 1,
                    Role = UserRoles.ADMINISTRATOR,
                    SortOrder = 0
                });
        }
    }
}
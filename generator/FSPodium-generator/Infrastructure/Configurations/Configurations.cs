using FSPodium_generator.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage;

namespace FSPodium_generator.Infrastructure.Configurations;


public class DisciplineConfiguration : IEntityTypeConfiguration<Discipline>
{
    public void Configure(EntityTypeBuilder<Discipline> builder)
    {
        builder.HasData(
            new Discipline { id = "1010011811Я", name = "Программирование алгоритмическое" },
            new Discipline { id = "1010021811Я", name = "Программирование продуктовое" },
            new Discipline { id = "1010051811Я", name = "Программирование систем информационной безопасности" },
            new Discipline { id = "1010013811Я", name = "Программирование беспилотных авиационных систем" },
            new Discipline { id = "1010014811Я", name = "Программирование робототехники" }
        );
    }
}

public class FederalDistrictConfiguration : IEntityTypeConfiguration<FederalDistrict>
{
    public void Configure(EntityTypeBuilder<FederalDistrict> builder)
    {
        builder.HasData(
            new FederalDistrict { id = "1", name = "Центральный федеральный округ" },
            new FederalDistrict { id = "2", name = "Южный федеральный округ" },
            new FederalDistrict { id = "3", name = "Северо-западный федеральный округ" },
            new FederalDistrict { id = "4", name = "Дальневосточный федеральный округ" },
            new FederalDistrict { id = "5", name = "Сибирский федеральный округ" },
            new FederalDistrict { id = "6", name = "Уральский федеральный округ" },
            new FederalDistrict { id = "7", name = "Приволжский федеральный округ" },
            new FederalDistrict { id = "8", name = "Северо-Кавказский федеральный округ" },
            new FederalDistrict { id = "9", name = "Новые регионы" }
        );
    }
}

public class RegionConfiguration : IEntityTypeConfiguration<Region>
{
    public static List<string> regionIds = [];
    
    public void Configure(EntityTypeBuilder<Region> builder)
    {
        for (int i = 0; i < 10; i++)
        {
            regionIds.Add(Guid.NewGuid().ToString());
        }
        
        builder.HasData(
            new Region { id = regionIds[0], name = "г. Москва", districtId = "1" },
            new Region { id = Guid.NewGuid().ToString(), name = "Белгородская область", districtId = "1" },
            new Region { id = Guid.NewGuid().ToString(), name = "Брянская область", districtId = "1" },
            new Region { id = Guid.NewGuid().ToString(), name = "Владимирская область", districtId = "1" },
            new Region { id = Guid.NewGuid().ToString(), name = "Воронежская область", districtId = "1" },
            new Region { id = Guid.NewGuid().ToString(), name = "Ивановская область", districtId = "1" },
            new Region { id = Guid.NewGuid().ToString(), name = "Калужская область", districtId = "1" },
            new Region { id = Guid.NewGuid().ToString(), name = "Костромская область", districtId = "1" },
            new Region { id = regionIds[4], name = "Курская область", districtId = "1" },
            new Region { id = Guid.NewGuid().ToString(), name = "Липецкая область", districtId = "1" },
            new Region { id = Guid.NewGuid().ToString(), name = "Московская область", districtId = "1" },
            new Region { id = Guid.NewGuid().ToString(), name = "Орловская область", districtId = "1" },
            new Region { id = regionIds[6], name = "Рязанская область", districtId = "1" },
            new Region { id = Guid.NewGuid().ToString(), name = "Смоленская область", districtId = "1" },
            new Region { id = Guid.NewGuid().ToString(), name = "Тамбовская область", districtId = "1" },
            new Region { id = regionIds[7], name = "Тверская область", districtId = "1" },
            new Region { id = Guid.NewGuid().ToString(), name = "Тульская область", districtId = "1" },
            new Region { id = regionIds[8], name = "Ярославская область", districtId = "1" },
            new Region { id = Guid.NewGuid().ToString(), name = "Республика Адыгея", districtId = "2" },
            new Region { id = regionIds[5], name = "Республика Калмыкия", districtId = "2" },
            new Region { id = Guid.NewGuid().ToString(), name = "Краснодарский край", districtId = "2" },
            new Region { id = Guid.NewGuid().ToString(), name = "Астраханская область", districtId = "2" },
            new Region { id = Guid.NewGuid().ToString(), name = "Волгоградская область", districtId = "2" },
            new Region { id = regionIds[3], name = "Ростовская область", districtId = "2" },
            new Region { id = Guid.NewGuid().ToString(), name = "город Севастополь", districtId = "2" },
            new Region { id = Guid.NewGuid().ToString(), name = "Республика Крым", districtId = "2" },
            new Region { id = Guid.NewGuid().ToString(), name = "Республика Карелия", districtId = "3" },
            new Region { id = Guid.NewGuid().ToString(), name = "Республика Коми", districtId = "3" },
            new Region { id = Guid.NewGuid().ToString(), name = "Архангельская область", districtId = "3" },
            new Region { id = Guid.NewGuid().ToString(), name = "Калининградская область", districtId = "3" },
            new Region { id = Guid.NewGuid().ToString(), name = "Ленинградская область", districtId = "3" },
            new Region { id = Guid.NewGuid().ToString(), name = "Мурманская область", districtId = "3" },
            new Region { id = Guid.NewGuid().ToString(), name = "Новгородская область", districtId = "3" },
            new Region { id = Guid.NewGuid().ToString(), name = "Псковская область", districtId = "3" },
            new Region { id = regionIds[9], name = "Ненецкий автономный округ", districtId = "3" },
            new Region { id = Guid.NewGuid().ToString(), name = "г. Санкт-Петербург", districtId = "3" },
            new Region { id = Guid.NewGuid().ToString(), name = "Республика Саха-Якутия", districtId = "4" },
            new Region { id = Guid.NewGuid().ToString(), name = "Камчатский край", districtId = "4" },
            new Region { id = Guid.NewGuid().ToString(), name = "Приморский край", districtId = "4" },
            new Region { id = Guid.NewGuid().ToString(), name = "Хабаровский край", districtId = "4" },
            new Region { id = Guid.NewGuid().ToString(), name = "Амурская область", districtId = "4" },
            new Region { id = Guid.NewGuid().ToString(), name = "Магаданская область", districtId = "4" },
            new Region { id = Guid.NewGuid().ToString(), name = "Республика Бурятия", districtId = "4" },
            new Region { id = Guid.NewGuid().ToString(), name = "Забайкальский край", districtId = "4" },
            new Region { id = Guid.NewGuid().ToString(), name = "Сахалинская область", districtId = "4" },
            new Region { id = Guid.NewGuid().ToString(), name = "Еврейский АО", districtId = "4" },
            new Region { id = Guid.NewGuid().ToString(), name = "Чукотский АО", districtId = "4" },
            new Region { id = Guid.NewGuid().ToString(), name = "Республика Алтай", districtId = "5" },
            new Region { id = Guid.NewGuid().ToString(), name = "Республика Тыва", districtId = "5" },
            new Region { id = Guid.NewGuid().ToString(), name = "Республика Хакасия", districtId = "5" },
            new Region { id = Guid.NewGuid().ToString(), name = "Алтайский край", districtId = "5" },
            new Region { id = Guid.NewGuid().ToString(), name = "Красноярский край", districtId = "5" },
            new Region { id = Guid.NewGuid().ToString(), name = "Иркутская область", districtId = "5" },
            new Region { id = Guid.NewGuid().ToString(), name = "Кемеровская область - Кузбасс", districtId = "5" },
            new Region { id = Guid.NewGuid().ToString(), name = "Новосибирская область", districtId = "5" },
            new Region { id = Guid.NewGuid().ToString(), name = "Омская область", districtId = "5" },
            new Region { id = Guid.NewGuid().ToString(), name = "Томская область", districtId = "5" },
            new Region { id = Guid.NewGuid().ToString(), name = "Курганская область", districtId = "6" },
            new Region { id = Guid.NewGuid().ToString(), name = "Свердловская область", districtId = "6" },
            new Region { id = Guid.NewGuid().ToString(), name = "Тюменская область", districtId = "6" },
            new Region { id = Guid.NewGuid().ToString(), name = "Челябинская область", districtId = "6" },
            new Region { id = Guid.NewGuid().ToString(), name = "Ханты-Мансийский автономный округ - Югра", districtId = "6" },
            new Region { id = Guid.NewGuid().ToString(), name = "Ямало-Ненецкий АО", districtId = "6" },
            new Region { id = Guid.NewGuid().ToString(), name = "Республика Башкортостан", districtId = "7" },
            new Region { id = Guid.NewGuid().ToString(), name = "Республика Марий Эл", districtId = "7" },
            new Region { id = Guid.NewGuid().ToString(), name = "Республика Мордовия", districtId = "7" },
            new Region { id = Guid.NewGuid().ToString(), name = "Республика Татарстан", districtId = "7" },
            new Region { id = Guid.NewGuid().ToString(), name = "Удмуртская Республика", districtId = "7" },
            new Region { id = Guid.NewGuid().ToString(), name = "Чувашская Республика", districtId = "7" },
            new Region { id = Guid.NewGuid().ToString(), name = "Кировская область", districtId = "7" },
            new Region { id = Guid.NewGuid().ToString(), name = "Нижегородская область", districtId = "7" },
            new Region { id = Guid.NewGuid().ToString(), name = "Оренбургская область", districtId = "7" },
            new Region { id = Guid.NewGuid().ToString(), name = "Пензенская область", districtId = "7" },
            new Region { id = Guid.NewGuid().ToString(), name = "Пермский край", districtId = "7" },
            new Region { id = Guid.NewGuid().ToString(), name = "Самарская область", districtId = "7" },
            new Region { id = Guid.NewGuid().ToString(), name = "Саратовская область", districtId = "7" },
            new Region { id = Guid.NewGuid().ToString(), name = "Ульяновская область", districtId = "7" },
            new Region { id = Guid.NewGuid().ToString(), name = "Республика Дагестан", districtId = "8" },
            new Region { id = Guid.NewGuid().ToString(), name = "Республика Ингушетия", districtId = "8" },
            new Region { id = Guid.NewGuid().ToString(), name = "Кабардино-Балкарская Республика", districtId = "8" },
            new Region { id = Guid.NewGuid().ToString(), name = "Карачаево-Черкесская Республика", districtId = "8" },
            new Region { id = Guid.NewGuid().ToString(), name = "Республика Северная Осетия - Алания", districtId = "8" },
            new Region { id = Guid.NewGuid().ToString(), name = "Ставропольский край", districtId = "8" },
            new Region { id = Guid.NewGuid().ToString(), name = "Чеченская республика", districtId = "8" },
            new Region { id = regionIds[1], name = "Донецкая Народная Республика", districtId = "9" },
            new Region { id = regionIds[2], name = "Луганская Народная Республика", districtId = "9" },
            new Region { id = Guid.NewGuid().ToString(), name = "Запорожская область", districtId = "9" },
            new Region { id = Guid.NewGuid().ToString(), name = "Херсонская область", districtId = "9" }
        );
    }
}

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public static List<string> UserIds = [];
    
    public void Configure(EntityTypeBuilder<User> builder)
    {
        for (int i = 0; i < 5; i++)
        {
            UserIds.Add(Guid.NewGuid().ToString());
        }
        
        builder.HasData(
            new User
            {
                id = UserIds[0],
                name = "Иванов Иван Иванович",
                email = "central@fsp-russia.ru",
                emailVerified = DateTime.UtcNow,
                password = BCrypt.Net.BCrypt.EnhancedHashPassword("11111"),
                role = UserRole.CENTRAL_REP.ToString()
            },
            new User
            {
                id = UserIds[1],
                name = "Петров Петр Петрович",
                email = "regional1@fsp-russia.ru",
                emailVerified = DateTime.UtcNow,
                password = BCrypt.Net.BCrypt.EnhancedHashPassword("11111"),
                role = UserRole.REGIONAL_REP.ToString()
            },
            new User
            {
                id = UserIds[2],
                name = "Сидоров Алексей Викторович",
                email = "regional2@fsp-russia.ru",
                emailVerified = DateTime.UtcNow,
                password = BCrypt.Net.BCrypt.EnhancedHashPassword("11111"),
                role = UserRole.REGIONAL_REP.ToString()
            },
            new User
            {
                id = UserIds[3],
                name = "Смирнова Екатерина Андреевна",
                email = "regional3@fsp-russia.ru",
                emailVerified = DateTime.UtcNow,
                password = BCrypt.Net.BCrypt.EnhancedHashPassword("11111"),
                role = UserRole.REGIONAL_REP.ToString()
            },
            new User
            {
                id = UserIds[4],
                name = "Кузнецов Дмитрий Александрович",
                email = "regional6@fsp-russia.ru",
                emailVerified = DateTime.UtcNow,
                password = BCrypt.Net.BCrypt.EnhancedHashPassword("11111"),
                role = UserRole.REGIONAL_REP.ToString()
            }
        );
    }
}


public class RepresentationConfiguration : IEntityTypeConfiguration<Representation>
{
    public void Configure(EntityTypeBuilder<Representation> builder)
    {
        builder.HasData(
            new Representation()
            {
                id = Guid.NewGuid().ToString(),
                regionId = RegionConfiguration.regionIds[0],
                userId = UserConfiguration.UserIds[0],
                createdAt = DateTime.UtcNow,
            },
            new Representation()
            {
                id = Guid.NewGuid().ToString(),
                regionId = RegionConfiguration.regionIds[1],
                userId = UserConfiguration.UserIds[1],
                createdAt = DateTime.UtcNow,
            },
            new Representation()
            {
                id = Guid.NewGuid().ToString(),
                regionId = RegionConfiguration.regionIds[2],
                userId = UserConfiguration.UserIds[2],
                createdAt = DateTime.UtcNow,
            },
            new Representation()
            {
                id = Guid.NewGuid().ToString(),
                regionId = RegionConfiguration.regionIds[3],
                userId = UserConfiguration.UserIds[3],
                createdAt = DateTime.UtcNow,
            }
        );
    }
}

public class RepresentationRequestConfiguration : IEntityTypeConfiguration<RepresentationRequest>
{
    public void Configure(EntityTypeBuilder<RepresentationRequest> builder)
    {
        builder.HasData(
            new RepresentationRequest()
            {
                id = Guid.NewGuid().ToString(),
                name = "Иванов Иван Иванович",
                email = "test@fsp-russia.fsp",
                regionId = RegionConfiguration.regionIds[0],
                status = Status.REFUSED.ToString(),
                refusalReason = "Отказано в доступе"
            },
            new RepresentationRequest
            {
                id = Guid.NewGuid().ToString(),
                name = "Петрова Анна Сергеевна",
                email = "minoddein.ezz@gmail.com",
                regionId = RegionConfiguration.regionIds[1],
                status = Status.APPROVED.ToString()
            },
            new RepresentationRequest
            {
                id = Guid.NewGuid().ToString(),
                name = "Сидоров Алексей Викторович",
                email = "s.scorpi-on@ya.ru",
                regionId = RegionConfiguration.regionIds[2],
                status = Status.APPROVED.ToString()
            },
            new RepresentationRequest
            {
                id = Guid.NewGuid().ToString(),
                name = "Смирнова Екатерина Андреевна",
                email = "test4@fsp-russia.fsp",
                regionId = RegionConfiguration.regionIds[3],
                status = Status.PENDING.ToString()
            },
            new RepresentationRequest
            {
                id = Guid.NewGuid().ToString(),
                name = "Кузнецов Дмитрий Александрович",
                email = "test5@fsp-russia.fsp",
                regionId = RegionConfiguration.regionIds[4],
                status = Status.REFUSED.ToString(),
                refusalReason = "Санкции"
            },
            new RepresentationRequest
            {
                id = Guid.NewGuid().ToString(),
                name = "Попов Сергей Владимирович",
                email = "test6@fsp-russia.fsp",
                regionId = RegionConfiguration.regionIds[5],
                status = Status.REFUSED.ToString(),
                refusalReason = "Отказано в доступе"
            },
            new RepresentationRequest
            {
                id = Guid.NewGuid().ToString(),
                name = "Федорова Ольга Павловна",
                email = "test7@fsp-russia.fsp",
                regionId = RegionConfiguration.regionIds[6],
                status = Status.PENDING.ToString()
            },
            new RepresentationRequest
            {
                id = Guid.NewGuid().ToString(),
                name = "Михайлов Андрей Юрьевич",
                email = "test8@fsp-russia.fsp",
                regionId = RegionConfiguration.regionIds[7],
                status = Status.REFUSED.ToString(),
                refusalReason = "Не корректные данные"
            },
            new RepresentationRequest
            {
                id = Guid.NewGuid().ToString(),
                name = "Никитина Светлана Викторовна",
                email = "test9@fsp-russia.fsp",
                regionId = RegionConfiguration.regionIds[8],
                status = Status.REFUSED.ToString(),
                refusalReason = "Не корректные данные"
            },
            new RepresentationRequest
            {
                id = Guid.NewGuid().ToString(),
                name = "Никитина Олеся Михайловна",
                email = "test10@fsp-russia.fsp",
                regionId = RegionConfiguration.regionIds[9],
                status = Status.PENDING.ToString()
            }
        );
    }
}
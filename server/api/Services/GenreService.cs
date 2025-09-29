using api.Dtos;
using dataaccess;
using dataaccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class GenreService(LibraryDbContext dbContext) : IGenreService
{

    

    public async Task<List<Genre>> GetAllGenre() =>
        await dbContext.Genres.ToListAsync();

  

    public async Task<Genre> CreateGenre(GenreDto dto)
    {
        var genre = new Genre { 
            Id = Guid.NewGuid().ToString(),
            Name = dto.Name,
            Createdat = DateTime.UtcNow 
        };
        dbContext.Genres.Add(genre);
        await dbContext.SaveChangesAsync();
        return genre;
    }
}
using api.Dtos;
using dataaccess.Entities;

namespace api.Services;

public interface IGenreService
{
    
    Task<List<Genre>> GetAllGenre();
    Task<Genre> CreateGenre(GenreDto dto);
}
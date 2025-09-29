using api.Dtos;
using api.Services;
using dataaccess.Entities;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;


[ApiController]
public class GenreController(IGenreService genreService) : ControllerBase
{

   
    [Route(nameof(GetAllGenre))]
    [HttpGet]
    public async Task<ActionResult<List<Genre>>> GetAllGenre()
    {
        var genres = await genreService.GetAllGenre();
        return genres;
    }

    [Route(nameof(CreateGenre))]
    [HttpPost]
    public async Task<ActionResult<Genre>> CreateGenre([FromBody]GenreDto dto)
    {
        var result = await genreService.CreateGenre(dto);
        return result;
    }

    
    
}
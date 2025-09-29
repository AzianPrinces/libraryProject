using System.ComponentModel.DataAnnotations;

namespace api.Dtos;

public record GenreDto
(
    [Range(0,5)] 
    int Id, string Name);
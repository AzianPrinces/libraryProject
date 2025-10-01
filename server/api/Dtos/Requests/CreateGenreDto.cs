using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Requests;

public class CreateGenreDto
{
    [Required] [MinLength(1)] public string Name { get; set; }
}
using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Requests;

public class UpdateAuthorRequestDto
{
    [Required] [MinLength(1)] public string AuthorIdForLookup { get; set; }

    [Required] [MinLength(1)] public string NewName { get; set; }

    [Required]
    
    public List<string> BooksIds { get; set; } = new();
}
using System.ComponentModel.DataAnnotations;

namespace api;

public sealed class AppOptions
{
    [Required] [MinLength(1)] public string ConnectionString { get; set; } = string.Empty;
}
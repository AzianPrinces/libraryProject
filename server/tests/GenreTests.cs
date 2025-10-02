using dataaccess;
using dataaccess.Entities;

namespace tests;

public class GenreTests
{
    private readonly LibraryDbContext _context;
    
    public GenreTests(LibraryDbContext context)
    {

        _context = context;
    }
    
    [Fact]
    public void CanAddGenre()
    {
        var genre = new Genre { Id = Guid.NewGuid().ToString(), Name = "TestGenre" };
        _context.Genres.Add(genre);
        _context.SaveChanges();

        var result = _context.Genres.FirstOrDefault(g => g.Name == "TestGenre");
        Assert.NotNull(result);
    }
}
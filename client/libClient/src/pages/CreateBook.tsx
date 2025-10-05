import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  type AuthorDto,
  type CreateBookRequestDto,
  type GenreDto,
  type BookDto,
  LibraryClient,
} from "../models/generated-client.ts";

export default function CreateBook() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState<number | "">("");

  // Use string IDs as per generated client (ids are strings)
  const [authorId, setAuthorId] = useState<string | "">("");
  const [genreId, setGenreId] = useState<string | "">("");
  const [imageurl, setImageUrl] = useState<string>("");

  // Allow creating new author/genre inline
  const [newAuthorName, setNewAuthorName] = useState("");
  const [newGenreName, setNewGenreName] = useState("");

  const [author, setAuthor] = useState<AuthorDto[]>([]);
  const [genre, setGenre] = useState<GenreDto[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingLists, setLoadingLists] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const api = new LibraryClient("http://localhost:5028");

  useEffect(() => {
    const load = async () => {
      try {
        const [authorsRes, genresRes] = await Promise.all([
          api.getAuthors?.() ?? [],
          api.getGenres?.() ?? [],
        ]);
        setAuthor((authorsRes as AuthorDto[]) ?? []);
        setGenre((genresRes as GenreDto[]) ?? []);
      } catch (e) {
        console.error(e);
        setError("Failed to load authors/genres.");
      } finally {
        setLoadingLists(false);
      }
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Front-end validation
    if (title.trim().length === 0) {
      setError("Title is required.");
      return;
    }
    if (pages === "" || Number.isNaN(Number(pages)) || Number(pages) < 1) {
      setError("Pages must be a positive number.");
      return;
    }

    // Require either an existing author or a new author name
    if ((authorId === "" && newAuthorName.trim() === "") || (genreId === "" && newGenreName.trim() === "")) {
      setError("Please select or create both an author and a genre.");
      return;
    }

    setLoading(true);
    try {
      let resolvedAuthorId = authorId as string | undefined;
      let resolvedGenreId = genreId as string | undefined;

      // Create author if user provided a new name
      if (newAuthorName.trim()) {
        const createdAuthor = await api.createAuthor({ name: newAuthorName.trim() });
        resolvedAuthorId = createdAuthor.id!;
      }

      // Create genre if user provided a new name
      if (newGenreName.trim()) {
        const createdGenre = await api.createGenre({ name: newGenreName.trim() });
        resolvedGenreId = createdGenre.id!;
      }

      // Create the book first (CreateBook only accepts title and pages per generated client)
      const bookDto = (await api.createBook({
        title: title.trim(),
        pages: Number(pages),
          imageurl: imageurl || undefined,
      } as CreateBookRequestDto)) as BookDto;

      // Then update the book to attach author and genre
      await api.updateBook({
        bookIdForLookupReference: bookDto.id!,
        newPageCount: Number(pages),
        newTitle: title.trim(),
        authorsIds: resolvedAuthorId ? [resolvedAuthorId] : [],
        genreId: resolvedGenreId,
          imageurl: imageurl || undefined,
      });

      navigate("/books");
    } catch (err) {
      console.error("Error creating book:", err);
      setError("Failed to create book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-yellow-400">Create New Book</h2>

      <form onSubmit={handleSubmit} className="card bg-base-200 shadow-lg p-6 space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Book Title</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Author</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value || "")}
            disabled={loadingLists}
          >
            <option value="">Select an author</option>
            {author.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          <div className="mt-2">
            <label className="label">
              <span className="label-text">Or create new author</span>
            </label>
            <input
              type="text"
              placeholder="New author name (optional)"
              className="input input-bordered w-full"
              value={newAuthorName}
              onChange={(e) => setNewAuthorName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Book Genre</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={genreId}
            onChange={(e) => setGenreId(e.target.value || "")}
            disabled={loadingLists}
          >
            <option value="">Select a genre</option>
            {genre.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          <div className="mt-2">
            <label className="label">
              <span className="label-text">Or create new genre</span>
            </label>
            <input
              type="text"
              placeholder="New genre name (optional)"
              className="input input-bordered w-full"
              value={newGenreName}
              onChange={(e) => setNewGenreName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Number of Pages</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={pages}
            onChange={(e) => setPages(e.target.value ? Number(e.target.value) : "")}
            required
            min={1}
          />
        </div>

          <div>
              <label className="label">
                  <span className="label-text">Book Cover Image URL</span>
              </label>
              <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="https://example.com/cover.jpg"
                  value={imageurl}
                  onChange={(e) => setImageUrl(e.target.value)}
              />
          </div>

          {imageurl && (
              <div className="mt-4 flex justify-center">
                  <img
                      src={imageurl}
                      alt="Book cover preview"
                      className="w-32 h-48 object-cover rounded-lg shadow-md"
                  />
              </div>
          )}


          {error && <p className="text-red-500">{error}</p>}

        <div className="card-actions justify-end">
          <button
            type="button"
            onClick={() => navigate("/books")}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            disabled={loading || loadingLists}
          >
            {loading ? "Creating..." : "Create Book"}
          </button>
        </div>
      </form>
    </div>
  );
}
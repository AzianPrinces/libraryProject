import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import{
    type AuthorDto,
    type GenreDto,
    type BookDto,
    type UpdateBookRequestDto,
    LibraryClient } from "../models/generated-client";

export default function EditBook() {

    const navigate = useNavigate();
    const { bookId } = useParams<{ bookId: string }>();

    const [title, setTitle] = useState("");
    const [pages, setPages] = useState<number | "">("");
    const [authorId, setAuthorId] = useState<string | "">("");
    const [genreId, setGenreId] = useState<string | "">("");
    const [newAuthorName, setNewAuthorName] = useState("");
    const [newGenreName, setNewGenreName] = useState("");
    const [imageurl, setImageUrl] = useState<string>("");


    const [authors, setAuthors] = useState<AuthorDto[]>([]);
    const [genres, setGenres] = useState<GenreDto[]>([]);

    const [loading, setLoading] = useState(false);
    const [loadingLists, setLoadingLists] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const api = new LibraryClient("http://localhost:5028");

    useEffect(() => {
        if (!bookId) return;
        const load = async () => {
            try {
                const [authorsRes, genresRes, bookRes] = await Promise.all([
                    api.getAuthors?.() ?? [],
                    api.getGenres?.() ?? [],
                    api.getBooks().then((b) => (b as BookDto[]).find((x) => x.id === bookId)),

                ]);

                setAuthors((authorsRes as AuthorDto[]) ?? []);
                setGenres((genresRes as GenreDto[]) ?? []);

                if (bookRes) {
                    const b = bookRes as BookDto;
                    setTitle(b.title ?? "");
                    setPages(b.pages ?? "");
                    setGenreId(b.genreId ?? "");
                    setAuthorId(b.authorsIds?.[0] ?? "");
                    setImageUrl(b.imageurl ?? "");
                }
            } catch (e) {
                console.error(e);
                setError("Failed to load book details.");
            } finally {
                setLoadingLists(false);
            }
        };
        load();
    }, [bookId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!bookId) {
            setError("Book ID is missing.");
            return;
        }

        if (title.trim().length === 0) {
            setError("Title is required.");
            return;
        }

        if (pages === "" || Number.isNaN(Number(pages)) || Number(pages) < 1) {
            setError("Pages must be a positive number.");
            return;
        }

        setLoading(true);

        try {

            let resolvedAuthorId = authorId as string | undefined;
            let resolvedGenreId = genreId as string | undefined;

            if (newAuthorName.trim()) {
                const createdAuthor = await api.createAuthor({
                    name: newAuthorName.trim() });
                resolvedAuthorId = createdAuthor.id!;
            }
            if (newGenreName.trim()) {
                const createGenre = await api.createGenre({
                    name: newGenreName.trim()});
                resolvedGenreId = createGenre.id!;
            }


            const updateDto: UpdateBookRequestDto = {
                bookIdForLookupReference: bookId,
                newTitle: title.trim(),
                newPageCount: Number(pages),
                authorsIds: resolvedAuthorId ? [resolvedAuthorId] : [],
                genreId: resolvedGenreId ? resolvedGenreId : undefined,
                imageurl: imageurl || undefined,
            };

            await api.updateBook(updateDto);
            alert("Book updated successfully!");
            navigate("/books");
        } catch (err) {
            console.error("Error updating book:", err);
            setError("Failed to update book. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loadingLists) return <p className="text-center p-6">Loading book info...</p>;

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center text-yellow-400">Edit Book</h2>

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
                        onChange={(e) => setAuthorId(e.target.value)}
                    >
                        <option value="">Select an author</option>
                        {authors.map((a) => (
                            <option key={a.id} value={a.id}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                </div>

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

                <div>
                    <label className="label">
                        <span className="label-text">Genre</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        value={genreId}
                        onChange={(e) => setGenreId(e.target.value)}
                    >
                        <option value="">Select a genre</option>
                        {genres.map((g) => (
                            <option key={g.id} value={g.id}>
                                {g.name}
                            </option>
                        ))}
                    </select>
                </div>
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
                        placeholder="https://example.com/mybook.jpg"
                        className="input input-bordered w-full"
                        value={imageurl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>

                {imageurl && (
                    <div className="mt-4 flex justify-center">
                        <img
                            src={imageurl}
                            alt="Book cover preview"
                            className="w-40 h-56 object-cover rounded-lg shadow-md"
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
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Book"}
                    </button>
                </div>
            </form>
        </div>
    );
}

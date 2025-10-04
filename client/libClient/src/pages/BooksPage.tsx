import { useEffect } from 'react';

import { useAtom } from "jotai";
import {authorsAtom, booksAtom, genresAtom, loadingAtom} from "../state/booksAtom";
import {type GenreDto, LibraryClient} from "../models/generated-client";
import type { BookDto } from "../models/generated-client";
import type { AuthorDto } from "../models/generated-client";


export function BooksPage() {
    const [books, setBooks] = useAtom(booksAtom);
    const [authors, setAuthors] = useAtom(authorsAtom);
    const [genres, setGenres] = useAtom(genresAtom);

    const [loading, setLoading] = useAtom(loadingAtom);

    // Fetch books and update the book's
    useEffect(() => {
        const api = new LibraryClient("http://localhost:5028");
        setLoading(true);

        api.getBooks()
            .then((data: BookDto[]) => {
                console.log("Fetched books:", data);
                setBooks(data);
            })
            .catch((err: BookDto[]) => console.error("Error fetching books:", err))
            .finally(() => setLoading(false));
    }, [setBooks, setLoading]);

    // Fetch authors '
    useEffect(() => {
        const api = new LibraryClient("http://localhost:5028");
        setLoading(true);

        api.getAuthors()
            .then((data: AuthorDto[]) => {
                console.log("Fetched authors:", data);
                setAuthors(data);
            })
            .catch((err: AuthorDto[]) => console.error("Error fetching authors:", err))
            .finally(() => setLoading(false));
    }, [setAuthors, setLoading]);

    const getAuthorNames = (ids?: string[]) => {
        if (!ids || ids.length === 0) return "Unknown";

        return authors
            .filter((a) => ids.includes(a.id!)) // keep only authors that match
            .map((a) => a.name)                 // get their names
            .join(", ");                        // join them nicely
    };

    // Fetch genres
    useEffect(() => {
        const api = new LibraryClient("http://localhost:5028");
        setLoading(true);

        api.getGenres()
            .then((data: GenreDto[]) => {
                console.log("Fetched genres:", data);
                setGenres(data);
            })
            .catch((err: GenreDto[]) => console.error("Error fetching genres:", err))
            .finally(() => setLoading(false));
    }, [setGenres, setLoading]);

    const getGenres = (ids?: string | undefined) => {
        if (!ids || ids.length === 0) return "Unknown";

        return genres
            .filter((g) => ids.includes(g.id!)) // keep only authors that match
            .map((g) => g.name)                 // get their names
            .join(", ");                        // join them nicely
    };



    if (loading) return <p> Loading books...</p>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">📖 Books</h2>

            {books.length === 0 ? (

                <p>No books found.</p>

            ) : (

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <div key={book.id} className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h3 className="card-title">{book.title}</h3>
                                <p>{book.pages} pages</p>
                                <p className="text-sm opacity-70">Created: {book.createdat}</p>
                                <p>Author: {getAuthorNames(book.authorsIds)}</p>
                                <p>Genre: {getGenres(book.genreId)}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-sm btn-primary">Edit</button>
                                    <button className="btn btn-sm btn-error">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

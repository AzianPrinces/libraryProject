import { useEffect } from 'react';

import { useAtom } from "jotai";
import { booksAtom, loadingAtom } from "../state/booksAtom";
import { LibraryClient } from "../models/generated-client";
import type { BookDto } from "../models/generated-client";


export default function BooksPage() {
    const [books, setBooks] = useAtom(booksAtom); // FIXED
    const [loading, setLoading] = useAtom(loadingAtom);

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


    if (loading) return <p> Loading books...</p>;

    return (
        <div>
            <h2>📖 Books</h2>
            {books.length === 0 ? (
                <p>No books found.</p>
            ) : (
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <strong>{book.title}</strong> — {book.pages} pages
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

import { atom } from "jotai";
import type { BookDto, AuthorDto, GenreDto} from "../models/generated-client"; // generated from backend

export const booksAtom = atom<BookDto[]>([]);
export const authorsAtom = atom<AuthorDto[]>([]);
export const genresAtom = atom<GenreDto[]>([]);
export const loadingAtom = atom<boolean>(false);

import { atom } from "jotai";
import type { BookDto } from "../models/generated-client"; // generated from backend

export const booksAtom = atom<BookDto[]>([]);
export const loadingAtom = atom<boolean>(false);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.tsx';
import GenresPage from './pages/GenresPage.tsx';
import BooksPage from './pages/BooksPage.tsx';
import AuthorsPage from './pages/AuthorsPage.tsx';
import "./index.css";

import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>

                    <Route path="genres" element={<GenresPage />} />
                    <Route path="books" element={<BooksPage />} />
                    <Route path="authors" element={<AuthorsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
        <DevTools />
    </React.StrictMode>
);

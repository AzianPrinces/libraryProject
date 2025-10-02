import { Outlet, Link } from 'react-router-dom';

export default function App() {
    return (
        <div>
            <h1 >📚 Library Project</h1>
            <nav>
                <Link to="/genres">Genres</Link> |{" "}
                <Link to="/books">Books</Link> |{" "}
                <Link to="/authors">Authors</Link>
                <button className="btn btn-primary">Test Button</button>


                <h1 className="text-4xl font-bold text-red-500 bg-yellow-200 p-4">
                    🚀 Tailwind is working!
                </h1>



            </nav>
            <hr />
            <Outlet />
        </div>
    );
}

import { Outlet } from 'react-router-dom';
import NavBar from "./pages/NavBar";

export default function App() {
    return (
        <div data-theme="forest" className="min-h-screen">
        <div>

        <div className=" flex justify-center">
            <NavBar />

            <div className="p-8 text-center">
                <h1 className="text-4xl font-bold text-yellow-400 mb-4">📚 Welcome to My Library</h1>
                <p className="text-lg mb-6 opacity-80">
                    It is a not fully completed library management system yet, stay updated!
                </p>
            </div>

        </div>

            <hr />
            <Outlet />

        </div>
        </div>
    );
}

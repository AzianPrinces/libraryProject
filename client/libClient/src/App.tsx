import { Outlet } from 'react-router-dom';
import NavBar from "./pages/NavBar";

export default function App() {
    return (
        <div data-theme="forest" className="min-h-screen">
        <div>

        <div className=" flex justify-center">
            <NavBar />
            <h1 className=" font-medium text-4xl text-[#FCC61D]  p-2 rounded">My Library</h1>

        </div>



            <hr />
            <Outlet />

        </div>
        </div>
    );
}

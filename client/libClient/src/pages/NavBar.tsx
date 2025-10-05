

export default function NavBar() {
    return (
        <div className="fixed top-2 left-2 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    {/* Dropdown button */}
                    <div tabIndex={0} role="button" className="btn btn-ghost bg-base-200 shadow text-1xl">
                        ☰ Menu
                    </div>


                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li><a href="/create-book" className="text-green-400 text-1xl">Create Book</a></li>
                        <li><a href="/books" className="text-1xl">Books</a></li>

                    </ul>
                </div>
            </div>
        </div>
    );
}

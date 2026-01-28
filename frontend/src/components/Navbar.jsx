import { Link } from "react-router-dom";
import { useContext } from "react";
import StoreContext from "../context/StoreContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(StoreContext);

  return (
    <nav className="bg-stone-100 p-4 sticky border-b border-gray-200 rounded-2xl top-2">
      <div className="flex container mx-auto justify-between items-center">

        {/* logo */}
        <div className="">
          <Link to={"/"}>
            <p className="text-2xl">
              PhartiyalJi <span className="font-bold text-stone-600 hover:text-neutral-950 duration-300">Blogs</span>
            </p>
          </Link>
        </div>

        {/* center routes */}
        <ul className="hidden sm:flex gap-5 text-xl font-normal justify-center items-center text-gray-700">
          <Link
            to="/"
            className="cursor-pointer hover:text-gray-400 duration-300"
          >
            Home
          </Link>

          <Link
            to="/blogs"
            className="cursor-pointer hover:text-gray-400 duration-300"
          >
            Blogs
          </Link>

          <Link
            to="/about"
            className="cursor-pointer hover:text-gray-400 duration-300"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="cursor-pointer hover:text-gray-400 duration-300"
          >
            Contact
          </Link>
        </ul>

        {user ? (
          <div className="flex gap-2">
            {/* Dashboard button */}
            <Link
              to={"/dashboard"}
              className="bg-gray-300 hover:bg-gray-400 duration-400 px-6 py-2 rounded-full text-black"
            >
              Dashboard
            </Link>

            {/* Logout button */}
            <Link to={"/login"}>
              <button
                onClick={logoutUser}
                className="bg-neutral-600 hover:bg-neutral-950 duration-400 text-white px-6 py-2 rounded-full cursor-pointer"
              >
                Logout
              </button>
            </Link>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="bg-neutral-600 hover:bg-neutral-950 duration-400 text-white px-8 py-2 rounded-full cursor-pointer"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav >
  );
};
export default Navbar;

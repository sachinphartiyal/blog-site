import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
const Footer = () => {
  return (
    <>
      <div className="flex flex-col py-12 md:flex-row items-center justify-between">
        {/* first div */}
        <div className="w-full items-center flex flex-col justify-center px-2 sm:w-1/3 gap-2">
          <h1 className="text-xl font-bold text-gray-700">About</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum enim
            mollitia voluptates natus vitae, dignissimos saepe sequi voluptatum.
            Suscipit totam hic magni atque, corporis tempore?
          </p>
          <h4 className="text-lg font-normal">Email: phartiyalji@gmail.com</h4>
          <h4 className="text-lg font-normal">Phone: +91 XXXXXXXXXX</h4>
        </div>
        {/* second div */}
        <div>
          <h1 className="text-xl font-bold text-gray-700 mb-5">Quick Links</h1>
          <ul className="flex flex-col gap-2">
            <Link
              className="cursor-pointer hover:text-black text-gray-700"
              to="/"
            >
              Home
            </Link>
            <Link
              className="cursor-pointer hover:text-black text-gray-700"
              to="/blogs"
            >
              Blogs
            </Link>
            <Link
              className="cursor-pointer hover:text-black text-gray-700"
              to="/about"
            >
              About
            </Link>
            <Link
              className="cursor-pointer hover:text-black text-gray-700"
              to="/contact"
            >
              Contact
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Footer;

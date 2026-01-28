import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
const Footer = () => {
  return (
    <>
      <div className="flex flex-col py-12 md:flex-row items-center gap-10">
        <div className="w-full items-center flex flex-col justify-center px-2 md:w-3/4 gap-2">
          <h1 className="text-xl font-bold text-gray-700">About</h1>
          <p className="text-gray-600 leading-relaxed text-center sm:text-left">
            Welcome to our creative corner of the internet! We're passionate about sharing
            stories, insights, and ideas that inspire, educate, and connect. From thought-provoking
            articles to practical guides, our blog is a space where curiosity meets knowledge.
            Join our community of readers and writers as we explore the world, one post at a time.
          </p>
          <h4 className="text-lg font-normal">Email: phartiyalji@gmail.com</h4>
          <h4 className="text-lg font-normal">Phone: +91 XXXXXXXXXX</h4>
        </div>

        <div className="w-full md:w-1/4">
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

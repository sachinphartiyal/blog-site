import { Link } from "react-router-dom";

const BlogCard = ({
  id,
  title,
  category,
  image,
  author_name,
  author_image,
  date,
}) => {
  return (
    <div className="border-1 border-gray-300 shadow-lg p-4 rounded-md">
      <img
        src={`${import.meta.env.VITE_API_URL}/images/${image}`}
        alt="Blog Image"
        className="w-full h-48 rounded-md transform duration-300 hover:scale-95"
      />

      <p className="text-purple-800 font-semibold text-lg my-3 ">{category}</p>

      <Link to={`/blog/${id}`}>
        <h1 className="text-xl font-bold">{title}</h1>
      </Link>

      <div className="flex gap-3 items-center my-3">
        <img
          className="w-8 h-8 rounded-full"
          src={`${import.meta.env.VITE_API_URL}/images/${author_image}`}
          alt="Author Image"
        />

        <p className="text-lg font-semibold text-gray-600">{author_name}</p>

        <p className="text-lg font-bold text-gray-600">
          {new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;

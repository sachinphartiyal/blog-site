import { useContext } from "react";
import { useParams } from "react-router-dom";
import StoreContext from "../context/StoreContext";

const SingleBlog = () => {
  const { id } = useParams();
  const { blogData } = useContext(StoreContext);

  const blog = blogData.find((b) => b._id === id);

  return (
    <div className="bg-zinc-50 rounded-md border-2 border-gray-200 mt-10 max-w-3xl flex flex-col gap-3 items-center justify-center mx-auto py-8">
      <img
        className="rounded-2xl"
        src={`${import.meta.env.VITE_API_URL}/images/${blog.image}`}
        alt="Blog Image"
        height={400}
        width={400}
      />

      <p className="text-2cl font-bold">{blog.title}</p>
      <p className="text-purple-800">{blog.category}</p>
      <p>{blog.description}</p>

      <div className="flex gap-2 items-center justify-center">
        <p className="text-lg font-bold">Author: {blog.author.name}</p>
        <img
          className="w-8 h-8 rounded-full"
          src={`${import.meta.env.VITE_API_URL}/images/${blog.author.image}`}
          alt="Author Image"
        />
      </div>

      <p>
        {new Date(blog.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })}
      </p>
    </div>
  );
};

export default SingleBlog;

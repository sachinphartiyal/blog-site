import { useContext } from "react";
import BlogCard from "./BlogCard";
import StoreContext from "../context/StoreContext";

const LatestBlogs = () => {
  const { blogData } = useContext(StoreContext);
  return (
    <div>
      <h1 className="text-3xl my-3 text-gray-700 font-bold text-center">
        Latest Blogs
      </h1>

      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 lg:grid-cols-4 sm:px-4">
        {blogData
          .slice(-8)
          .reverse()
          .map((blog, index) => (
            <BlogCard
              key={index}
              id={blog._id}
              title={blog.title}
              image={blog.image}
              category={blog.category}
              author_name={blog.author.name}
              author_image={blog.author.image}
              date={blog.createdAt}
            />
          ))}
      </div>
    </div>
  );
};

export default LatestBlogs;

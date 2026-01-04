import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const Blogs = () => {
  const { blogData } = useContext(StoreContext);

  return (
    <div>
      {/* <Hero /> */}

      <h1 className="text-3xl text-center font-bold my-6">All Blogs</h1>

      <p className="text-base px-3 sm:text-lg leading-6 max-w-2xl mx-auto text-center text-gray-600">
        Discover insightful articles, tutorials, and stories from our community of writers.
        Explore a diverse collection of content covering technology, development, design, and more.
        Whether you're here to learn something new or share your knowledge, you'll find inspiration in every post.
      </p>

      <div className="grid my-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 sm:px-4">
        {blogData.map((blog, index) => (
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

export default Blogs;

/*

[
  {
    id: 1,
    title: "React Basics",
    image: "...",
    category: "Tech",
    author: { name: "Sachin", image: "..." },
    date: "2026-01-01"
  }
]

*/

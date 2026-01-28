import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        image: null,
    });

    const [currentImage, setCurrentImage] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch blog data on component mount
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/${id}`);
                const blog = res.data.blog;

                setFormData({
                    title: blog.title,
                    category: blog.category,
                    description: blog.description,
                    image: null,
                });

                setCurrentImage(blog.image);
                setLoading(false);
            } catch (error) {
                toast.error("Failed to fetch blog data");
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fileHandler = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("category", formData.category);
        data.append("description", formData.description);

        if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/blog/update/${id}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(res.data.message);
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update blog");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-neutral-50 max-w-2xl mx-auto p-6 border-2 border-gray-200 rounded-md mt-10 mb-10">

            <h2 className="text-2xl font-bold mb-6">Edit Blog</h2>

            <form onSubmit={submitHandler} className="flex flex-col gap-4">
                <div>
                    <label className="block mb-2 font-semibold">Title</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Blog title"
                        required
                        className="bg-white border border-gray-300 rounded-md p-2 outline-none w-full"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Category</label>
                    <input
                        name="category"
                        value={formData.category}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Category"
                        required
                        className="bg-white border border-gray-300 rounded-md p-2 outline-none w-full"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={onChangeHandler}
                        placeholder="Blog description"
                        required
                        rows="6"
                        className="bg-white border border-gray-300 rounded-md p-2 outline-none w-full"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Current Image</label>
                    {currentImage && (
                        <img
                            src={`${import.meta.env.VITE_API_URL}/images/${currentImage}`}
                            alt="Current blog image"
                            className="w-48 h-48 object-cover rounded-2xl mb-2"
                        />
                    )}
                </div>

                <div>
                    <label className="block mb-2 font-semibold">
                        Change Image (Optional)
                    </label>
                    <input
                        onChange={fileHandler}
                        type="file"
                        accept="image/*"
                        className="border border-gray-300 rounded-md p-2 outline-none w-full"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Leave empty to keep the current image
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-neutral-600 text-white px-6 py-2 rounded-full hover:bg-neutral-950 duration-400 transition"
                    >
                        Update Blog
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="bg-gray-300 text-black px-6 py-2 rounded-full hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlog;

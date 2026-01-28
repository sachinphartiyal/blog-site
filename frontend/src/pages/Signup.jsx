import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { validateEmail, validatePassword } from "../utils/validators";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("image", formData.image);
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-12 mx-auto flex items-center justify-center ">
      <div className="w-full bg-stone-50 max-w-md p-5 mx-auto py-6 border-1 border-gray-200 shadow-2xl">
        <h1 className="text-lg font-bold text-center text-gray-700">
          Create your account
        </h1>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-5 mt-5 w-full items-center justify-center"
        >
          <input
            onChange={onChangeHandler}
            name="name"
            value={formData.name}
            type="text"
            placeholder="Your name"
            className="w-full p-2 border border-gray-300 rounded-lg outline-none bg-white"
            required
          />

          <input
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            type="email"
            placeholder="Your email"
            className="w-full p-2 border border-gray-300 rounded-lg outline-none bg-white"
            required
          />

          <input
            onChange={onChangeHandler}
            name="password"
            value={formData.password}
            type="password"
            placeholder="Your password"
            className="w-full p-2 border border-gray-300 rounded-lg outline-none bg-white"
            required
          />

          <input
            onChange={fileHandler}
            accept="image/*"
            type="file"
            className="w-full p-2 border border-gray-300 rounded-lg outline-none bg-white"
            required
          />

          <button
            className="bg-neutral-600 hover:bg-neutral-950 duration-400 text-white px-6 py-4 w-30 rounded-2xl cursor-pointer">
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to={"/login"} className="text-purple-800 cursor-pointer">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

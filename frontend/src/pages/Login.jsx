import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StoreContext from "../context/StoreContext";
import { validateEmail, validatePassword } from "../utils/validators";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loginUser } = useContext(StoreContext);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      const res = await axios
        .post(`${import.meta.env.VITE_API_URL}/user/login`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

      // console.log(`Response: ${res.data.message}`);

      if (res.data.success) {
        const { user, token } = res.data;
        loginUser(user, token);
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full py-12 mx-auto flex items-center justify-center ">
        <div className="w-full bg-stone-50 max-w-md p-5 mx-auto py-6 border-1 border-gray-200 shadow-md rounded-2xl">
          <h1 className="text-lg font-bold text-center text-gray-700">
            Log in into your account
          </h1>

          <form
            onSubmit={submitHandler}
            className="flex flex-col gap-5 mt-5 w-full items-center justify-center"
          >
            <input
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              type="email"
              placeholder="Your email"
              className="w-full p-2 border border-gray-300 rounded-lg outline-none bg-white"
              required
            />

            <input
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
              type="password"
              placeholder="Your password"
              className="w-full p-2 border border-gray-300 rounded-lg outline-none bg-white"
              required
            />

            <button
              className="bg-neutral-600 hover:bg-neutral-950 duration-400 text-white px-6 py-4 w-30 rounded-2xl cursor-pointer">
              Log in
            </button>
          </form>

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-purple-800 cursor-pointer">
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

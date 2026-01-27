import { useEffect, useState } from "react";
import axios from "axios";
import StoreContext from "./StoreContext";

const StoreContextProvider = ({ children }) => {
  // global state variables
  const [user, setUser] = useState(null);
  const [blogData, setBlogData] = useState([]);

  // load user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // REQUIRED: Parse JSON string to object
    }
  }, []);

  // fetch all blogs from backend
  useEffect(() => {
    const allBolgs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/blog/all");

        setBlogData(res.data.blogs);
      } catch (error) {
        console.log("error in all blogs api", error);
      }
    };
    allBolgs();
  }, []);

  // called after successful login
  const loginUser = (user, token) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  // called after successful logout
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const contextValue = { blogData, user, loginUser, logoutUser };

  // Makes contextValue available to all child components
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

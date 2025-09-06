import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "./components/index.js";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice.js";

const App = () => {
  let [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        
        if (userData) {
         
          
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
          
        }
      })
      .finally(() => {
        setLoading = false;
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] ">
      <Navbar />
      <main>
        {/* <Outlet></Outlet> */}
        test
      </main>
      <Footer />
    </div>
  ) :(  <div className="min-h-screen flex flex-wrap content-between absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] ">
      <Navbar />
      <Footer />
    </div>)
};

export default App;
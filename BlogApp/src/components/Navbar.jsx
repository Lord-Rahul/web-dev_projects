import React from "react";
import { LogoutButton, Logo, Container } from "./index.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
  <header className="w-full py-3 shadow-lg bg-gradient-to-r from-blue-700 to-purple-500 sticky top-0 z-50 border-b border-blue-200/40">
      <Container>
  <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <Logo width="90px" />
            </Link>
          </div>
          <ul className="flex gap-2 items-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-5 py-2 duration-200 bg-gradient-to-r from-blue-600 to-purple-500 hover:from-purple-500 hover:to-blue-600 text-white rounded-full shadow font-semibold border border-white/10 hover:scale-105 transition-transform"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;

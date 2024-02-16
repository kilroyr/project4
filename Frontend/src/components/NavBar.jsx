import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("token");

  // Determine if current route is login or signup
  const isAuthPage =
    location.pathname === "/signup" || location.pathname === "/login";

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-black font-bold text-xl">
              PCPartPicker
            </Link>
          </div>

          {/* Navbar items */}
          <div className="hidden md:block">
            <div className="ml-auto flex items-baseline space-x-4">
              {/* Show login and signup links if on those pages */}
              {isAuthPage && (
                <>
                  <Link
                    to="/signup"
                    className="bg-black text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Signup
                  </Link>
                  <Link
                    to="/login"
                    className="bg-black text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                </>
              )}

              {/* Show logout button if user is logged in */}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="bg-black text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

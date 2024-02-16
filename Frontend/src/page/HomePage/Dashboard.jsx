import React, { useEffect, useState } from "react";
import Products from "../../components/Products";
import Build from "../../components/Build";
import { useNavigate } from "react-router-dom";
import AllUsers from "../../components/AllUsers";
import AddProduct from "../../components/AddProduct";

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("products");
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const isAdmin = userType == 1;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      {!isAdmin && (
        <>
          <div className="flex justify-center mt-8 bg-grey">
            <button
              onClick={() => setSelectedTab("products")}
              className={`mr-4 ${selectedTab === "products" && "font-bold"}`}
            >
              Completed Build
            </button>

            <button
              onClick={() => setSelectedTab("build")}
              className={`${selectedTab === "build" && "font-bold"}`}
            >
              Build your PC
            </button>
          </div>

          {selectedTab === "products" && (
            <div className="mt-8">
              <Products />
            </div>
          )}

          {selectedTab === "build" && (
            <div className="mt-8">
              <Build />
            </div>
          )}
        </>
      )}
      {isAdmin && (
        <>
          <div className="flex justify-center mt-8 bg-grey">
            <button
              onClick={() => setSelectedTab("allusers")}
              className={`mr-4 ${selectedTab === "allusers" && "font-bold"}`}
            >
              All Users
            </button>

            <button
              onClick={() => setSelectedTab("addproduct")}
              className={`${selectedTab === "addproduct" && "font-bold"}`}
            >
              Add Product
            </button>
          </div>

          {selectedTab === "allusers" && (
            <div className="mt-8">
              <AllUsers />
            </div>
          )}

          {selectedTab === "addproduct" && (
            <div className="mt-8">
              <AddProduct />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;

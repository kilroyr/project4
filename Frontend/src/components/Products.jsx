import React, { useState, useEffect } from "react";
import ProductInfoCard from "./ProductInfoCard";

function Products() {
  const [buildItems, setBuildItems] = useState([]);

  useEffect(() => {
    // Make API call to fetch user's builds
    const fetchUserBuilds = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3000/api/build/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setBuildItems(data);
        } else {
          throw new Error("Failed to fetch user's builds");
        }
      } catch (error) {
        console.error("Error fetching user's builds:", error.message);
      }
    };

    fetchUserBuilds();
  }, []);

  const handleDeleteBuild = async (buildId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/build/${buildId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.ok) {
        // Remove the deleted build from the state
        setBuildItems((prevBuilds) =>
          prevBuilds.filter((build) => build._id !== buildId)
        );
        console.log("Build deleted successfully");
      } else {
        throw new Error("Failed to delete build");
      }
    } catch (error) {
      console.error("Error deleting build:", error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {buildItems &&
        buildItems.map((build, index) => (
          <div key={index} className="relative">
            <ProductInfoCard buildItems={build.items} />
            <button
              className="relative bottom-0 left-0 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={() => handleDeleteBuild(build._id)}
            >
              Delete Build
            </button>
          </div>
        ))}
    </div>
  );
}

export default Products;

import React, { useState } from "react";

function AddProduct({ setShowModal }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const handleChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleAddItem = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          type: selectedType,
          name: selectedItem,
          price: selectedPrice,
        }),
      });

      if (response.ok) {
        // Product added successfully
        alert("product added successfully");
        setSelectedItem("");
        setSelectedPrice("");
        setSelectedType("");
      } else {
        // Handle error response
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error("Error adding product:", error.message);
      // Handle error, maybe show a notification to the user
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h3 className="text-lg font-semibold mb-4">Add Parts</h3>
      <div className="flex mb-4">
        <select
          className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 mr-2"
          value={selectedType}
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="CPU">CPU</option>
          <option value="Motherboard">Motherboard</option>
          <option value="RAM">RAM</option>
          <option value="Storage">Storage</option>
          <option value="GPU">GPU</option>
          <option value="PSU">PSU</option>
          <option value="Case">Case</option>
        </select>
        <input
          className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 mr-2"
          value={selectedItem}
          onChange={(e) => {
            const selectedName = e.target.value;
            setSelectedItem(selectedName);
          }}
        />
        <input
          type="text"
          className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2"
          value={selectedPrice || ""}
          onChange={(e) => {
            const selectedPrice = e.target.value;
            setSelectedPrice(selectedPrice);
          }}
        />
      </div>
      <button
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900"
        onClick={handleAddItem}
      >
        Add
      </button>
    </div>
  );
}

export default AddProduct;

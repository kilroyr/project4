import React, { useEffect, useState } from "react";

function Build() {
  const [buildItems, setBuildItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [buildName, setBuildName] = useState("");

  const handleAddItem = () => {
    if (selectedType && selectedItem) {
      setBuildItems((prevItems) => [
        ...prevItems,
        { type: selectedType, name: selectedItem, price: selectedPrice },
      ]);
    }
    setShowModal(false);
  };

  const handleCreateBuild = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch("http://localhost:3000/api/build", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          buildName: buildName,
          items: buildItems,
          totalPrice: buildItems.reduce(
            (total, item) => total + parseFloat(item.price),
            0
          ),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Build created:", data);
        setBuildItems([]);
        setBuildName("");
        setSelectedItem("");
        setSelectedItem("");
        setSelectedPrice("");
      } else {
        throw new Error("Failed to create build");
      }
    } catch (error) {
      console.error("Error creating build:", error.message);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    setSelectedType(e.target.value);

    try {
      const response = await fetch("http://localhost:3000/api/product/csv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: e.target.value }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProductOptions(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="bg-gray-500 p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Build</h2>
      <div className="mb-4 flex justify-between">
        <button
          className="bg-black text-white px-4 py-2 rounded-md mr-4 hover:bg-gray-900"
          onClick={() => setShowModal(true)}
        >
          Add Parts
        </button>
        <button
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900"
          onClick={handleCreateBuild}
        >
          Create Build
        </button>
      </div>
      <input
        type="text"
        placeholder="Enter build name"
        className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"
        value={buildName}
        onChange={(e) => setBuildName(e.target.value)}
      />
      {/* Modal for adding items */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
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
              <select
                className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 mr-2"
                value={selectedItem}
                onChange={(e) => {
                  const selectedName = e.target.value;
                  setSelectedItem(selectedName);

                  // Find the corresponding item in productOptions and set its price
                  const selectedItemObj = productOptions.find(
                    (option) => option.name === selectedName
                  );
                  if (selectedItemObj) {
                    setSelectedPrice(selectedItemObj.price);
                  } else {
                    setSelectedPrice("");
                  }
                }}
              >
                <option value="">Select Item</option>
                {productOptions.map((option, index) => (
                  <option key={index} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2"
                value={selectedPrice || ""}
                disabled
              />
            </div>
            <button
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900"
              onClick={handleAddItem}
            >
              Add
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-600"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Display build items */}
      <div>
        <ul>
          {buildItems.map((item, index) => (
            <li
              key={index}
              className="border border-gray-300 rounded-md p-2 mb-2"
            >
              <div className="grid grid-cols-3">
                <div>{item.type}</div>
                <div>{item.name}</div>
                <div className="ml-4">${item.price}</div>
              </div>
            </li>
          ))}
        </ul>

        <div className="text-left text-lg mt-4">
          <div className="border-t border-gray-300 pt-2">
            Total Price: $
            {buildItems.reduce(
              (total, item) => total + parseFloat(item.price),
              0
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Build;

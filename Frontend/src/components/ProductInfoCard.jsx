import React from "react";

function ProductInfoCard({ buildItems }) {
  return (
    <div>
      <ul>
        {buildItems &&
          buildItems.map((item, index) => (
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
  );
}

export default ProductInfoCard;

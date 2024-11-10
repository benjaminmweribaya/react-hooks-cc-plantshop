import React, { useState } from "react";

function PlantCard({ plant }) {
  const [isInStock, setIsInStock] = useState(true);

  const toggleStock = () => {
    setIsInStock(!isInStock);
  };

  return (
    <li className="card" data-testid="plant-item" key={plant.id}>
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <button className={isInStock ? "primary" : ""} onClick={toggleStock}>
        {isInStock ? "In Stock" : "Out of Stock"}
      </button>
    </li>
  );
}

export default PlantCard;

import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch plants from the API on component mount
  useEffect(() => {
    let isMounted = true; // flag to check if component is mounted
    const fetchPlants = async () => {
      try {
        const response = await fetch("http://localhost:6001/plants");
        const data = await response.json();
        if (isMounted) {
          setPlants(data);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchPlants();

    return () => {
      isMounted = false; // cleanup flag when component unmounts
    };
  }, []);

  // Function to add a new plant
  const handleAddPlant = (newPlant) => {
    const plantData = {
      ...newPlant,
      price: newPlant.price.toString(),  // Ensure price is a string
    };
    setPlants([...plants, plantData]);
    // Send to backend
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantData),
    });
  };

  // Filter plants based on the search term
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <PlantPage
        plants={filteredPlants}
        onAddPlant={handleAddPlant}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}

export default App;

import React, { useEffect } from "react";

const endpoint = import.meta.env.VITE_UPDATE_LINK;

const UpdateCheckWrapper = ({ children }) => {
  var storedUserUpdates = JSON.parse(localStorage.getItem("user_updates"));

  useEffect(() => {
    const fetchUpdateData = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUpdateData();
  }, []);

  return children;
};

export default UpdateCheckWrapper;

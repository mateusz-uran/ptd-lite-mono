import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fillUpdatesArray, toggleNewUpdate } from "../slices/updateInfoSlice";

const endpoint = import.meta.env.VITE_UPDATE_LINK;

const UpdateCheckWrapper = ({ children }) => {
  var storedUserUpdates = JSON.parse(localStorage.getItem("user_updates"));
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUpdateData = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (storedUserUpdates !== data.length) {
          dispatch(toggleNewUpdate());
          dispatch(fillUpdatesArray(data));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUpdateData();
  }, []);

  return children;
};

export default UpdateCheckWrapper;

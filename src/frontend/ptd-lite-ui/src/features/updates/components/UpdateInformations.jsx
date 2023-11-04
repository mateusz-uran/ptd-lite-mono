import React from "react";
import { useSelector } from "react-redux";
import { updatesArray } from "../slices/updateInfoSlice";

const UpdateInformations = () => {
  const updates = useSelector(updatesArray);
  console.log(updates);
  return (
    <div>
      {updates.map((update, index) => (
        <div key={index}>
          <h3>{update.date}</h3>
          {update.updateInfo.map((updateInfo, index) => (
            <div key={index}>
              <h4>{updateInfo.title}</h4>
              <p>{updateInfo.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UpdateInformations;

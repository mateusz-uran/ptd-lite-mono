import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isNewUpdate,
  isUpdateRead,
  readUpdates,
  updatesArray,
} from "../slices/updateInfoSlice";

import "../../../css/update.css";
import Header from "../../../components/Header";
import { useTranslation } from "react-i18next";

const UpdateInformations = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const checkUpdate = useSelector(isNewUpdate);
  const readUpdate = useSelector(isUpdateRead);
  const updates = useSelector(updatesArray);

  const unReadUpdate = checkUpdate && !readUpdate;

  const handleUpdateRead = () => {
    dispatch(readUpdates(updates.length));
  };

  return (
    <>
      <div className="h-wrapper">
        <Header
          compArray={[
            {
              compName: "Update",
            },
          ]}
        />
        <div>
          <button
            className="primary-btn"
            disabled={!unReadUpdate}
            onClick={() => handleUpdateRead()}
          >{`${
            unReadUpdate
              ? t("buttons.updateNotRead")
              : t("buttons.updateIsRead")
          }`}</button>
        </div>
      </div>
      <div id="update-wrapper">
        {updates.map((update, index) => (
          <div key={index} className="single-update">
            <h3>{update.date}</h3>
            {update.updateInfo.map((updateInfo, index) => (
              <ul key={index} className="descriptions">
                <li>{updateInfo.description}</li>
              </ul>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default UpdateInformations;

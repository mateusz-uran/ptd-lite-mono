import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const DashSkeleton = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="skeleton-modal">
        <p>{t("dashboard.modal")}</p>
        <Link to={"/home/cards"}>
          <button className="secondary-btn">{t("buttons.browse")}</button>
        </Link>
      </div>
      <div>
        <div className="btn-manage btn-manage-skeleton">
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </div>
        <div className="card-manage dash-manage dash-manage-skeleton">
          <span className="manage">&nbsp;</span>
          <div className="buttons-wrapper">
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
          </div>
        </div>
        <div className="trip-manage manage-skeleton">
          <div className="table-skeleton">
            <span>&nbsp;</span>
            <div className="skeleton-table">
              <table>
                <thead>
                  <tr>
                    <th colSpan={13}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th colSpan={13}>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={13}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="petrol-manage manage-skeleton">
          <div className="table-skeleton">
            <span>&nbsp;</span>
            <div className="skeleton-table">
              <table>
                <thead>
                  <tr>
                    <th colSpan={6}>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="adblue-manage manage-skeleton">
          <div className="table-skeleton">
            <span>&nbsp;</span>
            <div className="skeleton-table">
              <table>
                <thead>
                  <tr>
                    <th colSpan={4}>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="stats-skeleton">
          <section>
            <span className="linear">&nbsp;</span>
            <span className="pie">&nbsp;</span>
          </section>
          <span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default DashSkeleton;

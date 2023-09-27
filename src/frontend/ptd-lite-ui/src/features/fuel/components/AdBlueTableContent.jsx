import React from "react";
import LoadingDots from "../../../components/LoadingDots";
import { useTranslation } from "react-i18next";
import AdBlueTableRow from "./AdBlueTableRow";

const AdBlueTableContent = ({
  isLoading,
  isSuccess,
  blueEntities,
  isError,
  error,
}) => {
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <tr>
        <td colSpan={4}>
          <LoadingDots />
        </td>
      </tr>
    );
  }

  if (isSuccess && blueEntities?.length) {
    return <AdBlueTableRow blueEntities={blueEntities} />;
  }

  if (isError && error.data?.statusCode === 404) {
    return (
      <tr>
        <td colSpan={4}>
          <span className="empty-response">{t("misc.blueTableEmpty")}</span>
        </td>
      </tr>
    );
  }

  if (isError && error.data === undefined) {
    return (
      <tr>
        <td colSpan={4}>
          <span className="empty-response">{t("misc.errorMessage")}.</span>
        </td>
      </tr>
    );
  }
};

export default AdBlueTableContent;

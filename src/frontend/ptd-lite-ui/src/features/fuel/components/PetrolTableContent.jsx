import React from "react";
import LoadingDots from "../../../components/LoadingDots";
import PetrolTableRow from "./PetrolTableRow";
import { useTranslation } from "react-i18next";

const PetrolTableContent = ({
  isLoading,
  isSuccess,
  petrolEntities,
  isError,
  error,
}) => {
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <tr>
        <td colSpan={6}>
          <LoadingDots />
        </td>
      </tr>
    );
  }

  if (isSuccess && petrolEntities?.length) {
    return <PetrolTableRow petrolEntities={petrolEntities} />;
  }

  if (isError && error.data?.statusCode === 404) {
    return (
      <tr>
        <td colSpan={6}>
          <span className="empty-response">{t("misc.petrolTableEmpty")}</span>
        </td>
      </tr>
    );
  }

  if (isError && error.data === undefined) {
    return (
      <tr>
        <td colSpan={6}>
          <span className="empty-response">{t("misc.errorMessage")}.</span>
        </td>
      </tr>
    );
  }
};

export default PetrolTableContent;

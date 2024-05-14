import * as yup from "yup";
import { t } from "i18next";

export const translatedTripArraySchema = () => {
  return yup.object().shape({
    inputs: yup.array().of(
      yup.object().shape({
        dayStart: yup
          .string()
          .required(t("yupValidations.empty"))
          .test("valid-date-start", "DD.MM.YYYY", function (value) {
            if (!value) return true;

            const dateFormatRegex =
              /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

            return dateFormatRegex.test(value);
          }),
        hourStart: yup.string().required(t("yupValidations.empty")),
        locationStart: yup.string().required(t("yupValidations.empty")),
        countryStart: yup.string().required(t("yupValidations.empty")),
        counterStart: yup
          .number()
          .typeError(t("yupValidations.number"))
          .required(t("yupValidations.empty")),
        dayEnd: yup
          .string()
          .required(t("yupValidations.empty"))
          .test("valid-date-start", "DD.MM.YYYY", function (value) {
            if (!value) return true;

            const dateFormatRegex =
              /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

            return dateFormatRegex.test(value);
          }),
        hourEnd: yup.string().required(t("yupValidations.empty")),
        locationEnd: yup.string().required(t("yupValidations.empty")),
        countryEnd: yup.string().required(t("yupValidations.empty")),
        counterEnd: yup
          .number()
          .typeError(t("yupValidations.number"))
          .required(t("yupValidations.empty")),
      })
    ),
  });
};

export const translatedTripSingleSchema = () => {
  return yup.object({
    dayStart: yup
      .string()
      .required(t("yupValidations.empty"))
      .test("valid-date-start", "DD.MM.YYYY", function (value) {
        if (!value) return true;

        const dateFormatRegex =
          /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

        return dateFormatRegex.test(value);
      }),
    hourStart: yup.string().required(t("yupValidations.empty")),
    locationStart: yup.string().required(t("yupValidations.empty")),
    countryStart: yup.string().required(t("yupValidations.empty")),
    counterStart: yup
      .number()
      .typeError(t("yupValidations.number"))
      .required(t("yupValidations.empty")),
    dayEnd: yup
      .string()
      .required(t("yupValidations.empty"))
      .test("valid-date-start", "DD.MM.YYYY", function (value) {
        if (!value) return true;

        const dateFormatRegex =
          /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

        return dateFormatRegex.test(value);
      }),
    hourEnd: yup.string().required(t("yupValidations.empty")),
    locationEnd: yup.string().required(t("yupValidations.empty")),
    countryEnd: yup.string().required(t("yupValidations.empty")),
    counterEnd: yup
      .number()
      .typeError(t("yupValidations.number"))
      .required(t("yupValidations.empty")),
  });
};

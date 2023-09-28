import "../../../css/card_form.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import {
  cardIdToUpdate,
  cardNumberToUpdate,
  isCardEditing,
  stopEditing,
} from "../slices/updateCardSlice";
import { useEffect } from "react";
import { MdSettingsBackupRestore } from "react-icons/md";
import {
  useAddNewCardMutation,
  useUpdateCardMutation,
} from "../../../api/card/cardApiSlice";
import { useTranslation } from "react-i18next";
import { translateCardInputs } from "../inputs/cardInputs";
import { translateCardValidations } from "../inputs/cardsValidations";
import SmallLoader from "../../../components/SmallLoader";

import { toast } from "react-toastify";

const CardForm = () => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const dispatch = useDispatch();

  const inputs = translateCardInputs();
  const cardSchema = translateCardValidations();

  const editStatus = useSelector(isCardEditing);
  const cardId = useSelector(cardIdToUpdate);
  const cardNumber = useSelector(cardNumberToUpdate);

  const [addNewCard, { isLoading: loadingNewCard }] = useAddNewCardMutation();
  const [updateCard, { isLoading: loadingEditedCard }] =
    useUpdateCardMutation();
  let loadingStatus = loadingNewCard || loadingEditedCard;

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(cardSchema) });

  const createCardObject = (data, user, cardId, editStatus) => {
    const card = {
      number: data.cardNumber,
    };

    if (editStatus) {
      card.id = cardId;
    } else {
      card.username = user.nickname;
    }

    return card;
  };

  const onSubmit = async (data) => {
    try {
      const card = createCardObject(data, user, cardId, editStatus);

      if (!editStatus) {
        await addNewCard(card).unwrap();
        toast.success(t("toastify.newCard"));
      } else {
        await updateCard(card).unwrap();
        var storedCardAndUser = JSON.parse(
          localStorage.getItem("card_and_user")
        );
        if (storedCardAndUser !== null) {
          storedCardAndUser.cardNumber = data.cardNumber;
          localStorage.setItem(
            "card_and_user",
            JSON.stringify(storedCardAndUser)
          );
        }
        dispatch(stopEditing(false));
        toast.success(t("toastify.updateCardNumber"));
      }
      reset();
    } catch (err) {
      if (err.status === 409) {
        setError("number", {
          type: "server",
          message: err.data.description,
        });
        console.log("card exists");
      } else {
        toast.error(t("toastify.error"));
        console.log("Error: ", err);
      }
    }
  };

  const handleClearInput = () => {
    if (editStatus) {
      dispatch(stopEditing(false));
    }
    reset();
  };

  useEffect(() => {
    if (editStatus) {
      setValue(inputs.name, cardNumber);
    }
  }, [editStatus, cardNumber]);

  return (
    <div className="card-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <input
            type={inputs.type}
            name={inputs.name}
            placeholder={inputs.placeholder}
            {...register(inputs.name)}
            className="primary-input"
          />
          {errors[inputs.name]?.message && (
            <p className="error-input">{errors[inputs.name].message}</p>
          )}
          {errors?.number?.message && (
            <p className="error-input">{t("misc.cardExists")}</p>
          )}
        </div>
        <div className="button-wrapper">
          <div className="buttons">
            <button
              type="submit"
              disabled={loadingStatus}
              className="small-btn"
            >
              {!loadingStatus ? (
                editStatus ? (
                  <span>{t("buttons.save")}</span>
                ) : (
                  <span>{t("buttons.add")}</span>
                )
              ) : (
                <SmallLoader />
              )}
            </button>
            <button
              type="button"
              className="small-btn revert-button"
              onClick={() => handleClearInput()}
              disabled={loadingStatus}
              title="stop editing / clear"
            >
              <MdSettingsBackupRestore className="revert" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CardForm;

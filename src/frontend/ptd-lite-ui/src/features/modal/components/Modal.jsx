import '../../../css/modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { cardIdToDelete, closeModal, modalMessage } from '../slices/modalSlice';
import { useDeletecardMutation } from '../../../api/card/cardApiSlice';
import { useTranslation } from 'react-i18next';
const Modal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cardId = useSelector(cardIdToDelete);
  const message = useSelector(modalMessage);
  const [deleteCard] = useDeletecardMutation();

  const handleConfirmModal = () => {
    deleteCard(cardId).unwrap();
    dispatch(closeModal());
  };

  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>{message}</h4>
        <div className="btn-container">
          <button
            type="button"
            className="primary-btn confirm-btn"
            onClick={handleConfirmModal}
          >
            {t('buttons.confirm')}
          </button>
          <button
            type="button"
            className="primary-btn clear-btn"
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            {t('buttons.cancel')}
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Modal;

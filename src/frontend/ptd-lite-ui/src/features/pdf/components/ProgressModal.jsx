import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

const ProgressModal = () => {
  const { t } = useTranslation();
  return createPortal(
    <aside className="modal-container">
      <div className="modal">
        <h4>{t('misc.generatingPdf')}...</h4>
        <div className="modal-loader">
          <div className="spinner"></div>
        </div>
      </div>
    </aside>,
    document.body
  );
};
export default ProgressModal;

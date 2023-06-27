import { createPortal } from 'react-dom';

const ProgressModal = () => {
  return createPortal(
    <aside className="modal-container">
      <div className="modal">
        <h4>Generating PDF, please wait...</h4>
        <div className="modal-loader">
          <div className="spinner"></div>
        </div>
      </div>
    </aside>,
    document.body
  );
};
export default ProgressModal;

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const InvoiceCopy = ({ copyText }) => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(copyText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="invoice-copy">
      <span className="copy-text">{copyText}</span>
      <button onClick={handleCopyClick} className="copy-button small-btn">
        <span>
          {isCopied
            ? `${t('buttons.invoiceCopied')}`
            : `${t('buttons.invoiceCopy')}`}
        </span>
      </button>
    </div>
  );
};
export default InvoiceCopy;

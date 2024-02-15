import { useState } from "react";
import { useTranslation } from "react-i18next";

const InvoiceCopy = ({ copyText }) => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text) {
    try {
      if ("clipboard" in navigator) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        const result = document.execCommand("copy");
        document.body.removeChild(textarea);
        return result;
      }
    } catch (error) {
      console.error("Failed to copy: ", error);
      return false;
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
            ? `${t("buttons.invoiceCopied")}`
            : `${t("buttons.invoiceCopy")}`}
        </span>
      </button>
    </div>
  );
};
export default InvoiceCopy;

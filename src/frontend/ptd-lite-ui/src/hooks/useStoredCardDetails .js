import { useState, useEffect, useCallback } from "react";

const useStoredCardDetails = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardId: "",
  });

  useEffect(() => {
    const storedCardNumber = localStorage.getItem("cardNumber");
    const storedCardId = localStorage.getItem("cardId");
    if (storedCardNumber && storedCardId) {
      setCardDetails({ cardNumber: storedCardNumber, cardId: storedCardId });
    }
  }, []);

  const storeCardDetails = useCallback((cardNumber, cardId) => {
    if (cardNumber && cardId) {
      localStorage.setItem("cardNumber", cardNumber);
      localStorage.setItem("cardId", cardId);
      setCardDetails({ cardNumber, cardId }); // Update state with the new card details
    } else {
      console.error("Card number or card ID is invalid");
    }
  }, []);

  return [cardDetails, storeCardDetails];
};

export default useStoredCardDetails; // Ensure default export

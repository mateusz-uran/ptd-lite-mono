import { useState, useEffect, useCallback } from "react";

const useStoredNick = () => {
  const [nick, setNick] = useState("empty");

  useEffect(() => {
    const storedNick = localStorage.getItem("nick");
    if (storedNick) {
      setNick(storedNick);
    }
  }, []);

  const storeNick = useCallback((nick) => {
    if (nick) {
      localStorage.setItem("nick", nick);
      setNick(nick); // Update state with the new nick
    } else {
      console.error("Nick is invalid");
    }
  }, []);

  return [nick, storeNick];
};

export default useStoredNick; // Ensure default export

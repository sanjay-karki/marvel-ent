import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { createDisplayData } from "../helpers/utilities";

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [characterDetails, setCharacterDetails] = useState(null);
  const [allCharacters, setAllCharacters] = useState(null);
  const [fullCharacterDetails, setFullCharacterDetails] = useState(null);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const storedCharacterData =
    JSON.parse(localStorage.getItem("fetched character data")) || null;
  const allCharactersTotal = storedCharacterData?.total || null;

  const handleApiCall = async (url = "", page = 0, fromSearch = false) => {
    const offset = page * 20;
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      const total = response.data.data.total;
      const fetchedData = response.data.data.results;
      const displayData = createDisplayData(fetchedData, offset);
      setTotalCharacters(total);
      setFullCharacterDetails(fetchedData);
      setAllCharacters(displayData);
      if (!fromSearch) {
        localStorage.setItem(
          "fetched character data",
          JSON.stringify(response.data.data)
        );
      }
      setIsLoading(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <MainContext.Provider
      value={{
        characterDetails,
        setCharacterDetails,
        allCharacters,
        setAllCharacters,
        totalCharacters,
        setTotalCharacters,
        isLoading,
        setIsLoading,
        fullCharacterDetails,
        setFullCharacterDetails,
        handleApiCall,
        storedCharacterData,
        allCharactersTotal,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

export const GetMainContext = () => useContext(MainContext);

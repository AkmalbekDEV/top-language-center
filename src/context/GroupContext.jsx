import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const GroupContext = createContext();

const GroupProvider = ({ children }) => {
  const [state, setState] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://237341f0875e23cd.mokky.dev/groups"
      );
      setState(response.data);
      console.log("Adafsafds");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <GroupContext.Provider value={{ state }}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupProvider;

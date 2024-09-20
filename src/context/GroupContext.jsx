import React, { createContext, useEffect, useState } from "react";
import { groupsListUrl } from "../utils/urls";
import Axios from "../api";

export const GroupContext = createContext();

const GroupProvider = ({ children }) => {
  const [state, setState] = useState([]);

  const getData = async () => {
    try {
      const response = await Axios.get(groupsListUrl);
      setState(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <GroupContext.Provider value={{ state }}>{children}</GroupContext.Provider>
  );
};

export default GroupProvider;

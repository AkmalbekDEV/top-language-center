import React, { createContext, useCallback, useState } from "react";
import { groupAddUrl, groupDeleteUrl, groupEditUrl, groupsListUrl } from "../utils/urls";
import Axios from "../api";

export const GroupContext = createContext();

const GroupProvider = ({ children }) => {
  const [state, setState] = useState([]);

  const getData = useCallback(async () => {
    try {
      const response = await Axios.get(groupsListUrl);
      setState(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  }, []);
  const postData = async (body) => {
    try {
      const response = await Axios.post(groupAddUrl, body)
      setState((prevData) => [...prevData, response.data])
      console.log(response.data)
    } catch (err) {
      throw err
    }
  }
  const deleteData = async (id) => {
    try {
      const response = await Axios.delete(groupDeleteUrl(id))
      setState(state.filter(student => student.id !== id))
      console.log(response.data)
    } catch (err) {
      throw err
    }
  }
  const editGroup = async (body, id) => {
    try {
      const response = await Axios.patch(groupEditUrl(id), body);
      const updatedGroup = response.data;
      setState((prevGroup) =>
        prevGroup.map((group) =>
          group.id === id ? updatedGroup : group
        )
      );
    } catch (err) {
      setError(err);
    }
  };
  return (
    <GroupContext.Provider value={{ state, getData, postData, deleteData, editGroup }}>{children}</GroupContext.Provider>
  );
};

export default GroupProvider;

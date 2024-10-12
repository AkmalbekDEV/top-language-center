import React, { createContext, useCallback, useContext, useState } from "react";
import {
  groupAddUrl,
  groupDeleteUrl,
  groupEditUrl,
  groupsListUrl,
  studentDeleteUrl,
  studentsListRelationUrl,
} from "../utils/urls";
import Axios from "../api";
import { StudentContext } from "./StudentsContext";

export const GroupContext = createContext();

const GroupProvider = ({ children }) => {
  const [state, setState] = useState([]);
  const { setState: setStudentState } = useContext(StudentContext); // Get the setState function from StudentContext

  const getData = useCallback(async () => {
    try {
      const response = await Axios.get(groupsListUrl);
      setState(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const postData = async (body) => {
    try {
      const response = await Axios.post(groupAddUrl, body);
      setState((prevData) => [...prevData, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = async (id) => {
    try {
      await Axios.delete(groupDeleteUrl(id));
      setState((prevGroups) => prevGroups.filter((group) => group.id !== id));

      const studentResponse = await Axios.get(studentsListRelationUrl(id))
      const students = studentResponse.data

      // Delete each student associated with the deleted group
      for (const student of students) {
        await Axios.delete(studentDeleteUrl(student.id));
        console.log(`Student with id ${student.id} deleted`);
      }

      // Clear students associated with the deleted group
      setStudentState((prevState) => ({
        ...prevState,
        students: prevState.students.filter(
          (student) => student.group.id !== id
        ),
      }));

      console.log("The Group and its students deleted");
    } catch (err) {
      console.log(err);
    }
  };

  const editGroup = async (body, id) => {
    try {
      const response = await Axios.patch(groupEditUrl(id), body);
      const updatedGroup = response.data;
      setState((prevGroup) =>
        prevGroup.map((group) => (group.id === id ? updatedGroup : group))
      );
    } catch (err) {
      console.log(err)
    }
  };
  
  const editPassword = async (password, id) => {
    try {
      const response = await Axios.patch(groupEditUrl(+id), password)
      const updatedPassword = response.data
      setState((prevGroup) => 
        prevGroup.map((group) => group.id === id ? updatedPassword : group)
      )
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <GroupContext.Provider
      value={{ state, getData, postData, deleteData, editGroup, editPassword }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export default GroupProvider;

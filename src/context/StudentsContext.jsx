import { createContext, useCallback, useEffect, useState } from "react";
import Axios from "../api";
import {
  studentAddUrl,
  studentDeleteUrl,
  studentsListRelationUrl,
} from "../utils/urls";

export const StudentContext = createContext();

const StudentProvider = ({ children }) => {
  const [state, setState] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = useCallback(async (groupId) => {
    try {
      await Axios.get(studentsListRelationUrl(groupId)).then((response) => {
        const data = response.data;
        const groupStudents = data.filter(
          (student) => student.group.id.toString() === groupId
        );
        setState(groupStudents);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  const postData = async (body) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios.post(studentAddUrl, body);
      setState((prevData) => [...prevData, response.data]);
      console.log(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios.delete(studentDeleteUrl(id));
      setState(state.filter((student) => student.id !== id));
      console.log(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <StudentContext.Provider
      value={{ state, error, loading, postData, fetchData, deleteData }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;

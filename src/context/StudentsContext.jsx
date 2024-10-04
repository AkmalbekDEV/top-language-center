import { createContext, useCallback, useState } from "react";
import Axios from "../api";
import {
  studentAddUrl,
  studentDeleteUrl,
  studentEditUrl,
  studentsListRelationUrl,
} from "../utils/urls";

export const StudentContext = createContext();

const StudentProvider = ({ children }) => {
  const [state, setState] = useState({ students: [], groupName: "", groupPassword: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (groupId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios.get(studentsListRelationUrl(groupId));
      const data = response.data;
      const groupStudents = data.filter(
        (student) => student.group.id.toString() === groupId
      );
      if (groupStudents.length > 0) {
        setState({
          students: groupStudents,
          groupName: groupStudents[0].group.name,
          groupPassword: groupStudents.map(student => ({ id: student.group.id, password: student.group.password })),
        });
      } else {
        setState({
          students: [],
          groupName: "",
        });
      }
    } catch (err) {
      setError(err);
      setState({
        students: [],
        groupName: "",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const postData = async (body) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios.post(studentAddUrl, body);
      setState((prevState) => ({
        ...prevState,
        students: [...prevState.students, response.data],
      }));
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
      await Axios.delete(studentDeleteUrl(id));
      setState((prevState) => ({
        ...prevState,
        students: prevState.students.filter((student) => student.id !== id),
      }));
      console.log("Student deleted");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const editStudent = async (body, id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios.patch(studentEditUrl(id), body);
      const updatedStudent = response.data;
      setState((prevState) => ({
        ...prevState,
        students: prevState.students.map((student) =>
          student.id === id ? updatedStudent : student
        ),
      }));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        state,
        setState, // For group deleting purpose
        error,
        loading,
        postData,
        fetchData,
        deleteData,
        editStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;

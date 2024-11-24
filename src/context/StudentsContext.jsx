import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../api/firebase-config.js";
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  serverTimestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";

export const useStudentsManager = () => {
  const queryClient = useQueryClient();

  const useStudents = (groupId) => {
    return useQuery({
      queryKey: ["students", groupId],
      queryFn: async () => {
        // First, get the group information
        const groupRef = doc(db, "groups", groupId);
        const groupSnap = await getDoc(groupRef);
        const groupData = groupSnap.data();

        // Then get the students
        const studentsRef = collection(db, "students");
        const q = query(
          studentsRef,
          where("groupRef", "==", `groups/${groupId}`),
          orderBy("displayOrder", "asc")
        );
        const snapshot = await getDocs(q);
        const students = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return {
          students,
          groupName: groupData?.name || "",
          groupPassword: {
            id: groupId,
            password: groupData?.password || ""
          }
        };
      },
      enabled: !!groupId, // Only run query if groupId is provided
    });
  };

  const useAddStudent = () => {
    return useMutation({
      mutationFn: async ({ studentData, groupId }) => {
        const studentsRef = collection(db, "students");

        // Get current students to calculate next displayOrder
        const q = query(
          studentsRef,
          where("groupRef", "==", `groups/${groupId}`),
          orderBy("displayOrder", "desc")
        );
        const snapshot = await getDocs(q);
        const students = snapshot.docs.map((doc) => doc.data());

        // Calculate next displayOrder
        const nextDisplayOrder =
          students.length > 0
            ? Math.max(...students.map((s) => s.displayOrder)) + 1
            : 1;

        const newStudentData = {
          ...studentData,
          groupRef: `groups/${groupId}`,
          displayOrder: nextDisplayOrder,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        const newDocRef = doc(studentsRef);
        await setDoc(newDocRef, newStudentData);

        return { id: newDocRef.id, ...newStudentData };
      },
      onSuccess: (_, { groupId }) => {
        queryClient.invalidateQueries(["students", groupId]);
      },
    });
  };

  const useDeleteStudent = () => {
    return useMutation({
      mutationFn: async ({ studentId, groupId }) => {
        const studentRef = doc(db, "students", studentId);
        await deleteDoc(studentRef);
        return { studentId, groupId };
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["students", data.groupId]);
      },
    });
  };

  const useUpdateStudent = () => {
    return useMutation({
      mutationFn: async ({ studentId, updateData, groupId }) => {
        const studentRef = doc(db, "students", studentId);

        const updatedData = {
          ...updateData,
          updatedAt: serverTimestamp(),
        };

        await updateDoc(studentRef, updatedData);
        return { studentId, groupId, ...updatedData };
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["students", data.groupId]);
      },
    });
  };

  return {
    useStudents,
    useAddStudent,
    useDeleteStudent,
    useUpdateStudent,
  };
};

// Example usage in a component:
/*
const StudentsComponent = ({ groupId }) => {
  const { 
    useStudents, 
    useAddStudent, 
    useDeleteStudent, 
    useUpdateStudent 
  } = useStudentsManager();

  const { data, isLoading } = useStudents(groupId);
  const addStudent = useAddStudent();
  const deleteStudent = useDeleteStudent();
  const updateStudent = useUpdateStudent();

  if (isLoading) return <div>Loading...</div>;

  const handleAddStudent = async (studentData) => {
    try {
      await addStudent.mutateAsync({ studentData, groupId });
    } catch (error) {
      console.error('Failed to add student:', error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteStudent.mutateAsync({ studentId, groupId });
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };

  const handleUpdateStudent = async (studentId, updateData) => {
    try {
      await updateStudent.mutateAsync({ studentId, updateData, groupId });
    } catch (error) {
      console.error('Failed to update student:', error);
    }
  };

  return (
    <div>
      {data.students.map(student => (
        <div key={student.id}>
          {student.name}
          // Add your UI elements here
        </div>
      ))}
    </div>
  );
};
*/

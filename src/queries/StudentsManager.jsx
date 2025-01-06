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

  const getNextStudentId = async () => {
    try {
      const studentsRef = collection(db, "students");
      const allStudentsSnapshot = await getDocs(studentsRef);

      if (allStudentsSnapshot.empty) {
        return "students-001";
      }

      const studentIds = allStudentsSnapshot.docs
        .map((doc) => doc.id)
        .filter((id) => id && id.startsWith("students-"))
        .map((id) => parseInt(id.split("-")[1], 10))
        .filter((num) => !isNaN(num));

      if (studentIds.length === 0) {
        return "students-001";
      }

      const highestNumber = Math.max(...studentIds);
      const nextNumber = highestNumber + 1;
      return `students-${String(nextNumber).padStart(3, "0")}`;
    } catch (error) {
      console.error("Error generating ID:", error);
      throw error;
    }
  };

  const useStudents = (groupId) => {
    return useQuery({
      queryKey: ["students", groupId],
      queryFn: async () => {
        const groupRef = doc(db, "groups", groupId);
        const groupSnap = await getDoc(groupRef);
        const groupData = groupSnap.data();

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
          groupType: groupData?.type || "",
          groupPassword: {
            id: groupId,
            password: groupData?.password || "",
          },
        };
      },
      enabled: !!groupId,
    });
  };

  const useAddStudent = () => {
    return useMutation({
      mutationFn: async ({ studentData, groupId }) => {
        const newId = await getNextStudentId();

        const studentsRef = collection(db, "students");
        const q = query(
          studentsRef,
          where("groupRef", "==", `groups/${groupId}`),
          orderBy("displayOrder", "desc")
        );
        const snapshot = await getDocs(q);
        const students = snapshot.docs.map((doc) => doc.data());

        const nextDisplayOrder =
          students.length > 0
            ? Math.max(...students.map((s) => s.displayOrder)) + 1
            : 1;

        const newStudentData = {
          ...studentData,
          id: newId,
          groupRef: `groups/${groupId}`,
          displayOrder: nextDisplayOrder,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        await setDoc(doc(db, "students", newId), newStudentData);
        return newStudentData;
      },
      onSuccess: (_, { groupId }) => {
        queryClient.invalidateQueries(["students", groupId]);
      },
    });
  };

  const useDeleteStudent = () => {
    return useMutation({
      mutationFn: async (studentId) => {
        const studentRef = doc(db, "students", studentId);
        await deleteDoc(studentRef);
        return studentId;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["students"]);
      },
    });
  };

  const useUpdateStudent = () => {
    return useMutation({
      mutationFn: async (updateData) => {
        if (!updateData.id) {
          throw new Error("Studenr ID is require for update");
        }

        const studentRef = doc(db, "students", updateData.id);

        const updatedData = {
          ...updateData,
          updatedAt: serverTimestamp(),
        };

        await updateDoc(studentRef, updatedData);
        return updatedData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["students"]);
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
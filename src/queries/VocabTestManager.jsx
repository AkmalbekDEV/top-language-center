import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../api/firebase-config.js";
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";

export const useVocabManager = () => {
  const queryClient = useQueryClient();

  const getNextTestId = async () => {
    try {
      const testsRef = collection(db, "vocabulary_tests");
      const snapshot = await getDocs(testsRef);

      if (snapshot.empty) {
        return "test-001";
      }

      const testIds = snapshot.docs
        .map((doc) => doc.id)
        .filter((id) => id && id.startsWith("test-"))
        .map((id) => parseInt(id.split("-")[1], 10))
        .filter((num) => !isNaN(num));

      if (testIds.length === 0) {
        return "test-001";
      }

      const highestNumber = Math.max(...testIds);
      return `test-${String(highestNumber + 1).padStart(3, "0")}`;
    } catch (error) {
      console.error("Error generating test ID:", error);
      throw error;
    }
  };

  const useVocabTests = (groupId, weekId) => {
    return useQuery({
      queryKey: ["vocabulary_tests", groupId, weekId],
      queryFn: async () => {
        const testsRef = collection(db, "vocabulary_tests");
        const q = query(
          testsRef,
          where("groupRef", "==", `groups/${groupId}`),
          where("weekRef", "==", `journal_weeks/journal_weeks-00${weekId}`)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => a.test - b.test); // Sort by test number
      },
      enabled: !!groupId && !!weekId,
    });
  };

  const useAddVocabTest = () => {
    return useMutation({
      mutationFn: async ({ testData, groupId, journalRef, weekId }) => {
        const newId = await getNextTestId();
        const newTestData = {
          ...testData,
          id: newId,
          groupRef: `groups/${groupId}`,
          journalRef: `journals/${journalRef}`,
          weekRef: `journal_weeks/journal_weeks-00${weekId}`,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          test: parseInt(newId.split("-")[1], 10),
          access: false, // Default to false for safety
        };

        await setDoc(doc(db, "vocabulary_tests", newId), newTestData);
        return newTestData;
      },
      onSuccess: (_, { groupId, journalRef, weekId }) => {
        queryClient.invalidateQueries(["vocabulary_tests", groupId, journalRef, weekId]);
      },
    });
  };

  const useUpdateVocabTest = () => {
    return useMutation({
      mutationFn: async ({ testId, updateData }) => {
        const testRef = doc(db, "vocabulary_tests", testId);
        const updatedData = {
          ...updateData,
          updatedAt: serverTimestamp(),
        };
        await updateDoc(testRef, updatedData);
        return updatedData;
      },
      onSuccess: (_, { groupId, journalRef, weekId }) => {
        queryClient.invalidateQueries(["vocabulary_tests", groupId, journalRef, weekId]);
      },
    });
  };

  const useDeleteVocabTest = () => {
    return useMutation({
      mutationFn: async ({ testId, groupId, journalRef, weekId }) => {
        const testRef = doc(db, "vocabulary_tests", testId);
        await deleteDoc(testRef);
        return testId;
      },
      onSuccess: (_, { groupId, journalRef, weekId }) => {
        queryClient.invalidateQueries(["vocabulary_tests", groupId, journalRef, weekId]);
      },
    });
  };

  const useToggleAccess = () => {
    return useMutation({
      mutationFn: async ({ testId, currentAccess, groupId, journalRef, weekId }) => {
        const testRef = doc(db, "vocabulary_tests", testId);
        await updateDoc(testRef, {
          access: !currentAccess,
          updatedAt: serverTimestamp(),
        });
        return testId;
      },
      onSuccess: (_, { groupId, journalRef, weekId }) => {
        queryClient.invalidateQueries(["vocabulary_tests", groupId, journalRef, weekId]);
      },
    });
  };

  return {
    useVocabTests,
    useAddVocabTest,
    useUpdateVocabTest,
    useDeleteVocabTest,
    useToggleAccess,
  };
};
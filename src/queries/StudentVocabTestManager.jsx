import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../api/firebase-config.js";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "firebase/firestore";

// Main manager hook that contains all the test-related operations
export const useStudentTestManager = () => {
  const queryClient = useQueryClient();

  // Query hook to fetch all test attempts
  const useStudentTests = (studentId = null) => {
    return useQuery({
      queryKey: ["student-tests", studentId],
      queryFn: async () => {
        // Create a reference to the collection
        const testsRef = collection(db, "student_test_attempts");

        // Build query based on whether we have a studentId filter
        let q;
        if (studentId) {
          q = query(testsRef, where("studentId", "==", studentId));
        } else {
          q = query(testsRef, orderBy("startedAt", "desc"));
        }

        // Execute query and map results
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      },
    });
  };

  // Helper function to check if student already has an attempt for the week
  const checkExistingAttempt = async (studentId, weekRef, groupRef) => {
    const testsRef = collection(db, "student_test_attempts");
    const q = query(
      testsRef,
      where("studentId", "==", studentId),
      where("weekRef", "==", weekRef),
      where("groupRef", "==", groupRef),
      where("status", "==", "ready")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.length > 0;
  };

  // Helper function to generate the next test ID
  const getNextTestId = async () => {
    const testsRef = collection(db, "student_test_attempts");
    const q = query(testsRef, orderBy("id", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return "student_test-1";
    }

    // Get the latest ID and increment
    const lastDoc = snapshot.docs[0];
    const lastNumber = parseInt(lastDoc.id.split("-")[1]);
    const nextNumber = lastNumber + 1;

    return `student_test-${nextNumber}`;
  };

  // Mutation hook to create a new test attempt
  const useAddStudentTest = () => {
    return useMutation({
      mutationFn: async (newTest) => {

        // Check if student already has an attempt for this week
        const hasExistingAttempt = await checkExistingAttempt(
          newTest.studentId,
          newTest.weekRef,
          newTest.groupRef
        );

        if (hasExistingAttempt) {
          throw new Error("Test has already started. You cannot join again.");
        }

        // If no existing attempt, proceed with creating new test
        // Get the next test ID
        const newId = await getNextTestId();

        // Prepare the test document data
        const testData = {
          ...newTest,
          id: newId,
          startedAt: serverTimestamp(),
          completedAt: null,
          status: "ready",
          // answers: {
          //   ...newTest
          // },
        };

        // Create the document with our generated ID
        await setDoc(doc(db, "student_test_attempts", newId), testData);

        return testData;
      },
      onSuccess: () => {
        // Invalidate and refetch queries after successful mutation
        queryClient.invalidateQueries(["student-tests"]);
      },
    });
  };

  // Mutation hook to update a test attempt
  const useUpdateStudentTest = () => {
    return useMutation({
      mutationFn: async (updatedTest) => {
        // Ensure we have the test ID
        if (!updatedTest.id) {
          throw new Error("Test ID is required for update");
        }

        const testRef = doc(db, "student_test_attempts", updatedTest.id);

        // If the test is being completed, add the completion timestamp
        const updateData = {
          ...updatedTest,
          updatedAt: serverTimestamp(),
        };

        if (updatedTest.status === "completed") {
          updateData.completedAt = serverTimestamp();
        }

        // Update the document
        await setDoc(testRef, updateData, { merge: true });

        return updateData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["student-tests"]);
      },
    });
  };

  // Return all the hooks for use in components
  return {
    useStudentTests,
    useAddStudentTest,
    useUpdateStudentTest,
  };
};

// Example usage in a component:
/*
const TestComponent = () => {
  const {
    useStudentTests,
    useAddStudentTest,
    useUpdateStudentTest,
  } = useStudentTestManager();

  // Get all tests for a specific student
  const { data: tests, isLoading } = useStudentTests("standard_journals-283");

  // Get mutation functions
  const addTest = useAddStudentTest();
  const updateTest = useUpdateStudentTest();

  // Example function to start a new test
  const handleStartTest = async () => {
    await addTest.mutateAsync({
      studentId: "standard_journals-283",
      studentLogin: "saddi",
      studentName: "Joha Birnarsayev",
      question1: "Translation of Elephant",
      question2: "Translation of Car",
    });
  };

  // Example function to submit answers
  const handleSubmitAnswers = async (testId) => {
    await updateTest.mutateAsync({
      id: testId,
      answers: {
        answer1: "fil",
        answer2: "mashin",
      },
      status: "completed",
      score: "5/10",
    });
  };

  return (
    // Your JSX here
  );
};
*/
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
} from "firebase/firestore";

export const useGroupsManager = () => {
  const queryClient = useQueryClient();

  const useGroups = () => {
    return useQuery({
      queryKey: ["groups"],
      queryFn: async () => {
        const groupsRef = collection(db, "groups");
        const q = query(groupsRef, orderBy("displayOrder", "asc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      },
    });
  };

  // Helper function to generate next ID
  const getNextGroupId = async () => {
    const groupsRef = collection(db, "groups");
    const q = query(groupsRef, orderBy("id", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return "groups-001";
    }

    // Get the latest ID and increment
    const lastDoc = snapshot.docs[0];
    const lastNumber = parseInt(lastDoc.id.split("-")[1]);
    const nextNumber = lastNumber + 1;

    // Format the new ID with padded zeros
    return `groups-${String(nextNumber).padStart(3, "0")}`;
  };

  const useAddGroup = () => {
    return useMutation({
      mutationFn: async (newGroup) => {
        const groupsRef = collection(db, "groups");

        // Get next ID
        const newId = await getNextGroupId();

        // Get current groups to calculate next displayOrder
        const q = query(groupsRef, orderBy("displayOrder", "desc"));
        const snapshot = await getDocs(q);
        const groups = snapshot.docs.map((doc) => doc.data());

        // Calculate next displayOrder
        const nextDisplayOrder =
          groups.length > 0
            ? Math.max(...groups.map((g) => g.displayOrder)) + 1
            : 1;

        // Prepare the document data
        const groupData = {
          ...newGroup,
          id: newId, // Include ID in the document data
          displayOrder: nextDisplayOrder,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        // Use setDoc instead of addDoc to specify custom ID
        await setDoc(doc(db, "groups", newId), groupData);

        return groupData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["groups"]);
      },
    });
  };

  const useDeleteGroup = () => {
    return useMutation({
      mutationFn: async (groupId) => {
        // Delete the group
        const groupRef = doc(db, "groups", groupId);
        await deleteDoc(groupRef);

        // Delete associated students
        const studentsRef = collection(db, "students");
        const q = query(
          studentsRef,
          where("groupRef", "==", `groups/${groupId}`)
        );
        const studentSnapshot = await getDocs(q);

        const studentDeletePromises = studentSnapshot.docs.map((studentDoc) =>
          deleteDoc(doc(db, "students", studentDoc.id))
        );
        // Delete associated journals from all journal collections
        const journalCollections = [
          "standard_journals",
          "advanced_journals",
          "top_journals",
        ]

        const journalDeletePromises = journalCollections.map(async (collectionName) => {
          const journalsRef = collection(db, collectionName)
          const journalsQuery = query(journalsRef, where("groupRef", "==", `groups/${groupId}`))
          const journalSnapshot = await getDocs(journalsQuery)
          return Promise.all(
            journalSnapshot.docs.map((journalDoc) =>
              deleteDoc(doc(db, collectionName, journalDoc.id))
            )
          )
        })
        await Promise.all([...studentDeletePromises, ...journalDeletePromises]);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["groups"]);
        queryClient.invalidateQueries(["students"]);
        queryClient.invalidateQueries(["journals"]);
      },
    });
  };

  // 4. MUTATION HOOK - Updating a Group
  const useUpdateGroup = () => {
    return useMutation({
      mutationFn: async (updatedGroup) => {
        // Ensure we have the group ID
        if (!updatedGroup.id) {
          throw new Error("Group ID is required for update");
        }

        const groupRef = doc(db, "groups", updatedGroup.id);

        // Prepare update data
        const updateData = {
          ...updatedGroup,
          updatedAt: serverTimestamp(),
        };

        // Update the document
        await setDoc(groupRef, updateData, { merge: true });

        return updateData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["groups"]);
      },
    });
  };

  return {
    useGroups,
    useAddGroup,
    useDeleteGroup,
    useUpdateGroup,
  };
};
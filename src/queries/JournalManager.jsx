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
  updateDoc,
  getDoc,
} from "firebase/firestore";

export const useJournalManager = () => {
  const queryClient = useQueryClient();

  // Helper function to get collection name based on journal type
  const getCollectionName = (type) => {
    const collections = {
      standard: "standard_journals",
      advanced: "advanced_journals",
      top: "top_journals",
    };
    return collections[type] || "standard_journals";
  };

  const getNextJournalId = async (journalType) => {
    try {
      const collectionName = getCollectionName(journalType);
      const journalsRef = collection(db, collectionName);
      const snapshot = await getDocs(journalsRef);

      if (snapshot.empty) {
        return `${collectionName}-001`;
      }

      const journalIds = snapshot.docs
        .map((doc) => doc.id)
        .filter((id) => id && id.startsWith(`${collectionName}-`))
        .map((id) => parseInt(id.split("-")[1], 10))
        .filter((num) => !isNaN(num));

      if (journalIds.length === 0) {
        return `${collectionName}-001`;
      }

      const highestNumber = Math.max(...journalIds);
      return `${collectionName}-${String(highestNumber + 1).padStart(3, "0")}`;
    } catch (error) {
      console.error("Error generating journal ID:", error);
      throw error;
    }
  };

  // Read-only query for journal weeks
  const useJournalWeeks = () => {
    return useQuery({
      queryKey: ["journal_weeks"],
      queryFn: async () => {
        const weeksRef = collection(db, "journal_weeks");
        const snapshot = await getDocs(weeksRef);
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      },
    });
  };

  const useUpdateJournalWeekTimer = () => {
    return useMutation({
      mutationFn: async ({ weekId, updateData }) => {
        const weekRef = doc(db, "journal_weeks", weekId);
        const updatedData = {
          ...updateData,
          updatedAt: serverTimestamp(),
        };
        await updateDoc(weekRef, updatedData);
        return updatedData;
      },
      onSuccess: (_, { weekId }) => {
        queryClient.invalidateQueries(["journal_weeks"], weekId);
      },
    });
  }

  // Query for journals by type, week and group
  const useJournals = (journalType, groupId, weekId) => {
    return useQuery({
      queryKey: ["journals", journalType, groupId, weekId],
      queryFn: async () => {
        const collectionName = getCollectionName(journalType);
        const journalsRef = collection(db, collectionName);
        const groupRef = doc(db, "groups", groupId);

        // Get group data
        const groupSnap = await getDoc(groupRef);
        const groupData = groupSnap.data();

        // Query journals
        const q = query(
          journalsRef,
          where("groupRef", "==", `groups/${groupId}`),
          where("weekRef", "==", `journal_weeks/journal_weeks-00${weekId}`)
        );

        const snapshot = await getDocs(q);
        const journals = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return {
          journals,
          groupName: groupData?.name || "",
        };
      },
      enabled: !!journalType && !!groupId && !!weekId,
    });
  };

  const useAddJournal = () => {
    return useMutation({
      mutationFn: async ({ journalType, journalData, groupId, weekId }) => {
        const collectionName = getCollectionName(journalType);

        // if it's week 1, create entries for all 8 weeks
        if (weekId === "1") {
          const createdJournals = [];

          // Create journals for weeks 1-8
          for (let week = 1; week <= 8; week++) {
            const newId = await getNextJournalId(journalType);
            const weekRef = `journal_weeks/journal_weeks-00${week}`;

            const journalDataForWeek = {
              ...journalData,
              id: newId,
              groupRef: `groups/${groupId}`,
              weekRef: weekRef,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            }

            await setDoc(doc(db, collectionName, newId), journalDataForWeek);
            createdJournals.push(journalDataForWeek)
          }

          return createdJournals;
        } else {
          // For other weeks, just create a single journal entry
          const newId = await getNextJournalId(journalType);

          const newJournalData = {
            ...journalData,
            id: newId,
            groupRef: `groups/${groupId}`,
            weekRef: `journal_weeks/journal_weeks-00${weekId}`,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };

          await setDoc(doc(db, collectionName, newId), newJournalData);
          return newJournalData;
        }
      },
      onSuccess: (_, { journalType, groupId, weekId }) => {
        // if it was week 1, invalidate all weeks
        if (weekId === "1") {
          for (let week = 1; week <= 8; week++) {
            queryClient.invalidateQueries([
              "journals",
              journalType,
              groupId,
              String(week),
            ]);
          }
        } else {
          // Otherwise just invalidate the current week
          queryClient.invalidateQueries([
            "journals",
            journalType,
            groupId,
            weekId,
          ]);
        }
      },
    });
  };

  const useUpdateJournal = () => {
    return useMutation({
      mutationFn: async ({
        journalType,
        journalId,
        updateData
      }) => {
        if (!journalId) {
          throw new Error("Journal ID is required for update");
        }
        const collectionName = getCollectionName(journalType);
        const journalRef = doc(db, collectionName, journalId);
        const updatedData = {
          ...updateData,
          updatedAt: serverTimestamp(),
        };
        await updateDoc(journalRef, updatedData);
        return updatedData;
      },
      onSuccess: (_, { journalType, groupId, weekId }) => {
        queryClient.invalidateQueries([
          "journals",
          journalType,
          groupId,
          weekId,
        ]);
      },
    });
  };

  const useDeleteJournal = () => {
    return useMutation({
      mutationFn: async ({ journalType, journalId }) => {
        const collectionName = getCollectionName(journalType);
        const journalRef = doc(db, collectionName, journalId);
        await deleteDoc(journalRef);
        return journalId;
      },
      onSuccess: (_, { journalType, groupId, weekId }) => {
        queryClient.invalidateQueries([
          "journals",
          journalType,
          groupId,
          weekId,
        ]);
      },
    });
  };

  return {
    useJournalWeeks,
    useUpdateJournalWeekTimer,
    useJournals,
    useAddJournal,
    useUpdateJournal,
    useDeleteJournal,
  };
};
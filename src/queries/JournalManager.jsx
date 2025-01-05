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
        const newId = await getNextJournalId(journalType);
        const collectionName = getCollectionName(journalType);

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
    useJournals,
    useAddJournal,
    useUpdateJournal,
    useDeleteJournal,
  };
};

// import { createContext, useCallback, useState } from "react";
// import Axios from "../api";
// import {
//   journalAddUrl,
//   journalDeleteUrl,
//   journalEditUrl,
//   journalRelationUrl,
//   weeksListUrl,
// } from "../utils/urls";
// import PropTypes from "prop-types";

// export const JournalContext = createContext();

// const JournalProvider = ({ children }) => {
//   const [journal, setJournal] = useState([]);
//   const [week, setWeek] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const getJournals = useCallback(async (journalType, groupId, weekId) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await Axios.get(
//         journalRelationUrl(journalType, groupId, weekId)
//       );
//       const data = response.data;
//       const groupJournals = data.filter(
//         (journal) =>
//           journal.group.id.toString() === groupId &&
//           journal.journal_week_id.toString() === weekId
//       );

//       if (groupJournals.length > 0) {
//         setJournal({
//           journals: groupJournals,
//           groups: groupJournals[0].group,
//           groupName: groupJournals[0].group.name,
//         });
//       } else {
//         setJournal({
//           journals: [],
//           groups: [],
//           groupName: "",
//         });
//       }
//     } catch (err) {
//       setError(err);
//       setJournal({
//         journals: [],
//         groups: [],
//         groupName: "",
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const getWeeks = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await Axios.get(weeksListUrl);
//       setWeek(response.data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const postJournal = async (journalType, body) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await Axios.post(journalAddUrl(journalType), body);
//       setJournal((prevState) => ({
//         ...prevState,
//         journals: [...prevState.journals, response.data],
//       }));
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const editJournal = async (journalType, body, id) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await Axios.patch(journalEditUrl(journalType, id), body);
//       const updatedJournal = response.data;
//       setJournal((prevState) => ({
//         ...prevState,
//         journals: prevState.journals.map((journal) =>
//           journal.id === id ? updatedJournal : journal
//         ),
//       }));
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const deleteJournal = async (journalType, id) => {
//     setLoading(true)
//     setError(null)
//     try {
//       await Axios.delete(journalDeleteUrl(journalType, id));
//       setJournal((prevJournal) => ({
//         ...prevJournal,
//         journals: prevJournal.journals.filter((journal) => journal.id !== id),
//       }));
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <JournalContext.Provider
//       value={{
//         journal,
//         week,
//         loading,
//         error,
//         getJournals,
//         getWeeks,
//         postJournal,
//         editJournal,
//         deleteJournal
//       }}
//     >
//       {children}
//     </JournalContext.Provider>
//   );
// };

// JournalProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default JournalProvider;

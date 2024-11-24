import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "..//api/firebase-config.js";
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

        const deletePromises = studentSnapshot.docs.map((studentDoc) =>
          deleteDoc(doc(db, "students", studentDoc.id))
        );

        await Promise.all(deletePromises);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["groups"]);
        queryClient.invalidateQueries(["students"]);
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

// // Form Component
// const AddGroupForm = () => {
//   const { useAddGroup } = useGroupsManager();
//   const addGroup = useAddGroup();

//   const [formData, setFormData] = useState({
//     name: '',
//     password: '',
//     type: GROUP_TYPES.STANDARD
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addGroup.mutateAsync(formData);
//       // Reset form
//       setFormData({
//         name: '',
//         password: '',
//         type: GROUP_TYPES.STANDARD
//       });
//     } catch (error) {
//       console.error('Failed to add group:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="name" className="block text-sm font-medium">
//           Group Name:
//         </label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//         />
//       </div>

//       <div>
//         <label htmlFor="password" className="block text-sm font-medium">
//           Password:
//         </label>
//         <input
//           type="text"
//           id="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//         />
//       </div>

//       <div>
//         <label htmlFor="type" className="block text-sm font-medium">
//           Group Type:
//         </label>
//         <select
//           id="type"
//           name="type"
//           value={formData.type}
//           onChange={handleChange}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//         >
//           {Object.values(GROUP_TYPES).map(type => (
//             <option key={type} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button
//         type="submit"
//         disabled={addGroup.isPending}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
//       >
//         {addGroup.isPending ? "Adding..." : "Add Group"}
//       </button>
//     </form>
//   );
// };

// // Main Groups List Component
// const GroupsList = () => {
//   const { useGroups } = useGroupsManager();
//   const { data: groups, isLoading, error } = useGroups();

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div className="space-y-6">
//       <AddGroupForm />

//       <div className="space-y-4">
//         {groups?.map(group => (
//           <div
//             key={group.id}
//             className="p-4 border rounded-lg shadow-sm"
//           >
//             <p>ID: {group.id}</p>
//             <p>Name: {group.name}</p>
//             <p>Type: {group.type}</p>
//             <p>Display Order: {group.displayOrder}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GroupsList;

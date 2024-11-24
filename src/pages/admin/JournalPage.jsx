// import { useContext, useEffect, useRef, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { StudentContext } from "../../context/StudentsContext";
// import { JournalContext } from "../../context/journals/JournalContext";
// import {
//   AlertDialog,
//   AlertDialogBody,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogOverlay,
//   Button,
// } from "@chakra-ui/react";
// import JournalTableTypeBody from "../../components/ui/JournalTypeTable";
// import PopoverComponent from "../../components/ui/Popover";
// import JournalForm from "../../components/ui/JournalForm";

// function JournalPage() {
//   const { journal, loading, error, getJournals, deleteJournal } =
//     useContext(JournalContext);
//   const { state, fetchData } = useContext(StudentContext);
//   const { groupType, id, weekId } = useParams();
//   const [journalType, setJournalType] = useState("");
//   const navigate = useNavigate();
//   const [isDelOpen, setIsDelOpen] = useState(false);
//   const [studentIdToDelete, setStudentIdToDelete] = useState(null);
//   const cancelRef = useRef();

//   useEffect(() => {
//     if (journalType !== "") {
//       getJournals(journalType, id, weekId);
//       fetchData(id);
//     }
//   }, [getJournals, id, fetchData, weekId, journalType]);

//   useEffect(() => {
//     let newJournalType;

//     if (groupType === "standard") {
//       newJournalType = 0;
//     } else if (groupType === "advanced") {
//       newJournalType = 1;
//     } else if (groupType === "top") {
//       newJournalType = 2;
//     } else {
//       navigate("/404");
//       return;
//     }
//     // Only update state if journalType is changing
//     if (journalType !== newJournalType) {
//       setJournalType(newJournalType);
//     }
//   }, [setJournalType, navigate, groupType, journalType]);

//   const backPathname =
//     "/" + location.pathname.split("/").splice(1, 4).join("/");

//   const handleDeleteClick = (id) => {
//     setStudentIdToDelete(id);
//     setIsDelOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (studentIdToDelete !== null) {
//       await deleteJournal(journalType, studentIdToDelete);
//       setIsDelOpen(false);
//       setStudentIdToDelete(null);
//     }
//   };

//   const handleDeleteClose = () => {
//     setIsDelOpen(false);
//     setStudentIdToDelete(null);
//   };

//   return (
//     <div className="min-w-100 grid grid-rows-1">
//       <div className="flex items-center justify-center max-sm:justify-between max-sm:flex-col-reverse pt-5">
//         <div className="grid w-full gap-10">
//           <div className="w-full flex justify-between">
//             <Link
//               className="px-6 py-1.5 rounded-md bg-[#EDF2F7] text-[#1A202C] text-xl font-semibold"
//               to={backPathname}
//             >
//               Back
//             </Link>
//             <Link
//               className="px-6 py-1.5 rounded-md text-gray-200 text-xl font-medium bg-[#1E40AF]"
//               to={`/students/${id}`}
//             >
//               Students
//             </Link>
//             <PopoverComponent
//               trigger={<Button>Add column</Button>}
//               header="Adding Student"
//             >
//               <JournalForm students={state} />
//             </PopoverComponent>
//           </div>
//           <div className="text-center">
//             <h1 className="text-4xl font-medium">Group in {state.groupName}</h1>
//           </div>
//           <div className="text-center h-[50px]">
//             {loading && (
//               <span className="bg-blue-500 text-white p-3 rounded-3xl">
//                 Loading...
//               </span>
//             )}
//             {error && "Error: " + error}
//           </div>
//         </div>
//       </div>
//       <div className="w-100">
//         <JournalTableTypeBody
//           data={journal}
//           students={state}
//           handleDeleteClick={handleDeleteClick}
//         />
//       </div>
//       <AlertDialog
//         isOpen={isDelOpen}
//         leastDestructiveRef={cancelRef}
//         onClose={handleDeleteClose}
//         closeOnEsc
//       >
//         <AlertDialogOverlay>
//           <AlertDialogContent>
//             <AlertDialogHeader fontSize="lg" fontWeight="bold">
//               Delete Student
//             </AlertDialogHeader>
//             <AlertDialogBody>
//               Are you sure you want to delete this student? This action cannot
//               be undone.
//             </AlertDialogBody>

//             <AlertDialogFooter>
//               <Button ref={cancelRef} onClick={handleDeleteClose}>
//                 Cancel
//               </Button>
//               <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
//                 Delete
//               </Button>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialogOverlay>
//       </AlertDialog>
//     </div>
//   );
// }

// export default JournalPage;

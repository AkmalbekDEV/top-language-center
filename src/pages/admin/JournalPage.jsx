import { useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import JournalTableTypeBody from "../../components/ui/JournalTypeTable";
import PopoverComponent from "../../components/ui/Popover";
import { useJournalManager } from "../../queries/JournalManager";
import { useStudentsManager } from "../../queries/StudentsManager";
import JournalForm from "../../components/ui/JournalForm";

function JournalPage() {
  const { groupId, weekId } = useParams();
  const { useJournals, useDeleteJournal } = useJournalManager();
  const { useStudents } = useStudentsManager();
  const deleteJournal = useDeleteJournal();
  const location = useLocation();
  const { data: students } = useStudents(groupId);
  // Parse the query string using URLSearchParams
  const searchParams = new URLSearchParams(location.search);

  // Get the value of the specific query parameter
  const typeValue = searchParams.get("type");

  const { data, isLoading } = useJournals(typeValue, groupId, weekId);

  const [isDelOpen, setIsDelOpen] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const cancelRef = useRef();

  if (isLoading) return <div>Loading journals...</div>;

  const backPathname =
    "/" + location.pathname.split("/").splice(1, 4).join("/");

  const handleDeleteClick = (id) => {
    setStudentIdToDelete(id);
    setIsDelOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (studentIdToDelete !== null) {
      await deleteJournal.mutateAsync({ journalType: typeValue, journalId: studentIdToDelete });
      setIsDelOpen(false);
      setStudentIdToDelete(null);
    }
  };

  const handleDeleteClose = () => {
    setIsDelOpen(false);
    setStudentIdToDelete(null);
  };

  return (
    <div className="min-w-100 grid grid-rows-1">
      <div className="flex items-center justify-center max-sm:justify-between max-sm:flex-col-reverse pt-5">
        <div className="grid w-full gap-10">
          <div className="w-full flex justify-between">
            <Link
              className="px-6 py-1.5 rounded-md bg-[#EDF2F7] text-[#1A202C] text-xl font-semibold"
              to={backPathname}
            >
              Back
            </Link>
            <div className="flex gap-10">
              <Link
                className="px-6 py-1.5 rounded-md text-gray-200 text-xl font-medium bg-[#1E40AF]"
                to={`/group/${groupId}/students`}
              >
                Students
              </Link>
              <Link
                className="px-6 py-1.5 rounded-md text-gray-200 text-xl font-medium bg-[#1E40AF]"
                to={`/group/${groupId}/students/journals/${weekId}/vocabulary?type=${typeValue}`}
              >
                Vocabulary
              </Link>
            </div>

            <PopoverComponent
              trigger={<Button>Add column</Button>}
              header="Adding Student"
            >
              <JournalForm />
            </PopoverComponent>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-medium">
              Group in {students?.groupName}
            </h1>
          </div>
          <div className="text-center h-[50px]">
            {isLoading && (
              <span className="bg-blue-500 text-white p-3 rounded-3xl">
                Loading...
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="w-100">
        <JournalTableTypeBody
          data={data.journals}
          handleDeleteClick={handleDeleteClick}
        />
      </div>

      <AlertDialog
        isOpen={isDelOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleDeleteClose}
        closeOnEsc
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Student
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this student? This action cannot
              be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}

export default JournalPage;
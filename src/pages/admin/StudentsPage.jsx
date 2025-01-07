import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useStudentsManager } from "../../queries/StudentsManager";
import PopoverComponent from "../../components/ui/Popover";
import AddStudentForm from "../../components/ui/form/students/AddStudentForm";
import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import EditStudentModal from "../../components/ui/form/students/EditStudentModal";

const StudentsPage = () => {
  const { useStudents, useDeleteStudent } = useStudentsManager();
  const { groupId } = useParams();
  const { data, isLoading } = useStudents(groupId);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  const cancelRef = React.useRef();
  const deleteStudent = useDeleteStudent();
  const toast = useToast();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const handleDelete = async () => {
    if (!studentToDelete) return;

    try {
      await deleteStudent.mutateAsync(studentToDelete.id);
      onDeleteClose();
      setStudentToDelete(null);
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "success",
        title: "Deleted!",
        description: "The student successfully deleted",
      });
    } catch (error) {
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "error",
        title: "Delete Failed",
        description: "There was an error deleting the student",
      });
      console.error("Delete group error:", error);
    }
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    onDeleteOpen();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="max-w-[1250px] mx-auto mt-14 max-sm:px-5">
        {/* {error && <p>Error: {error}</p>} */}
        <div className="flex items-center justify-center max-sm:justify-between max-sm:flex-col-reverse">
          <div className="grid w-full gap-10">
            <div className="w-full flex justify-between">
              <Link
                className="px-5 py-1.5 max-sm:py-1 max-sm:px-3 max-sm:text-[1rem] rounded-md bg-gray-200 text-black text-xl font-medium"
                to="/groups"
              >
                Back
              </Link>
              {data.groupType !== "Kids" ? (
                <Link
                  className="px-5 py-1.5 max-sm:py-1 max-sm:px-3 max-sm:text-[1rem] rounded-md text-gray-200 text-xl font-medium bg-[#1E40AF]"
                  to={`/group/${groupId}/students/journals`}
                >
                  Journal
                </Link>
              ) : (
                ""
              )}
              <PopoverComponent
                trigger={
                  <Button
                    size="xl"
                    className="px-5 py-1.5 max-sm:py-1 max-sm:px-3 max-sm:text-[1rem] rounded-md bg-gray-200 text-black text-xl font-medium"
                  >
                    <h1 className="text-lg font-medium text-blue-600">
                      Add Student
                    </h1>
                  </Button>
                }
                header="Add Student"
              >
                <AddStudentForm groupId={groupId} />
              </PopoverComponent>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-medium">
                Group in {data.groupName}
              </h1>
            </div>
          </div>
        </div>
        <table className="w-full text-center text-sm font-light mt-12 rounded-xl border-2 border-blue-500">
          <thead className="border-b bg-blue-500 font-medium text-white">
            <tr>
              <th scope="col" className="px-6 max-sm:px-[1px] py-4">
                #
              </th>
              <th scope="col" className="px-6 max-sm:px-[1px] py-4">
                Name
              </th>
              <th scope="col" className="px-6 max-sm:px-[1px] py-4 text-wrap">
                1-month
              </th>
              <th scope="col" className="px-6 max-sm:px-[1px] py-4 text-wrap">
                2-month
              </th>
              <th scope="col" className="px-6 max-sm:px-[1px] py-4">
                Handle
              </th>
            </tr>
          </thead>
          <tbody>
            {data.students.map((student, index) => {
              const uniqueId = `${index + 1}`;
              return (
                <tr
                  key={student.id}
                  className="border-b-2 border-blue-500 text-lg font-medium max-sm:text-base"
                >
                  <td className="whitespace-nowrap px-6 max-sm:ml-[3px] max-sm:px-3 py-4 font-medium max-sm:text-sm">
                    {uniqueId}
                  </td>
                  <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                    {student?.name}
                  </td>
                  <td className="whitespace-nowrap px-6 max-sm:px-[3px] py-4">
                    <span
                      className={`max-sm:text-xs  font-semibold rounded-full border py-1 px-3 max-sm:px-1.5 ${student.first_month === "true"
                          ? "bg-gradient-to-r from-green-200 to-green-300 text-green-800 border-green-400 hover:from-green-300 hover:to-green-400 hover:text-green-900"
                          : "bg-gradient-to-r from-orange-200 to-orange-300 text-orange-800 border-orange-400 hover:from-orange-300 hover:to-orange-400 hover:text-orange-900"
                        }`}
                    >
                      {student?.first_month === "true" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 max-sm:px-[3px] py-4">
                    <span
                      className={`max-sm:text-xs  font-semibold rounded-full border py-1 px-3 max-sm:px-1.5 ${student.second_month === "true"
                          ? "bg-gradient-to-r from-green-200 to-green-300 text-green-800 border-green-400 hover:from-green-300 hover:to-green-400 hover:text-green-900"
                          : "bg-gradient-to-r from-orange-200 to-orange-300 text-orange-800 border-orange-400 hover:from-orange-300 hover:to-orange-400 hover:text-orange-900"
                        }`}
                    >
                      {student?.second_month === "true" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 max-sm:px-[3px] py-4">
                    <div className="flex justify-center gap-2 max-sm:gap-0">
                      {editingStudent && (
                        <EditStudentModal
                          student={editingStudent}
                          onClose={() => setEditingStudent(null)}
                        />
                      )}
                      <Button
                        size={{ base: "xs", sm: "sm" }}
                        colorScheme="green"
                        className="max-sm:mr-[5px]"
                        onClick={() => setEditingStudent(student)}
                      >
                        <MdEdit />
                      </Button>
                      <Button
                        size={{ base: "xs", sm: "sm" }}
                        colorScheme="red"
                        onClick={() => handleDeleteClick(student)}
                      >
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <AlertDialog
          isOpen={isDeleteOpen}
          leastDestructiveRef={cancelRef}
          onClose={onDeleteClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Group
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this {studentToDelete?.name}{" "}
                student? This action cannot be undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onDeleteClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    </div>
  );
};

export default StudentsPage;

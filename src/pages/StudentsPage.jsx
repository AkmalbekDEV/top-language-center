import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { StudentContext } from "../context/StudentsContext";

const StudentsPage = () => {
  const { state, error, loading, postData, fetchData, deleteData } = useContext(StudentContext);
  const [inputData, setInputData] = useState({ name: '', type: "Unpaid", group_id: 1 });
  const [isOpen, setIsOpen] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const cancelRef = useRef();

  const toast = useToast()
  useEffect(() => {
    fetchData()
  }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData(inputData);
    } catch (error) {
      console.log("Big error:", error);
    }
    toast({
      position: "top",
      duration: 5000,
      isClosable: true,
      status: "success",
      title: "Added!",
      description: "New student successfully added"
  })
  };

  const handleDeleteClick = (id) => {
    setStudentIdToDelete(id);
    setIsOpen(true)
  };

  const handleDeleteConfirm = async () => {
    if (studentIdToDelete !== null) {
      await deleteData(studentIdToDelete);
      setIsOpen(false);
      setStudentIdToDelete(null);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setStudentIdToDelete(null);
  };

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-[1250px] mx-auto mt-36 max-sm:px-5">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="flex items-center justify-center max-sm:justify-between max-sm:flex-col-reverse">
        <div className="flex items-center gap-3 max-sm:mb-5">
          <Popover className="bg-gray-200 z-50" closeOnEsc>
            <PopoverTrigger>
              <Button className="px-5 py-1 rounded-xl bg-gray-200 text-blue-600 text-xl font-medium">
                Add student
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-gray-200 rounded-xl p-5 z-50">
              <PopoverArrow />
              <PopoverHeader className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
                O'quvchi qo'shish
                <PopoverCloseButton />
              </PopoverHeader>
              <PopoverBody>
                <form className="grid gap-2" onSubmit={handleSubmit}>
                  <h1 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                    Student's Name
                  </h1>
                  <input
                    name="name"
                    type="text"
                    value={inputData.name}
                    onChange={handleChange}
                    placeholder="O'quvchining ismi..."
                    className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                  />
                  <button className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600">
                    Submit!
                  </button>
                </form>
              </PopoverBody>
            </PopoverContent>
          </Popover>
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
            <th scope="col" className="px-6 max-sm:px-[1px] py-4">
              Handle
            </th>
          </tr>
        </thead>
        <tbody>
          {state.map((student) => (
            <tr
              key={student.id}
              className="border-b-2 border-blue-500 text-lg font-medium max-sm:text-sm"
            >
              <td className="whitespace-nowrap px-6 max-sm:ml-[5px] py-4 font-medium">
                {student.id}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[5px] py-4">
                {student.name}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[5px] py-4">
                <div className="flex justify-center gap-2">
                    <Button className="px-5 py-1 rounded-xl bg-gray-200 text-blue-600 max-sm:mr-[5px]">
                      Edit
                    </Button>
                    <Button className="px-5 py-1 rounded-xl bg-gray-200 text-blue-600 max-sm:mr-[5px]" onClick={() => handleDeleteClick(student.id)}>
                      Delete
                    </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Student
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this student? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleClose}>
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
};

export default StudentsPage;

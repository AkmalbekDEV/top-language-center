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
import { MdEdit, MdDelete } from "react-icons/md";
import { StudentContext } from "../context/StudentsContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const StudentsPage = () => {
  const {
    state,
    error,
    loading,
    postData,
    fetchData,
    deleteData,
    editStudent,
  } = useContext(StudentContext);
  const { students, groupName } = state;
  const { groupId } = useParams();
  const [inputData, setInputData] = useState({
    id: null,
    name: "",
    type: "Unpaid",
    group_id: groupId,
  });
  const [editData, setEditData] = useState({
    id: null,
    name: "",
    type: "",
    group_id: "",
  });
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const cancelRef = useRef();

  useEffect(() => {
    fetchData(groupId);
  }, [fetchData, groupId]);
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await editStudent(editData, editData.id);
      setIsOpen(false);
      setEditData({ id: null, name: "", type: "" });
    } catch (error) {
      console.log("Edit error: ", error);
    }
    toast({
      position: "top",
      duration: 5000,
      isClosable: true,
      status: "success",
      title: "Edited!",
      description: "The student successfully edited",
    });
  };
  const toast = useToast();
  console.log("Students: ", students);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputData.name.trim() !== "") {
      try {
        await postData(inputData);
      } catch (error) {
        console.log("Big error:", error);
      }
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "success",
        title: "Added!",
        description: "New student successfully added",
      });
    } else {
      toast({
        position: "top",
        duration: 2000,
        isClosable: true,
        status: "error",
        title: "Empty!",
        description: "Input shouldn't be empty",
      });
    }
    setInputData({ name: "" });
  };
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleToggle = () => {
    if (inputData.type === "Unpaid") {
      setInputData({ type: "Paid" });
    } else {
      setInputData({ type: "Unpaid" });
    }
  };
  const handleEditClick = (student) => {
    setEditData({ id: student.id, name: student.name, type: student.type });
  };
  console.log(editData);
  const handleDeleteClick = (id) => {
    setStudentIdToDelete(id);
    setIsOpen(true);
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
    <div className="max-w-[1250px] mx-auto mt-14 max-sm:px-5">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="flex items-center justify-center max-sm:justify-between max-sm:flex-col-reverse">
        <div className="grid w-full gap-10">
          <div className="w-full flex justify-between">
            <Link
              className="px-6 py-1.5 rounded-md bg-gray-200 text-black text-xl font-medium"
              to="/groups"
            >
              Back
            </Link>
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
                    <label className="text-2xl mt-2 font-medium text-blue-600 text-center">
                      Type
                    </label>
                    <select
                      name="type"
                      value={inputData.type}
                      onChange={handleChange}
                      className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                    </select>
                    <button className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600">
                      Submit!
                    </button>
                  </form>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-medium">Group in {groupName}</h1>
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
            <th scope="col" className="px-6 max-sm:px-[1px] py-4">
              Type
            </th>
            <th scope="col" className="px-6 max-sm:px-[1px] py-4">
              Handle
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => {
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
                  <span className={`max-sm:text-xs  font-semibold rounded-full border py-1 px-3 max-sm:px-1.5 ${student.type === "Paid" ? "bg-gradient-to-r from-green-200 to-green-300 text-green-800 border-green-400 hover:from-green-300 hover:to-green-400 hover:text-green-900" : "bg-gradient-to-r from-orange-200 to-orange-300 text-orange-800 border-orange-400 hover:from-orange-300 hover:to-orange-400 hover:text-orange-900"}`}>
                    {student?.type}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 max-sm:px-[3px] py-4">
                  <div className="flex justify-center gap-2 max-sm:gap-0">
                    <Popover className="bg-gray-200">
                      <PopoverTrigger>
                        <Button
                          size={{ base: "xs", sm: "sm" }}
                          colorScheme="green"
                          className="max-sm:mr-[5px]"
                          onClick={() => handleEditClick(student)}
                        >
                          <MdEdit />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="bg-gray-200 rounded-xl p-5 max-sm:mr-10">
                        <PopoverArrow />
                        <PopoverHeader className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
                          Edit Student
                          <PopoverCloseButton />
                        </PopoverHeader>
                        <PopoverBody>
                          <form className="grid gap-2" onSubmit={handleEdit}>
                            <h1 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                              Student's Name
                            </h1>
                            <input
                              name="name"
                              type="text"
                              value={editData?.name}
                              onChange={handleEditChange}
                              placeholder="O'quvchining ismi..."
                              className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                            />
                            <h1 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                              Type
                            </h1>
                            <select
                              name="type"
                              value={editData?.type}
                              onChange={handleEditChange}
                              className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                            >
                              <option value="Paid">Paid</option>
                              <option value="Unpaid">Unpaid</option>
                            </select>
                            <button className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600">
                              Save
                            </button>
                          </form>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                    <Button
                      size={{ base: "xs", sm: "sm" }}
                      colorScheme="red"
                      onClick={() => handleDeleteClick(student.id)}
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
              Are you sure you want to delete this student? This action cannot
              be undone.
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

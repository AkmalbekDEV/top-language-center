// import { useContext, useEffect, useRef, useState } from "react";
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
// import { MdEdit, MdDelete } from "react-icons/md";
// import { StudentContext } from "../../context/StudentsContext";
import { Link, useParams } from "react-router-dom";
import { useStudentsManager } from "../../context/StudentsContext";
import PopoverComponent from "../../components/ui/Popover";
import AddStudentForm from "../../components/ui/form/students/AddStudentForm";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
// import { GroupContext } from "../../context/GroupContext";
// import PopoverComponent from "../../components/ui/Popover";

const StudentsPage = () => {
  const { useStudents, useDeleteStudent } = useStudentsManager();
  const { groupId } = useParams();
  const { data, isLoading } = useStudents(groupId);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const cancelRef = React.useRef();
  const deleteStudent = useDeleteStudent();
  const toast = useToast();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  console.log(groupId);
  console.log(studentToDelete);

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

  // const {
  //   state,
  //   error,
  //   loading,
  //   postData,
  //   fetchData,
  //   deleteData,
  //   editStudent,
  // } = useContext(StudentContext);
  // const {
  //   editPassword,
  //   state: groups,
  //   getData: getGroups,
  // } = useContext(GroupContext);
  // const { students, groupName, groupPassword } = state;
  // // const { groupId } = useParams();
  // const {
  //   isOpen: isOpenPopover1,
  //   onOpen: onOpenPopover1,
  //   onClose: onClosePopover1,
  // } = useDisclosure();
  // const {
  //   isOpen: isOpenPopover2,
  //   onOpen: onOpenPopover2,
  //   onClose: onClosePopover2,
  // } = useDisclosure();
  // const {
  //   isOpen: isOpenPopover3,
  //   onOpen: onOpenPopover3,
  //   onClose: onClosePopover3,
  // } = useDisclosure();
  // const [inputData, setInputData] = useState({
  //   id: null,
  //   name: "",
  //   first_month: "false",
  //   second_month: "false",
  //   group_id: groupId,
  // });
  // const [editData, setEditData] = useState({
  //   id: null,
  //   name: "",
  //   first_month: "",
  //   second_month: "",
  //   group_id: groupId,
  // });
  // const [editPswrd, setEditPswrd] = useState({ id: null, password: "" });
  // const toast = useToast();

  // const handleEditPassword = async (e) => {
  //   e.preventDefault();
  //   if (editPswrd.password.trim() === "") {
  //     toast({
  //       position: "top",
  //       duration: 2000,
  //       isClosable: true,
  //       status: "error",
  //       title: "Empty!",
  //       description: "Input shouldn't be empty",
  //     });
  //     return;
  //   }
  //   try {
  //     // Checking if the new password is unique
  //     const isUnique = !groups.some(
  //       (group) => group.password === editPswrd.password
  //     );
  //     if (!isUnique) {
  //       toast({
  //         position: "top",
  //         duration: 5000,
  //         isClosable: true,
  //         status: "error",
  //         title: "Duplicate Password",
  //         description:
  //           "The password is already in use. Please choose a different one.",
  //       });
  //       return;
  //     }
  //     await editPassword(editPswrd, editPswrd.id);
  //     setEditPswrd({ id: null, password: "" });
  //     toast({
  //       position: "top",
  //       duration: 5000,
  //       isClosable: true,
  //       status: "success",
  //       title: "Edited!",
  //       description: "The password was successfully edited",
  //     });
  //     onClosePopover3();
  //   } catch (error) {
  //     console.error("Edit error: ", error);
  //     toast({
  //       position: "top",
  //       duration: 5000,
  //       isClosable: true,
  //       status: "error",
  //       title: "Edit Failed",
  //       description: "There was an error editing the password",
  //     });
  //   }
  // };

  // const handleEditPasswordChange = (e) => {
  //   setEditPswrd((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const handleEditPasswordClick = (group) => {
  //   setEditPswrd({ id: Number(group.id), password: group.password });
  //   onOpenPopover3();
  // };
  // // const navigate = useNavigate();
  // const [isDelOpen, setIsDelOpen] = useState(false);
  // const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  // const cancelRef = useRef();

  // useEffect(() => {
  //   fetchData(groupId);
  //   getGroups();
  // }, [fetchData, groupId, getGroups]);

  // const handleEdit = async (e) => {
  //   e.preventDefault();
  //   if (editData.name.trim() === "") {
  //     toast({
  //       position: "top",
  //       duration: 2000,
  //       isClosable: true,
  //       status: "error",
  //       title: "Empty!",
  //       description: "Input shouldn't be empty",
  //     });
  //     return;
  //   }
  //   try {
  //     await editStudent(editData, editData.id);
  //     toast({
  //       position: "top",
  //       duration: 5000,
  //       isClosable: true,
  //       status: "success",
  //       title: "Edited!",
  //       description: "The student successfully edited",
  //     });
  //     setEditData({
  //       id: null,
  //       name: "",
  //       first_month: "",
  //       second_month: "",
  //       group_id: groupId,
  //     });
  //     onClosePopover2();
  //   } catch (error) {
  //     console.log("Edit error: ", error);
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (inputData.name.trim() === "") {
  //     toast({
  //       position: "top",
  //       duration: 2000,
  //       isClosable: true,
  //       status: "error",
  //       title: "Empty!",
  //       description: "Input shouldn't be empty",
  //     });
  //     setInputData({
  //       id: null,
  //       name: "",
  //       first_month: "false", // Set to the default value
  //       second_month: "false",
  //       group_id: groupId,
  //     });
  //   } else {
  //     try {
  //       await postData(inputData);
  //     } catch (error) {
  //       console.log("Big error:", error);
  //     }
  //     toast({
  //       position: "top",
  //       duration: 5000,
  //       isClosable: true,
  //       status: "success",
  //       title: "Added!",
  //       description: "New student successfully added",
  //     });

  //     setInputData({
  //       id: null,
  //       name: "",
  //       first_month: "false",
  //       second_month: "false",
  //       group_id: groupId,
  //     });
  //   }

  //   onClosePopover1();
  // };

  // const handleEditChange = (e) => {
  //   setEditData({ ...editData, [e.target.name]: e.target.value });
  // };

  // const handleEditClick = (student) => {
  //   onOpenPopover2();
  //   setEditData({
  //     id: student.id,
  //     name: student.name,
  //     first_month: student.first_month,
  //     second_month: student.second_month,
  //     group_id: groupId,
  //   });
  // };
  // const handleEditPopoverButton = (student) => {
  //   handleEditClick(student);
  //   onOpenPopover2();
  // };
  // const handleDeleteClick = (id) => {
  //   setStudentIdToDelete(id);
  //   setIsDelOpen(true);
  // };

  // const handleDeleteConfirm = async () => {
  //   if (studentIdToDelete !== null) {
  //     await deleteData(studentIdToDelete);
  //     setIsDelOpen(false);
  //     setStudentIdToDelete(null);
  //   }
  // };

  // const handleClose = () => {
  //   setIsDelOpen(false);
  //   setStudentIdToDelete(null);
  // };
  // const handleChange = (e) => {
  //   setInputData({ ...inputData, [e.target.name]: e.target.value });
  // };
  if (isLoading) return <div>Loading...</div>;
  console.log(data);

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
              {/* {students[0]?.group?.type !== "Kids" ? (
                <Link
                  className="px-5 py-1.5 max-sm:py-1 max-sm:px-3 max-sm:text-[1rem] rounded-md text-gray-200 text-xl font-medium bg-[#1E40AF]"
                  to={`/students/journals/${students[0]?.group?.type.toLowerCase()}/${groupId}`}
                >
                  Journals
                </Link>
              ) : (
                ""
                )} */}
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
              {/* <form className="grid gap-2" onSubmit={handleSubmit}>
                  <h1 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                    Student&apos;s Name
                  </h1>
                  <input
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={inputData.name}
                    onChange={handleChange}
                    placeholder="O'quvchining ismi..."
                    className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                  />
                  <h1 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                    1-month
                  </h1>
                  <select
                    name="first_month"
                    required
                    value={inputData.first_month}
                    onChange={handleChange}
                    className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                  >
                    <option value="true">Paid</option>
                    <option value="false">Unpaid</option>
                  </select>
                  <h1 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                    2-month
                  </h1>
                  <select
                    name="second_month"
                    required
                    value={inputData.second_month}
                    onChange={handleChange}
                    className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                  >
                    <option value="true">Paid</option>
                    <option value="false">Unpaid</option>
                  </select>
                  <button className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600">
                    Submit!
                  </button>
                </form> 
              */}
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-medium">
                Group in {data.groupName}
              </h1>
            </div>
            {/* {groupPassword && groupPassword[0]?.password && (
              <div className="flex justify-end items-center gap-4">
                <h1 className="text-xl font-medium">Password:</h1>
                <Popover
                  isOpen={isOpenPopover3}
                  onClose={onClosePopover3}
                  className="bg-gray-200 z-50"
                >
                  <PopoverTrigger>
                    <Button
                      className="px-5 py-1 rounded-xl bg-gray-200 text-blue-600 text-xl font-medium"
                      onClick={() =>
                        handleEditPasswordClick({
                          id: +groupId,
                          password: groupPassword[0]?.password,
                        })
                      }
                    >
                      {groupPassword[0]?.password}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-200 rounded-xl p-5 z-50">
                    <PopoverArrow />
                    <PopoverHeader className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
                      Edit password
                      <PopoverCloseButton />
                    </PopoverHeader>
                    <PopoverBody>
                      <form
                        className="grid gap-2"
                        onSubmit={handleEditPassword}
                      >
                        <h1 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                          Group&apos;s Password
                        </h1>
                        <input
                          name="password"
                          type="text"
                          autoComplete="off"
                          value={editPswrd.password}
                          onChange={handleEditPasswordChange}
                          placeholder="Enter password..."
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
            )} */}
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
                      className={`max-sm:text-xs  font-semibold rounded-full border py-1 px-3 max-sm:px-1.5 ${
                        student.first_month === "true"
                          ? "bg-gradient-to-r from-green-200 to-green-300 text-green-800 border-green-400 hover:from-green-300 hover:to-green-400 hover:text-green-900"
                          : "bg-gradient-to-r from-orange-200 to-orange-300 text-orange-800 border-orange-400 hover:from-orange-300 hover:to-orange-400 hover:text-orange-900"
                      }`}
                    >
                      {student?.first_month === "true" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 max-sm:px-[3px] py-4">
                    <span
                      className={`max-sm:text-xs  font-semibold rounded-full border py-1 px-3 max-sm:px-1.5 ${
                        student.second_month === "true"
                          ? "bg-gradient-to-r from-green-200 to-green-300 text-green-800 border-green-400 hover:from-green-300 hover:to-green-400 hover:text-green-900"
                          : "bg-gradient-to-r from-orange-200 to-orange-300 text-orange-800 border-orange-400 hover:from-orange-300 hover:to-orange-400 hover:text-orange-900"
                      }`}
                    >
                      {student?.second_month === "true" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 max-sm:px-[3px] py-4">
                    <div className="flex justify-center gap-2 max-sm:gap-0">
                      {/* <Popover
                        className="bg-gray-200"
                        isOpen={isOpenPopover2 && editData.id === student.id}
                        onClose={onClosePopover2}
                      >
                        <PopoverTrigger>
                          <Button
                            size={{ base: "xs", sm: "sm" }}
                            colorScheme="green"
                            className="max-sm:mr-[5px]"
                            onClick={() => handleEditPopoverButton(student)}
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
                                Student&apos;s Name
                              </h1>
                              <input
                                name="name"
                                type="text"
                                autoComplete="off"
                                value={editData.name}
                                onChange={handleEditChange}
                                placeholder="O'quvchining ismi..."
                                className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                              />
                              <h1 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                                1st month
                              </h1>
                              <select
                                name="first_month"
                                required
                                value={editData.first_month}
                                onChange={handleEditChange}
                                className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                              >
                                <option value="true">Paid</option>
                                <option value="false">Unpaid</option>
                              </select>
                              <h1 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                                2nd month
                              </h1>
                              <select
                                name="second_month"
                                required
                                value={editData.second_month}
                                onChange={handleEditChange}
                                className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                              >
                                <option value="true">Paid</option>
                                <option value="false">Unpaid</option>
                              </select>
                              <button
                                className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600"
                                onClick={onClosePopover2}
                              >
                                Save
                              </button>
                            </form>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover> */}
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

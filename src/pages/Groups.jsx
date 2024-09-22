import React, { useContext, useEffect, useRef, useState } from "react";
import { GroupContext } from "../context/GroupContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverTrigger,
  useToast,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
const GroupPage = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };
  const toast = useToast();
  const { state, getData, postData, deleteData, editGroup } =
    useContext(GroupContext);
  const [inputData, setInputData] = useState({ name: "" });
  const [groupIdToDelete, setgroupIdToDelete] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();
  const [editData, setEditData] = useState({
    id: null,
    name: "",
  });
  
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await editGroup(editData, editData.id);
      setEditData({ id: null, name: "" });
    } catch (error) {
      console.log("Edit error: ", error);
    }
    toast({
      position: "top",
      duration: 5000,
      isClosable: true,
      status: "success",
      title: "Edited!",
      description: "The group successfully edited",
    });
  };
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleEditClick = (group) => {
    setEditData({ id: group.id, name: group.name });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputData.name.trim() !== "") {
      try {
        await postData(inputData);
      } catch (err) {
        console.log("Big error: ", err);
      }
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "success",
        title: "Added!",
        description: "New group successfully added",
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
  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const handleDeleteClick = (id) => {
    setgroupIdToDelete(id);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    setgroupIdToDelete(null);
  };
  const handleDeleteConfirm = async () => {
    if (groupIdToDelete !== null) {
      await deleteData(groupIdToDelete);
      setIsOpen(false);
      setgroupIdToDelete(null);
    }
  };
  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div>
      <div className="flex justify-center items-start w-full h-screen">
        <div className="grid content-center justify-evenly">
          <div className="flex items-center justify-center">
            <button
              onClick={handleLogOut}
              className="text-xl mt-16 text-white text-center cursor-pointer px-2 py-1 rounded-md bg-red-500 w-fit"
            >
              Log Out
            </button>
          </div>
          <h1 className="text-5xl text-blue-600 text-center font-bold mt-16 mb-12 max-sm:text-4xl">
            Choose the group
          </h1>
          <div className="grid justify-items-center content-center grid-cols-3 gap-5 max-md:grid-cols-2 max-[406px]:grid-cols-1">
            {state.map((group) => {
              return (
                <div className="flex cursor-pointer hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600 transition-all border-2 border-blue-600 max-sm:flex max-sm:justify-center rounded-xl bg-blue-600 max-[406px]:w-72 max-[406px]:justify-around">
                  <Link
                    to={`/students/${group.id}`}
                    key={group.id}
                    className="text-lg font-medium text-white py-5 pl-5 pr-4 max-md:pr-1.5 max-md:pl-2"
                  >
                    {group.name}
                  </Link>
                  <div className="flex gap-1 items-center pr-3 max-md:pr-1.5">
                    <Popover className="bg-gray-200">
                      <PopoverTrigger>
                        <Button
                          size={{ base: "xs", sm: "sm" }}
                          className="max-sm:mr-[5px]"
                          onClick={() => handleEditClick(group)}
                        >
                          <MdEdit />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="bg-gray-200 rounded-xl p-5 max-sm:mr-10">
                        <PopoverArrow />
                        <PopoverHeader className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
                          Edit Group
                          <PopoverCloseButton />
                        </PopoverHeader>
                        <PopoverBody>
                          <form className="grid gap-2" onSubmit={handleEdit}>
                            <h1 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                              Group's Name
                            </h1>
                            <input
                              name="name"
                              type="text"
                              value={editData?.name}
                              onChange={handleEditChange}
                              placeholder="Guruh nomi..."
                              className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                            />
                            <button className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600">
                              Save
                            </button>
                          </form>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                    <Button
                      size={{ base: "xs", sm: "sm" }}
                      onClick={() => handleDeleteClick(group.id)}
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </div>
              );
            })}
            <Popover className="bg-gray-200 z-50" closeOnEsc>
              <PopoverTrigger>
                <Button
                  size="xl"
                  className="cursor-pointer border-solid border-2 border-blue-600 px-5 py-3 max-sm:flex max-sm:justify-center rounded-xl bg-white"
                >
                  <h1 className="text-lg font-medium text-blue-600">
                    Add Group
                  </h1>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-gray-200 rounded-xl p-5 z-50">
                <PopoverArrow />
                <PopoverHeader className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
                  Guruh qo'shish
                  <PopoverCloseButton />
                </PopoverHeader>
                <PopoverBody>
                  <form className="grid gap-2" onSubmit={handleSubmit}>
                    <h1 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                      Group's Name
                    </h1>
                    <input
                      name="name"
                      type="text"
                      value={inputData.name}
                      onChange={handleChange}
                      placeholder="Guruh nomi..."
                      className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                    />
                    <button className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600">
                      Submit
                    </button>
                  </form>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Group
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this group? This action cannot be
              undone.
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

export default GroupPage;

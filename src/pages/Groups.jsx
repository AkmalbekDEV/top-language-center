import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
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
  const toast = useToast();
  const { state, getData, postData, deleteData, editGroup } =
    useContext(GroupContext);
  const [inputData, setInputData] = useState({ name: "" });
  const [groupIdToDelete, setGroupIdToDelete] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();
  const [editData, setEditData] = useState({ id: null, name: "" });

  const handleLogOut = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  }, [navigate]);

  const handleEdit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await editGroup(editData, editData.id);
        setEditData({ id: null, name: "" });
        toast({
          position: "top",
          duration: 5000,
          isClosable: true,
          status: "success",
          title: "Edited!",
          description: "The group was successfully edited",
        });
      } catch (error) {
        console.error("Edit error: ", error);
        toast({
          position: "top",
          duration: 5000,
          isClosable: true,
          status: "error",
          title: "Edit Failed",
          description: "There was an error editing the group",
        });
      }
    },
    [editData, editGroup, toast]
  );

  const handleEditChange = useCallback((e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleEditClick = useCallback((group) => {
    setEditData({ id: group.id, name: group.name });
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (inputData.name.trim() === "") {
        toast({
          position: "top",
          duration: 2000,
          isClosable: true,
          status: "error",
          title: "Empty!",
          description: "Input shouldn't be empty",
        });
        return;
      }

      try {
        await postData(inputData);
        setInputData({ name: "" });
        toast({
          position: "top",
          duration: 5000,
          isClosable: true,
          status: "success",
          title: "Added!",
          description: "New group successfully added",
        });
      } catch (err) {
        console.error("Add error: ", err);
        toast({
          position: "top",
          duration: 5000,
          isClosable: true,
          status: "error",
          title: "Add Failed",
          description: "There was an error adding the group",
        });
      }
    },
    [inputData, postData, toast]
  );

  const handleChange = useCallback((e) => {
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleDeleteClick = useCallback((id) => {
    setGroupIdToDelete(id);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setGroupIdToDelete(null);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (groupIdToDelete !== null) {
      try {
        await deleteData(groupIdToDelete);
        setIsOpen(false);
        setGroupIdToDelete(null);
        toast({
          position: "top",
          duration: 5000,
          isClosable: true,
          status: "success",
          title: "Deleted!",
          description: "The group was successfully deleted",
        });
      } catch (err) {
        console.error("Delete error: ", err);
        toast({
          position: "top",
          duration: 5000,
          isClosable: true,
          status: "error",
          title: "Delete Failed",
          description: "There was an error deleting the group",
        });
      }
    }
  }, [groupIdToDelete, deleteData, toast]);

  useEffect(() => {
    getData();
  }, [getData]);

  const groupItems = useMemo(
    () =>
      state.map((group) => (
        <div
          key={group.id}
          className="flex cursor-pointer w-[290px] items-center justify-between hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600 transition-all border-2 border-blue-600 max-[580px]:flex max-[580px]:justify-center rounded-xl bg-blue-600 max-[580px]:w-72 max-[580px]:justify-between"
        >
          <Link
            to={`/students/${group.id}`}
            className="text-lg font-medium text-white py-5 pl-[10px] pr-[3px] max-md:pr-[3px] max-md:pl-2"
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
                      Group&apos;s Name
                    </h1>
                    <input
                      name="name"
                      type="text"
                      value={editData?.name}
                      onChange={handleEditChange}
                      placeholder="Group name..."
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
      )),
    [
      state,
      handleEditClick,
      editData,
      handleEdit,
      handleEditChange,
      handleDeleteClick,
    ]
  );

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
          <div className="grid justify-items-center content-center grid-cols-3 gap-5 max-md:grid-cols-1 max-lg:grid-cols-2">
            {groupItems}
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
              <PopoverContent className="bg-gray-200 rounded-xl p-5">
                <PopoverArrow />
                <PopoverHeader className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
                  Add Group
                  <PopoverCloseButton />
                </PopoverHeader>
                <PopoverBody>
                  <form className="grid gap-2" onSubmit={handleSubmit}>
                    <h1 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                      Group&apos;s Name
                    </h1>
                    <input
                      name="name"
                      type="text"
                      value={inputData.name}
                      onChange={handleChange}
                      placeholder="Group name..."
                      className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                    />
                    <button className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600">
                      Save
                    </button>
                  </form>
                </PopoverBody>
              </PopoverContent>
            </Popover>
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
                    Are you sure you want to delete this group? This action
                    cannot be undone.
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={handleDeleteConfirm}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
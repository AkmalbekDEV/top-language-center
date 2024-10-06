import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback
} from "react";
import { GroupContext } from "../context/GroupContext";
import { Link, useNavigate } from "react-router-dom";
import {
  useToast,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure
} from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import PopoverComponent from "../components/ui/Popover";

const GroupPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { state, getData, postData, deleteData, editGroup } =
    useContext(GroupContext);
  const [inputData, setInputData] = useState({
    id: null,
    name: "",
    type: "Standard"
  });
  const [groupIdToDelete, setGroupIdToDelete] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();
  const [editData, setEditData] = useState({ id: null, name: "", type: "" });
  const {
    isOpen: isOpenPopover1,
    onOpen: onOpenPopover1,
    onClose: onClosePopover1
  } = useDisclosure();

  const {
    isOpen: isOpenPopover2,
    onOpen: onOpenPopover2,
    onClose: onClosePopover2
  } = useDisclosure();

  const handleLogOut = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  }, [navigate]);

  const handleEdit = useCallback(
    async (e) => {
      e.preventDefault();
      if (editData.name.trim() === "") {
        toast({
          position: "top",
          duration: 2000,
          isClosable: true,
          status: "error",
          title: "Empty!",
          description: "Input shouldn't be empty"
        });
        return;
      }
      try {
        await editGroup(editData, editData.id);
        setEditData({ id: null, name: "", type: "Standard" });
        toast({
          position: "top",
          duration: 5000,
          isClosable: true,
          status: "success",
          title: "Edited!",
          description: "The group was successfully edited"
        });
      } catch (error) {
        console.error("Edit error: ", error);
        toast({
          position: "top",
          duration: 5000,
          isClosable: true,
          status: "error",
          title: "Edit Failed",
          description: "There was an error editing the group"
        });
      }
      onClosePopover2();
    },
    [editData, editGroup, onClosePopover2, toast]
  );

  const handleEditChange = useCallback((e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleEditClick = useCallback(
    (group) => {
      onOpenPopover2();
      setEditData({ id: group.id, name: group.name, type: group.type });
    },
    [onOpenPopover2]
  );

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
          description: "Input shouldn't be empty"
        });
        return;
      }

      try {
        await postData(inputData);
        setInputData({ id: null, name: "", type: "Standard" });
        toast({
          position: "top",
          duration: 5000,
          isClosable: true,
          status: "success",
          title: "Added!",
          description: "New group successfully added"
        });
      } catch (err) {
        console.error("Add error: ", err);
        toast({
          position: "top",
          duration: 5000,
          isClosable: true,
          status: "error",
          title: "Add Failed",
          description: "There was an error adding the group"
        });
      }
      onClosePopover1();
    },
    [inputData, postData, toast, onClosePopover1]
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
          description: "The group was successfully deleted"
        });
      } catch (err) {
        console.error("Delete error: ", err);
        toast({
          position: "top",
          duration: 5000,
          isClosable: true,
          status: "error",
          title: "Delete Failed",
          description: "There was an error deleting the group"
        });
      }
    }
  }, [groupIdToDelete, deleteData, toast]);

  useEffect(() => {
    getData();
  }, [getData]);
  console.log(editData)
  const groupItems = useMemo(
    () =>
      state.map((group) => (
        <div
          key={group.id}
          className="flex cursor-pointer w-[290px] items-center justify-between hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600 transition-all border-2 border-blue-600 max-[580px]:flex max-[580px]:justify-center rounded-xl bg-blue-600 max-[580px]:w-72 max-[580px]:justify-between"
        >
          <Link
            to={`/students/${group.id}`}
            className="w-[100%] text-lg font-medium text-white py-5 pl-[10px] pr-[3px] max-md:pr-[3px] max-md:pl-2"
          >
            {group.name}
          </Link>
          <div className="flex gap-1 items-center pr-3 max-md:pr-1.5">
            <PopoverComponent
              trigger={
                <Button
                  size={{ base: "xs", sm: "sm" }}
                  className="max-sm:mr-[5px]"
                  onClick={() => handleEditClick(group)}
                >
                  <MdEdit />
                </Button>
              }
              header="Edit Group"
              isOpen={isOpenPopover2 && editData.id === group.id}
              onClose={onClosePopover2}
            >
              <form className="grid gap-2" onSubmit={handleEdit}>
                <h1 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                  Group&apos;s Name
                </h1>
                <input
                  name="name"
                  type="text"
                  value={editData.name}
                  onChange={handleEditChange}
                  placeholder="Group name..."
                  className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                />
                <label className="text-2xl mt-2 font-medium text-blue-600 text-center">
                  Type
                </label>
                <select
                  name="type"
                  value={editData.type}
                  onChange={handleEditChange}
                  required
                  className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                >
                  <option value="Standard">Standard</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Top">Top</option>
                  <option value="Kids">Kids</option>
                </select>
                <button
                  className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600"
                  onClick={onClosePopover2}
                >
                  Save
                </button>
              </form>
            </PopoverComponent>
            <Button
              size={{ base: "xs", sm: "sm" }}
              onClick={() => handleDeleteClick(group.id)}
            >
              <MdDelete />
            </Button>
          </div>
        </div>
      )),
    [state, isOpenPopover2, editData.id, editData.name, editData.type, onClosePopover2, handleEdit, handleEditChange, handleEditClick, handleDeleteClick]
  );
  return (
    <div>
      <marquee className="bg-black text-white">
        This page is in test mode. Sorry if there are any bugs
      </marquee>
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
            <PopoverComponent
              trigger={
                <Button
                  size="xl"
                  className="cursor-pointer border-solid border-2 border-blue-600 px-5 py-3 max-sm:flex max-sm:justify-center rounded-xl bg-white"
                  onClick={onOpenPopover1}
                >
                  <h1 className="text-lg font-medium text-blue-600">
                    Add Group
                  </h1>
                </Button>
              }
              header="Add Group"
              isOpen={isOpenPopover1}
              onClose={onClosePopover1}
            >
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
                <label className="text-2xl mt-2 font-medium text-blue-600 text-center">
                  Type
                </label>
                <select
                  name="type"
                  value={inputData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                >
                  <option value="Standard">Standard</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Top">Top</option>
                  <option value="Kids">Kids</option>
                </select>
                <button className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600">
                  Save
                </button>
              </form>
            </PopoverComponent>
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

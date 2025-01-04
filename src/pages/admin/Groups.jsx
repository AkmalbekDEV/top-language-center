import React, { useCallback, useState } from "react";
import { useGroupsManager } from "../../queries/GroupManager";
import { Link, useNavigate } from "react-router-dom";
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
import { MdDelete, MdEdit } from "react-icons/md";
import PopoverComponent from "../../components/ui/Popover";
import AddGroupForm from "../../components/ui/form/groups/AddGroupForm";
import EditGroupModal from "../../components/ui/form/groups/EditGroupModal";

const GroupPage = () => {
  const navigate = useNavigate();
  const { useGroups, useDeleteGroup } = useGroupsManager();
  const { data: groups, isLoading, error } = useGroups();
  const [editingGroup, setEditingGroup] = useState(null);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const toast = useToast();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const cancelRef = React.useRef();
  const deleteGroup = useDeleteGroup();

  const handleDelete = async () => {
    if (!groupToDelete) return;

    try {
      await deleteGroup.mutateAsync(groupToDelete.id);
      onDeleteClose();
      setGroupToDelete(null);
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "success",
        title: "Deleted!",
        description: "The group and its students successfully deleted",
      });
    } catch (error) {
      console.error("Delete group error:", error);
    }
  };
  console.log(groupToDelete);
  const handleDeleteClick = (group) => {
    setGroupToDelete(group);
    onDeleteOpen();
  };

  const handleLogOut = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  }, [navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const GroupItems = () =>
    groups?.map((group) => (
      <div
        key={group.id}
        className="flex cursor-pointer w-[290px] items-center justify-between hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600 transition-all border-2 border-blue-600 max-[580px]:flex rounded-xl bg-blue-600 max-[580px]:w-72 max-[580px]:justify-between"
      >
        {editingGroup && (
          <EditGroupModal
            group={editingGroup}
            onClose={() => setEditingGroup(null)}
          />
        )}
        <Link
          to={`/group/${group.id}/students`}
          className="w-[100%] text-lg font-medium cursor-pointer text-white py-5 pl-[10px] pr-[3px] max-md:pr-[3px] max-md:pl-2"
        >
          {group.name}
        </Link>
        <div className="flex gap-1 items-center pr-3 max-md:pr-1.5">
          <Button
            size={{ base: "xs", sm: "sm" }}
            className="max-sm:mr-[5px]"
            onClick={() => setEditingGroup(group)}
          >
            <MdEdit />
          </Button>
          <Button
            size={{ base: "xs", sm: "sm" }}
            className="max-sm:mr-[5px]"
            onClick={() => handleDeleteClick(group)}
          >
            <MdDelete />
          </Button>
        </div>
      </div>
    ));

  return (
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
          <GroupItems />
          <PopoverComponent
            trigger={
              <Button
                size="xl"
                className="cursor-pointer border-solid border-2 border-blue-600 px-5 py-3 max-sm:flex max-sm:justify-center rounded-xl bg-white"
              >
                <h1 className="text-lg font-medium text-blue-600">Add Group</h1>
              </Button>
            }
            header="Add Group"
          >
            <AddGroupForm />
          </PopoverComponent>

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
                  Are you sure you want to delete {groupToDelete?.name}? This
                  action cannot be undone.
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
    </div>
  );
};

export default GroupPage;

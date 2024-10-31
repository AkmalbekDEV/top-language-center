import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useToast,
} from "@chakra-ui/react";
import TextInput from "./TextInput";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import FocusLock from "react-focus-lock";
import { MdEdit } from "react-icons/md";

const TopForm = ({ editJournal, firstFieldRef, onCancel, data }) => {
  const { groupType, id, weekId } = useParams();
  const [journalType, setJournalType] = useState("");
  const toast = useToast();
  useEffect(() => {
    if (groupType === "standard") {
      setJournalType("0");
    } else if (groupType === "advanced") {
      setJournalType("1");
    } else if (groupType === "top") {
      setJournalType("2");
    }
  }, [groupType, setJournalType]);

  const [topEditInputData, setTopEditInputData] = useState({
    id: null,
    name: "",
    group_id: id,
    journal_week_id: weekId,
    listening: "",
    reading: "",
    writing: "",
    speaking: "",
  });

  const topHandleEdit = async (e) => {
    e.preventDefault();
    if (topEditInputData.name.trim() === "") {
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
      await editJournal(
        journalType,
        topEditInputData,
        topEditInputData.id
      );
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "success",
        title: "Edited!",
        description: "The student successfully edited",
      });
      return;
    } catch (err) {
      console.log("Edit error: ", err);
      toast({
        position: "top",
        duration: 2000,
        isClosable: true,
        status: "error",
        title: "Error!",
        description: "There was an error while editing the student",
      });
    }
  };

  const topHandleEditClick = (student) => {
    setTopEditInputData({
      id: student.id,
      name: student.name,
      group_id: id,
      journal_week_id: weekId,
      listening: student.listening,
      reading: student.reading,
      writing: student.writing,
      speaking: student.speaking,
    });
  };

  const topHandleEditChange = (e) => {
    setTopEditInputData({
      ...topEditInputData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <PopoverTrigger>
        <IconButton
          size="sm"
          icon={<MdEdit />}
          onClick={() => topHandleEditClick(data)}
        />
      </PopoverTrigger>
      <PopoverContent p={5}>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Box>
            <form onSubmit={topHandleEdit}>
              <TextInput
                label="Student's name:"
                name="name"
                autoComplete="off"
                value={topEditInputData.name}
                onChange={topHandleEditChange}
                ref={firstFieldRef}
              />
              <TextInput
                label="Listening:"
                name="listening"
                autoComplete="off"
                value={topEditInputData.listening}
                onChange={topHandleEditChange}
              />
              <TextInput
                label="Reading:"
                name="reading"
                autoComplete="off"
                value={topEditInputData.reading}
                onChange={topHandleEditChange}
              />
              <TextInput
                label="Writing:"
                name="writing"
                autoComplete="off"
                value={topEditInputData.writing}
                onChange={topHandleEditChange}
              />
              <TextInput
                label="Speaking:"
                name="speaking"
                autoComplete="off"
                value={topEditInputData.speaking}
                onChange={topHandleEditChange}
              />
              <ButtonGroup
                display="flex"
                marginTop="20px"
                justifyContent="flex-end"
              >
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                  <Button type="submit" colorScheme="blue">Submit!</Button>
              </ButtonGroup>
            </form>
          </Box>
        </FocusLock>
      </PopoverContent>
    </>
  );
};

TopForm.propTypes = {
  editJournal: PropTypes.func,
  firstFieldRef: PropTypes.object,
  onCancel: PropTypes.func,
  data: PropTypes.any,
};

export default TopForm;
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
import SelectInput from "./SelectInput";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import FocusLock from "react-focus-lock";
import { MdEdit } from "react-icons/md";

const StandardForm = ({ editJournal, firstFieldRef, onCancel, data }) => {
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

  const [standardEditInputData, setStandardEditInputData] = useState({
    id: null,
    name: "",
    group_id: id,
    journal_week_id: weekId,
    listening: "",
    reading: "",
    listening2: "",
    reading2: "",
    vocabulary: "",
    grammar: "",
    writing: "",
    vocabulary_homework: "",
  });

  const standardHandleEdit = async (e) => {
    e.preventDefault();
    if (standardEditInputData.name.trim() === "") {
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
        standardEditInputData,
        standardEditInputData.id
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

  const standardHandleEditClick = (student) => {
    setStandardEditInputData({
      id: student.id,
      name: student.name,
      group_id: id,
      journal_week_id: weekId,
      listening: student.listening,
      reading: student.reading,
      listening2: student.listening2,
      reading2: student.reading2,
      vocabulary: student.vocabulary,
      grammar: student.grammar,
      writing: student.writing,
      vocabulary_homework: student.vocabulary_homework,
    });
  };

  const standardHandleEditChange = (e) => {
    setStandardEditInputData({
      ...standardEditInputData,
      [e.target.name]: e.target.value,
    });
  };

  const selectOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
    { value: "-", label: "-" },
  ];

  return (
    <>
      <PopoverTrigger>
        <IconButton
          size="sm"
          icon={<MdEdit />}
          onClick={() => standardHandleEditClick(data)}
        />
      </PopoverTrigger>
      <PopoverContent p={5}>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Box>
            <form onSubmit={standardHandleEdit}>
              <TextInput
                label="Student's name:"
                name="name"
                autoComplete="off"
                value={standardEditInputData.name}
                onChange={standardHandleEditChange}
                ref={firstFieldRef}
              />
              <SelectInput
                label="Listening:"
                name="listening"
                value={standardEditInputData.listening}
                onChange={standardHandleEditChange}
                options={selectOptions}
              />
              <SelectInput
                label="Listening (opt):"
                name="listening2"
                value={standardEditInputData.listening2}
                onChange={standardHandleEditChange}
                options={selectOptions}
              />
              <SelectInput
                label="Reading:"
                name="reading"
                value={standardEditInputData.reading}
                onChange={standardHandleEditChange}
                options={selectOptions}
              />
              <SelectInput
                label="Reading (opt):"
                name="reading2"
                value={standardEditInputData.reading2}
                onChange={standardHandleEditChange}
                options={selectOptions}
              />
              <TextInput
                label="Vocabulary:"
                name="vocabulary"
                autoComplete="off"
                value={standardEditInputData.vocabulary}
                onChange={standardHandleEditChange}
              />
              <SelectInput
                label="Grammar:"
                name="grammar"
                value={standardEditInputData.grammar}
                onChange={standardHandleEditChange}
                options={selectOptions}
              />
              <SelectInput
                label="Writing:"
                name="writing"
                value={standardEditInputData.writing}
                onChange={standardHandleEditChange}
                options={selectOptions}
              />
              <SelectInput
                label="Vocabulary (HW):"
                name="vocabulary_homework"
                value={standardEditInputData.vocabulary_homework}
                onChange={standardHandleEditChange}
                options={selectOptions}
              />
              <ButtonGroup
                display="flex"
                marginTop="20px"
                justifyContent="flex-end"
              >
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue">
                  Submit!
                </Button>
              </ButtonGroup>
            </form>
          </Box>
        </FocusLock>
      </PopoverContent>
    </>
  );
};

StandardForm.propTypes = {
  editJournal: PropTypes.func,
  firstFieldRef: PropTypes.object,
  onCancel: PropTypes.func,
  data: PropTypes.any,
};

export default StandardForm;

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
import { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import FocusLock from "react-focus-lock";
import { MdEdit } from "react-icons/md";

const AdvancedForm = ({ editJournal, firstFieldRef, onCancel, data }) => {
  const searchParams = new URLSearchParams(location.search);
  const typeValue = searchParams.get("type");
  const {weekId, groupId} = useParams();
  const toast = useToast();

  const [advancedEditInputData, setAdvancedEditInputData] = useState({
    id: null,
    name: "",
    group_id: groupId,
    journal_week_id: weekId,
    listening: "",
    reading: "",
    vocabulary: "",
    listeningHW: "",
    readingHW: "",
    grammar: "",
    writing: "",
  });

  const advancedHandleEdit = async (e) => {
    e.preventDefault();
    if (advancedEditInputData.name.trim() === "") {
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
      await editJournal.mutateAsync({
        journalType: typeValue,
        journalId: advancedEditInputData.id,
        updateData: advancedEditInputData,
      });
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

  const advancedHandleEditClick = (student) => {
    setAdvancedEditInputData({
      id: student.id,
      name: student.name,
      group_id: groupId,
      journal_week_id: weekId,
      listening: student.listening,
      reading: student.reading,
      vocabulary: student.vocabulary,
      listeningHW: student.listeningHW,
      readingHW: student.readingHW,
      grammar: student.grammar,
      writing: student.writing,
    });
  };

  const advancedHandleEditChange = (e) => {
    setAdvancedEditInputData({
      ...advancedEditInputData,
      [e.target.name]: e.target.value,
    });
  };

  const selectOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
    { value: "-", label: "-" },
  ];

  const selectVocabOptions = [
    { value: "No", label: "Failed" },
    { value: "Yes", label: "Passed" },
  ];

  return (
    <>
      <PopoverTrigger>
        <IconButton
          size="sm"
          icon={<MdEdit />}
          onClick={() => advancedHandleEditClick(data)}
        />
      </PopoverTrigger>
      <PopoverContent p={5}>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Box>
            <form onSubmit={advancedHandleEdit}>
              <TextInput
                label="Student's name:"
                name="name"
                autoComplete="off"
                value={advancedEditInputData.name}
                onChange={advancedHandleEditChange}
                ref={firstFieldRef}
              />
              <TextInput
                label="Listening:"
                name="listening"
                autoComplete="off"
                value={advancedEditInputData.listening}
                onChange={advancedHandleEditChange}
              />
              <TextInput
                label="Reading:"
                name="reading"
                autoComplete="off"
                value={advancedEditInputData.reading}
                onChange={advancedHandleEditChange}
              />
              <SelectInput
                label="Vocabulary:"
                name="vocabulary"
                value={advancedEditInputData.vocabulary}
                onChange={advancedHandleEditChange}
                options={selectVocabOptions}
              />
              <SelectInput
                label="Listening (HW):"
                name="listeningHW"
                value={advancedEditInputData.listeningHW}
                onChange={advancedHandleEditChange}
                options={selectOptions}
              />
              <SelectInput
                label="Reading (HW):"
                name="readingHW"
                value={advancedEditInputData.readingHW}
                onChange={advancedHandleEditChange}
                options={selectOptions}
              />
              <SelectInput
                label="Grammar:"
                name="grammar"
                value={advancedEditInputData.grammar}
                onChange={advancedHandleEditChange}
                options={selectOptions}
              />
              <SelectInput
                label="Writing:"
                name="writing"
                value={advancedEditInputData.writing}
                onChange={advancedHandleEditChange}
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
                <Button colorScheme="blue" type="submit">
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

AdvancedForm.propTypes = {
  editJournal: PropTypes.object,
  firstFieldRef: PropTypes.object,
  onCancel: PropTypes.func,
  data: PropTypes.any,
};

export default AdvancedForm;

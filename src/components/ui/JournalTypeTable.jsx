import PropTypes from "prop-types";
import {
  advancedJournalTableJson,
  standardJournalTableJson,
  topJournalTableJson,
} from "../../data/journalTableJson";
import JournalTableComponent from "./Table";
import { useContext, useEffect, useState } from "react";
import { JournalContext } from "../../context/journals/JournalContext";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import PopoverComponent from "./Popover";
import { Button } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import { TableSpan } from "./TableSpan";
import { calculateAverage } from "../../utils/functions";
import PopoverForm from "./form/PopoverForm.jsx";

function JournalTableTypeBody({ data, students }) {
  const groupTypeJson = students?.students[0]?.group?.type; // Check data structure

  let chosenType;
  if (groupTypeJson === "Standard") {
    chosenType = standardJournalTableJson;
  } else if (groupTypeJson === "Advanced") {
    chosenType = advancedJournalTableJson;
  } else if (groupTypeJson === "Top") {
    chosenType = topJournalTableJson;
  }

  const { editJournal } = useContext(JournalContext);
  const { groupType, id, weekId } = useParams();
  const [journalType, setJournalType] = useState("");
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
    vocabulary: "",
    grammar: "",
    writing: "",
    vocabulary_homework: "",
  });
  const [advancedEditInputData, setAdvancedEditInputData] = useState({
    id: null,
    name: "",
    group_id: id,
    journal_week_id: weekId,
    listening: "",
    reading: "",
    vocabulary: "",
    listeningHW: "",
    readingHW: "",
    grammar: "",
    writing: "",
  });
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

  console.log(groupType);
  const toast = useToast();
  const failedToast = () =>
    toast({
      position: "top",
      duration: 2000,
      isClosable: true,
      status: "error",
      title: "Empty!",
      description: "Input shouldn't be empty",
    });
  const successToast = () =>
    toast({
      position: "top",
      duration: 5000,
      isClosable: true,
      status: "success",
      title: "Added!",
      description: "The student successfully edited",
    });
  const errorToast = () =>
    toast({
      position: "top",
      duration: 2000,
      isClosable: true,
      status: "error",
      title: "Error!",
      description: "There was an error while editing the student",
    });

  const standardHandleEdit = async (e) => {
    e.preventDefault();
    if (standardEditInputData.name.trim() === "") {
      failedToast();
      return;
    }
    try {
      await editJournal(
        journalType,
        standardEditInputData,
        standardEditInputData.id
      );
      successToast();
      return;
    } catch (err) {
      console.log("Edit error: ", err);
    }
  };
  const advancedHandleEdit = async (e) => {
    e.preventDefault();
    if (advancedEditInputData.name.trim() === "") {
      failedToast();
      return;
    }
    try {
      await editJournal(
        journalType,
        advancedEditInputData,
        advancedEditInputData.id
      );
      successToast();
      return;
    } catch (err) {
      console.log("Edit error: ", err);
    }
  };
  const topHandleEdit = async (e) => {
    e.preventDefault();

    if (topEditInputData.name.trim() === "") {
      failedToast();
      return;
    } else {
      try {
        await editJournal(journalType, topEditInputData, topEditInputData.id);
        successToast();
        return;
      } catch (error) {
        console.log("Big error:", error);
        errorToast();
      }
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
  const advancedHandleEditClick = (student) => {
    setAdvancedEditInputData({
      id: student.id,
      name: student.name,
      group_id: id,
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
    <JournalTableComponent header={chosenType}>
      {data.journals && data.journals.length > 0 ? (
        data?.journals?.map((journal, index) => {
          const uniqueId = `${index + 1}`;
          const overallAverage = calculateAverage(
            journal?.listening,
            journal?.reading,
            journal?.writing,
            journal?.speaking
          );
          return groupType === "standard" ? (
            <tr
              key={journal.id}
              className="border-b-2 border-blue-500 text-lg font-medium max-sm:text-base"
            >
              <td className="whitespace-nowrap px-6 max-sm:ml-[3px] max-sm:px-3 py-4 font-medium max-sm:text-sm">
                {uniqueId}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.name || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.listening} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.reading} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.listening2} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.reading2} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.vocabulary || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.grammar} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.writing} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
              <TableSpan data={journal?.vocabulary_homework} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] py-4">
                <PopoverForm editJournal={editJournal} data={journal}/>
                <div className="flex justify-center gap-2 max-sm:gap-0">
                  <PopoverComponent
                    trigger={
                      <Button
                        size={{ base: "xs", sm: "sm" }}
                        className="max-sm:mr-[5px]"
                        onClick={() => standardHandleEditClick(journal)}
                      >
                        <MdEdit />
                      </Button>
                    }
                    header="Edit Group"
                  >
                    <form className="grid gap-2" onSubmit={standardHandleEdit}>
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Student&apos;s Name
                      </h3>
                      <input
                        name="name"
                        type="text"
                        value={standardEditInputData.name}
                        onChange={standardHandleEditChange}
                        placeholder="O'quvchining ismi..."
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      />
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Listening
                      </h3>
                      <select
                        name="listening"
                        required
                        value={standardEditInputData.listening}
                        onChange={standardHandleEditChange}
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="-">-</option>
                      </select>
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Reading
                      </h3>
                      <select
                        name="reading"
                        required
                        value={standardEditInputData.reading}
                        onChange={standardHandleEditChange}
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="-">-</option>
                      </select>
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Vocabulary
                      </h3>
                      <input
                        name="vocabulary"
                        type="text"
                        value={standardEditInputData.vocabulary}
                        onChange={standardHandleEditChange}
                        placeholder="Vocabulary..."
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      />
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Grammar
                      </h3>
                      <select
                        name="grammar"
                        required
                        value={standardEditInputData.grammar}
                        onChange={standardHandleEditChange}
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="-">-</option>
                      </select>
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Writing
                      </h3>
                      <select
                        name="writing"
                        required
                        value={standardEditInputData.writing}
                        onChange={standardHandleEditChange}
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="-">-</option>
                      </select>
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Vocabulary (HW)
                      </h3>
                      <select
                        name="vocabulary_homework"
                        required
                        value={standardEditInputData.vocabulary_homework}
                        onChange={standardHandleEditChange}
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="-">-</option>
                      </select>
                      <button className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600">
                        Submit!
                      </button>
                    </form>
                  </PopoverComponent>
                  <Button size={{ base: "xs", sm: "sm" }}>
                    <MdDelete />
                  </Button>
                </div>
              </td>
            </tr>
          ) : groupType === "advanced" ? (
            <tr
              key={journal.id}
              className="border-b-2 border-blue-500 text-lg font-medium max-sm:text-base"
            >
              <td className="whitespace-nowrap px-6 max-sm:ml-[3px] max-sm:px-3 py-4 font-medium max-sm:text-sm">
                {uniqueId}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.name || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.listening || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.reading || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.vocabulary || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.listeningHW} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.readingHW} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.grammar} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.writing} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] py-4">
                <div className="flex justify-center gap-2 max-sm:gap-0">
                  <PopoverComponent
                    trigger={
                      <Button
                        size={{ base: "xs", sm: "sm" }}
                        className="max-sm:mr-[5px]"
                        onClick={() => advancedHandleEditClick(journal)}
                      >
                        <MdEdit />
                      </Button>
                    }
                    header="Edit Group"
                  >
                    <form className="grid gap-2" onSubmit={advancedHandleEdit}>
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Student&apos;s Name
                      </h3>
                      <input
                        name="name"
                        type="text"
                        value={advancedEditInputData.name}
                        onChange={advancedHandleEditChange}
                        placeholder="O'quvchining ismi..."
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      />
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Listening
                      </h3>
                      <input
                        name="listening"
                        type="text"
                        value={advancedEditInputData.listening}
                        onChange={advancedHandleEditChange}
                        placeholder="Listening..."
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      />
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Reading
                      </h3>
                      <input
                        name="reading"
                        type="text"
                        value={advancedEditInputData.reading}
                        onChange={advancedHandleEditChange}
                        placeholder="Reading..."
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      />
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Vocabulary
                      </h3>
                      <input
                        name="vocabulary"
                        type="text"
                        value={advancedEditInputData.vocabulary}
                        onChange={advancedHandleEditChange}
                        placeholder="Vocabulary..."
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      />
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Listening (HW)
                      </h3>
                      <select
                        name="listeningHW"
                        required
                        value={advancedEditInputData.listeningHW}
                        onChange={advancedHandleEditChange}
                        className=" w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="-">-</option>
                      </select>
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Reading (HW)
                      </h3>
                      <select
                        name="readingHW"
                        required
                        value={advancedEditInputData.readingHW}
                        onChange={advancedHandleEditChange}
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="-">-</option>
                      </select>
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Grammar
                      </h3>
                      <select
                        name="grammar"
                        required
                        value={advancedEditInputData.grammar}
                        onChange={advancedHandleEditChange}
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="-">-</option>
                      </select>
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Writing
                      </h3>
                      <select
                        name="writing"
                        required
                        value={advancedEditInputData.writing}
                        onChange={advancedHandleEditChange}
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="-">-</option>
                      </select>
                      <button className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600">
                        Submit!
                      </button>
                    </form>
                  </PopoverComponent>
                  <Button size={{ base: "xs", sm: "sm" }}>
                    <MdDelete />
                  </Button>
                </div>
              </td>
            </tr>
          ) : groupType === "top" ? (
            <tr
              key={journal.id}
              className="border-b-2 border-blue-500 text-lg font-medium max-sm:text-base"
            >
              <td className="whitespace-nowrap px-6 max-sm:ml-[3px] max-sm:px-3 py-4 font-medium max-sm:text-sm">
                {uniqueId}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.name || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.listening || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.reading || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.writing || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.speaking || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {overallAverage || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] py-4">
                <div className="flex justify-center gap-2 max-sm:gap-0">
                  <PopoverComponent
                    trigger={
                      <Button
                        size={{ base: "xs", sm: "sm" }}
                        className="max-sm:mr-[5px]"
                        onClick={() => topHandleEditClick(journal)}
                      >
                        <MdEdit />
                      </Button>
                    }
                    header="Edit Group"
                  >
                    <form className="grid gap-2" onSubmit={topHandleEdit}>
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Student&apos;s Name
                      </h3>
                      <input
                        name="name"
                        type="text"
                        value={topEditInputData.name}
                        onChange={topHandleEditChange}
                        placeholder="O'quvchining ismi..."
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      />
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Listening
                      </h3>
                      <input
                        name="listening"
                        type="number"
                        value={topEditInputData.listening}
                        onChange={topHandleEditChange}
                        placeholder="Listening..."
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      />
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Reading
                      </h3>
                      <input
                        name="reading"
                        type="number"
                        value={topEditInputData.reading}
                        onChange={topHandleEditChange}
                        placeholder="Reading..."
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      />
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Writing
                      </h3>
                      <input
                        name="writing"
                        type="number"
                        value={topEditInputData.writing}
                        onChange={topHandleEditChange}
                        placeholder="Writing..."
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      />
                      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                        Speaking
                      </h3>
                      <input
                        name="speaking"
                        type="number"
                        value={topEditInputData.speaking}
                        onChange={topHandleEditChange}
                        placeholder="Speaking..."
                        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                      />
                      <button className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600">
                        Submit!
                      </button>
                    </form>
                  </PopoverComponent>
                  <Button size={{ base: "xs", sm: "sm" }}>
                    <MdDelete />
                  </Button>
                </div>
              </td>
            </tr>
          ) : (
            ""
          );
        })
      ) : (
        <tr>
          <td colSpan="8" className="text-center py-4">
            No journals available
          </td>
        </tr>
      )}
    </JournalTableComponent>
  );
}

JournalTableTypeBody.propTypes = {
  data: PropTypes.any,
  students: PropTypes.any,
};

export default JournalTableTypeBody;

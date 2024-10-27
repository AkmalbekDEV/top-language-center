import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JournalContext } from "../../context/journals/JournalContext";
import { useToast } from "@chakra-ui/react";

const JournalForm = ({ students }) => {
  const { postJournal } = useContext(JournalContext);
  const { groupType, id, weekId } = useParams();
  const [journalType, setJournalType] = useState("");
  const [standardInputData, setStandardInputData] = useState({
    id: null,
    name: "",
    group_id: id,
    journal_week_id: weekId,
    listening: "No",
    listening2: "No",
    reading: "No",
    reading2: "No",
    vocabulary: "",
    grammar: "No",
    writing: "No",
    vocabulary_homework: "No",
  });
  const [advancedInputData, setAdvancedInputData] = useState({
    id: null,
    name: "",
    group_id: id,
    journal_week_id: weekId,
    listening: "",
    reading: "",
    vocabulary: "",
    listeningHW: "No",
    readingHW: "No",
    grammar: "No",
    writing: "No",
  });
  const [topInputData, setTopInputData] = useState({
    id: null,
    name: "",
    group_id: id,
    journal_week_id: weekId,
    listening: "",
    reading: "",
    writing: "",
    speaking: "",
  });

  useEffect(() => {
    if (groupType === "standard") {
      setJournalType("0");
    } else if (groupType === "advanced") {
      setJournalType("1");
    } else if (groupType === "top") {
      setJournalType("2");
    }
  }, [groupType, setJournalType]);

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
      description: "New student successfully added",
    });
  const errorToast = () =>
    toast({
      position: "top",
      duration: 2000,
      isClosable: true,
      status: "error",
      title: "Error!",
      description: "There was an error adding the student",
    });

  const standardHandleSubmit = async (e) => {
    e.preventDefault();

    if (
      standardInputData.name.trim() === "" ||
      standardInputData.vocabulary.trim() === ""
    ) {
      failedToast();
      return;
    } else {
      try {
        await postJournal(journalType, standardInputData);
        successToast();
        return;
      } catch (error) {
        console.log("Big error:", error);
        errorToast();
      }
    }
  };
  const advancedHandleSubmit = async (e) => {
    e.preventDefault();

    if (
      advancedInputData.name.trim() === "" ||
      advancedInputData.listening.trim() === "" ||
      advancedInputData.reading.trim() === "" ||
      advancedInputData.vocabulary.trim() === ""
    ) {
      failedToast();
      return;
    } else {
      try {
        await postJournal(journalType, advancedInputData);
        successToast();
        return;
      } catch (error) {
        console.log("Big error:", error);
        errorToast();
      }
    }
  };
  const topHandleSubmit = async (e) => {
    e.preventDefault();

    if (
      topInputData.name.trim() === "" ||
      topInputData.listening.trim() === "" ||
      topInputData.reading.trim() === "" ||
      topInputData.writing.trim() === "" ||
      topInputData.speaking.trim() === ""
    ) {
      failedToast();
      return;
    } else {
      try {
        await postJournal(journalType, topInputData);
        successToast();
        return;
      } catch (error) {
        console.log("Big error:", error);
        errorToast();
      }
    }
  };

  const standardHandleChange = (e) => {
    setStandardInputData({
      ...standardInputData,
      [e.target.name]: e.target.value,
    });
  };
  const advancedHandleChange = (e) => {
    setAdvancedInputData({
      ...advancedInputData,
      [e.target.name]: e.target.value,
    });
  };
  const topHandleChange = (e) => {
    setTopInputData({
      ...topInputData,
      [e.target.name]: e.target.value,
    });
  };

  const journal_type = students?.students[0]?.group?.type;
  return journal_type === "Standard" ? (
    <form className="grid gap-2" onSubmit={standardHandleSubmit}>
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Student&apos;s Name
      </h3>
      <input
        name="name"
        type="text"
        value={standardInputData.name}
        onChange={standardHandleChange}
        placeholder="O'quvchining ismi..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Listening
      </h3>
      <select
        name="listening"
        required
        value={standardInputData.listening}
        onChange={standardHandleChange}
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
        <option value="-">-</option>
      </select>
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Listening (opt)
      </h3>
      <select
        name="listening2"
        required
        value={standardInputData.listening2}
        onChange={standardHandleChange}
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
        value={standardInputData.reading}
        onChange={standardHandleChange}
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
        <option value="-">-</option>
      </select>
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Reading (opt)
      </h3>
      <select
        name="reading2"
        required
        value={standardInputData.reading2}
        onChange={standardHandleChange}
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
        value={standardInputData.vocabulary}
        onChange={standardHandleChange}
        placeholder="Vocabulary..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Grammar
      </h3>
      <select
        name="grammar"
        required
        value={standardInputData.grammar}
        onChange={standardHandleChange}
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
        value={standardInputData.writing}
        onChange={standardHandleChange}
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
        value={standardInputData.vocabulary_homework}
        onChange={standardHandleChange}
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
  ) : journal_type === "Advanced" ? (
    <form className="grid gap-2" onSubmit={advancedHandleSubmit}>
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Student&apos;s Name
      </h3>
      <input
        name="name"
        type="text"
        value={advancedInputData.name}
        onChange={advancedHandleChange}
        placeholder="O'quvchining ismi..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Listening
      </h3>
      <input
        name="listening"
        type="text"
        value={advancedInputData.listening}
        onChange={advancedHandleChange}
        placeholder="Listening..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Reading
      </h3>
      <input
        name="reading"
        type="text"
        value={advancedInputData.reading}
        onChange={advancedHandleChange}
        placeholder="Reading..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Vocabulary
      </h3>
      <input
        name="vocabulary"
        type="text"
        value={advancedInputData.vocabulary}
        onChange={advancedHandleChange}
        placeholder="Vocabulary..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Listening (HW)
      </h3>
      <select
        name="listeningHW"
        required
        value={advancedInputData.listeningHW}
        onChange={advancedHandleChange}
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
        value={advancedInputData.readingHW}
        onChange={advancedHandleChange}
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
        value={advancedInputData.grammar}
        onChange={advancedHandleChange}
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
        value={advancedInputData.writing}
        onChange={advancedHandleChange}
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
  ) : journal_type === "Top" ? (
    <form className="grid gap-2" onSubmit={topHandleSubmit}>
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Student&apos;s Name
      </h3>
      <input
        name="name"
        type="text"
        value={topInputData.name}
        onChange={topHandleChange}
        placeholder="O'quvchining ismi..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Listening
      </h3>
      <input
        name="listening"
        type="number"
        value={topInputData.listening}
        onChange={topHandleChange}
        placeholder="Listening..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Reading
      </h3>
      <input
        name="reading"
        type="number"
        value={topInputData.reading}
        onChange={topHandleChange}
        placeholder="Reading..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Writing
      </h3>
      <input
        name="writing"
        type="number"
        value={topInputData.writing}
        onChange={topHandleChange}
        placeholder="Writing..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Speaking
      </h3>
      <input
        name="speaking"
        type="number"
        value={topInputData.speaking}
        onChange={topHandleChange}
        placeholder="Speaking..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <button className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600">
        Submit!
      </button>
    </form>
  ) : (
    "Something went wrong"
  );
};

JournalForm.propTypes = {
  students: PropTypes.any,
};

export default JournalForm;

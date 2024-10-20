import { useToast } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JournalContext } from "../../context/journals/JournalContext";

const JournalForm = ({ students }) => {
  const { postJournal } = useContext(JournalContext);
  const { groupType, id, weekId } = useParams();
  const toast = useToast();
  const [journalType, setJournalType] = useState("");
  const [standardInputData, setStandardInputData] = useState({
    id: null,
    name: "",
    group_id: id,
    journal_week_id: weekId,
    listening: "No",
    reading: "No",
    vocabulary: "",
    grammar: "No",
    writing: "No",
    vocabulary_homework: "No",
  });
  // const [advancedInputData, setAdvancedInputData] = useState({
  //   id: null,
  //   name: "",
  //   group_id: id,
  //   journal_week_id: weekId,
  //   listening: "",
  //   reading: "",
  //   vocabulary: "",
  //   listeningHW: "",
  //   readingHW: "",
  //   grammar: "",
  //   writing: "",
  // });
  // const [topInputData, setTopInputData] = useState({
  //   id: null,
  //   name: "",
  //   group_id: id,
  //   journal_week_id: weekId,
  //   listening: "",
  //   reading: "",
  //   writing: "",
  //   speaking: "",
  // });
  useEffect(() => {
    if (groupType === "standard") {
      setJournalType("0");
    } else if (groupType === "advanced") {
      setJournalType("1");
    } else if (groupType === "top") {
      setJournalType("2");
    }
  }, [groupType, setJournalType]);

  console.log(journalType);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Function to check if all values are empty
    const areAllValuesEmpty = (obj) => {
      return Object.values(obj).every(
        (value) => value === null || value === ""
      );
    };

    if (areAllValuesEmpty(journalType, standardInputData)) {
      toast({
        position: "top",
        duration: 2000,
        isClosable: true,
        status: "error",
        title: "Empty!",
        description: "Input shouldn't be empty",
      });
      setStandardInputData({
        id: null,
        name: "",
        group_id: id,
        journal_week_id: weekId,
        listening: "",
        reading: "", // Set to the default value
        vocabulary: "",
        grammar: "",
        writing: "",
        vocabulary_homework: "",
      });
    } else {
      try {
        await postJournal(journalType, standardInputData); // Post the data
        toast({
          position: "top",
          duration: 5000,
          isClosable: true,
          status: "success",
          title: "Added!",
          description: "New student successfully added",
        });
        setStandardInputData({
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
      } catch (error) {
        console.log("Big error:", error);
        toast({
          position: "top",
          duration: 5000,
          isClosable: true,
          status: "error",
          title: "Error!",
          description: "There was an error adding the student",
        });
      }
    }
  };

  const handleChange = (e) => {
    setStandardInputData({
      ...standardInputData,
      [e.target.name]: e.target.value,
    });
  };

  const journal_type = students?.students[0]?.group?.type;
  return journal_type === "Standard" ? (
    <form className="grid gap-2" onSubmit={handleSubmit}>
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Student&apos;s Name
      </h3>
      <input
        name="name"
        type="text"
        value={standardInputData.name}
        onChange={handleChange}
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
        onChange={handleChange}
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
        onChange={handleChange}
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
        onChange={handleChange}
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
        onChange={handleChange}
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
        onChange={handleChange}
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
        onChange={handleChange}
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
    <form className="grid gap-2">
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Student&apos;s Name
      </h3>
      <input
        name="name"
        type="text"
        placeholder="O'quvchining ismi..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Listening
      </h3>
      <input
        name="listening"
        type="text"
        placeholder="Listening..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Reading
      </h3>
      <input
        name="reading"
        type="text"
        placeholder="Reading..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Vocabulary
      </h3>
      <input
        name="vocabulary"
        type="text"
        placeholder="Vocabulary..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Listening (HW)
      </h3>
      <select
        name="listeningHW"
        required
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
    <form className="grid gap-2">
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Student&apos;s Name
      </h3>
      <input
        name="name"
        type="text"
        placeholder="O'quvchining ismi..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Listening
      </h3>
      <input
        name="listening"
        type="number"
        placeholder="Listening..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Reading
      </h3>
      <input
        name="reading"
        type="number"
        placeholder="Reading..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Writing
      </h3>
      <input
        name="writing"
        type="number"
        placeholder="Writing..."
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      />
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Speaking
      </h3>
      <input
        name="speaking"
        type="number"
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

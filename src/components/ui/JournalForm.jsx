import PropTypes from "prop-types";

function JournalForm({ students }) {
  const groupType = students?.students[0]?.group?.type;
  return groupType === "Standard" ? (
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
      <select
        name="listening"
        required
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
        <option value="not">-</option>
      </select>
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Reading
      </h3>
      <select
        name="reading"
        required
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
        <option value="not">-</option>
      </select>
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
        Writing
      </h3>
      <select
        name="writing"
        required
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
        <option value="not">-</option>
      </select>
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Vocabulary (HW)
      </h3>
      <select
        name="vocabularyHW"
        required
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
        <option value="not">-</option>
      </select>
      <button className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600">
        Submit!
      </button>
    </form>
  ) : groupType === "Advanced" ? (
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
        <option value="true">Yes</option>
        <option value="false">No</option>
        <option value="not">-</option>
      </select>
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Reading (HW)
      </h3>
      <select
        name="readingHW"
        required
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
        <option value="not">-</option>
      </select>
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Grammar
      </h3>
      <select
        name="grammar"
        required
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
        <option value="not">-</option>
      </select>
      <h3 className="text-2xl mt-2 font-medium text-blue-600 text-center">
        Writing
      </h3>
      <select
        name="writing"
        required
        className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
        <option value="not">-</option>
      </select>
      <button className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600">
        Submit!
      </button>
    </form>
  ) : groupType === "Top" ? (
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
}

JournalForm.propTypes = {
  students: PropTypes.any,
};

export default JournalForm;

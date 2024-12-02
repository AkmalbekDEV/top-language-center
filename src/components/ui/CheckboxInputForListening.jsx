import { useState, useContext } from "react";
import { Check, X, Circle } from "lucide-react";
import { JournalContext } from "../../context/journals/JournalContext";

const CustomCheckbox = ({ name, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleInitialClick = () => {
    if (value === "true" || value === "not") {
      onValueChange(false);
    } else {
      setIsOpen(true);
    }
  };
  const handleOptionSelect = (selectedValue) => {
    onValueChange(selectedValue);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleInitialClick}
        className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 transition-colors flex items-center justify-center bg-white"
      >
        {value === "true" && (
          <div className="w-full h-full rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
        )}
        {value === "not" && (
          <div className="w-full h-full rounded-full bg-red-500 flex items-center justify-center">
            <X className="w-5 h-5 text-white" />
          </div>
        )}
        {value === "false" && <Circle className="w-5 h-5 text-gray-300" />}
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleOptionSelect("true")}
        className="w-8 h-8 rounded-full border-2 border-green-500 hover:bg-green-50 transition-colors flex items-center justify-center bg-white"
      >
        <div className="w-full h-full rounded-full bg-green-500 flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
      </button>
      <button
        onClick={() => handleOptionSelect("not")}
        className="w-8 h-8 rounded-full border-2 border-red-500 hover:bg-red-50 transition-colors flex items-center justify-center bg-white"
      >
        <div className="w-full h-full rounded-full bg-red-500 flex items-center justify-center">
          <X className="w-5 h-5 text-white" />
        </div>
      </button>
    </div>
  );
};

const CheckboxInputForListening = ({
  journalId,
  listening_homework1,
  listening_homework2,
  listening_homework3,
  journalType,
}) => {
  const { editJournal } = useContext(JournalContext);

  const attendanceFields = [
    { name: "listening_homework1", value: listening_homework1 },
    { name: "listening_homework2", value: listening_homework2 },
    { name: "listening_homework3", value: listening_homework3 },
  ];

  const handleCheckboxChange = async (field, value) => {
    try {
      await editJournal(journalType, { [field]: value }, journalId);
      console.log(`Updated ${field} to`, value);
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
    }
  };

  return (
    <div className="flex gap-4 justify-center">
      {attendanceFields.map(({ name, value }) => (
        <CustomCheckbox
          key={name}
          name={name}
          value={value}
          onValueChange={(newValue) => handleCheckboxChange(name, newValue)}
        />
      ))}
    </div>
  );
};

export default CheckboxInputForListening;

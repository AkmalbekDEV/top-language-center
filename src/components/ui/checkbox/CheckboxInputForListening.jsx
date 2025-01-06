import { useState } from 'react';
import PropTypes from 'prop-types';
import { Check, X } from 'lucide-react';
import { useJournalManager } from '../../../queries/JournalManager';

const CustomCheckbox = ({ value = "false", onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleInitialClick = () => {
    if (value === 'true' || value === 'not') {
      onValueChange("false");
    } else {
      setIsOpen(true);
    }
  };

  const handleOptionSelect = selectedValue => {
    onValueChange(selectedValue);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleInitialClick}
        className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 transition-colors flex items-center justify-center bg-white"
      >
        {value === 'true' &&
          <div className="w-full h-full rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>}
        {value === 'not' &&
          <div className="w-full h-full rounded-full bg-red-500 flex items-center justify-center">
            <X className="w-5 h-5 text-white" />
          </div>}
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleOptionSelect('true')}
        className="w-8 h-8 rounded-full border-2 border-green-500 hover:bg-green-50 transition-colors flex items-center justify-center bg-white"
      >
        <div className="w-full h-full rounded-full bg-green-500 flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
      </button>
      <button
        onClick={() => handleOptionSelect('not')}
        className="w-8 h-8 rounded-full border-2 border-red-500 hover:bg-red-50 transition-colors flex items-center justify-center bg-white"
      >
        <div className="w-full h-full rounded-full bg-red-500 flex items-center justify-center">
          <X className="w-5 h-5 text-white" />
        </div>
      </button>
    </div>
  );
};

CustomCheckbox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onValueChange: PropTypes.func.isRequired,
};

const CheckboxInputForListening = ({
  journalId,
  listening_homework1,
  listening_homework2,
  listening_homework3,
  journalType,
}) => {
  const { useUpdateJournal } = useJournalManager();
  const editJournal = useUpdateJournal();

  const attendanceFields = [
    { name: 'listening_homework1', value: listening_homework1 },
    { name: 'listening_homework2', value: listening_homework2 },
    { name: 'listening_homework3', value: listening_homework3 },
  ];

  const handleCheckboxChange = async (field, value) => {
    if (!journalId) {
      console.error('Journal ID is missing');
      return;
    }
    try {
      await editJournal.mutateAsync({
        journalType,
        journalId,
        updateData: { [field]: value },
      });
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
          onValueChange={newValue => handleCheckboxChange(name, newValue)}
        />
      ))}
    </div>
  );
};

CheckboxInputForListening.propTypes = {
  journalId: PropTypes.string.isRequired,
  listening_homework1: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  listening_homework2: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  listening_homework3: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  journalType: PropTypes.string.isRequired,
};

export default CheckboxInputForListening;

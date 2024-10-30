import { Checkbox } from "@chakra-ui/react";
import { useContext } from "react";
import { JournalContext } from "../../context/journals/JournalContext";

const checkboxStyle = {
  "& .chakra-checkbox__control": {
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    border: "2px solid lightgray",
    backgroundColor: "white",
    transition: "border-color 0.2s",
  },
  "&.chakra-checkbox__control:hover": {
    borderColor: "blue",
  },
  '& .chakra-checkbox__control[aria-checked="true"]': {
    backgroundColor: "blue",
    borderColor: "blue",
  },
};

export const CheckboxInput = ({
  journalId,
  attendance1,
  attendance2,
  attendance3,
  journalType
}) => {
  const { editJournal } = useContext(JournalContext);

  const attendanceFields = [
    { name: "attendance1", value: attendance1 },
    { name: "attendance2", value: attendance2 },
    { name: "attendance3", value: attendance3 },
  ];

  const handleCheckboxChange = async (field, checked) => {
    try {
      await editJournal(
        journalType,
        { [field]: checked ? "true" : "false" },
        journalId
      );
      console.log(`Updated ${field} to`, checked ? "true" : "false");
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {attendanceFields.map(({ name, value }) => (
        <Checkbox
          key={name}
          sx={checkboxStyle}
          isChecked={value === "true"}
          size="lg"
          onChange={(e) => handleCheckboxChange(name, e.target.checked)}
        />
      ))}
    </div>
  );
};

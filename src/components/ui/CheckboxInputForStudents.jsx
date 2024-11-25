import { Checkbox } from "@chakra-ui/react";
import { Check, Circle, X } from "lucide-react";

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

const CustomCheckbox = ({ value }) => {
  return (
    <div className="flex gap-2">
      <button className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 transition-colors flex items-center justify-center bg-white">
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
    </div>
  );
};

export const CheckboxInputForStudents = ({
  attendance1,
  attendance2,
  attendance3,
}) => {
  const attendanceFields = [
    { name: "attendance1", value: attendance1 },
    { name: "attendance2", value: attendance2 },
    { name: "attendance3", value: attendance3 },
  ];
  return (
    <div className="flex gap-4 justify-center">
      {attendanceFields.map(({ name, value }) => (
        <CustomCheckbox key={name} value={value} />
      ))}
    </div>
  );
};

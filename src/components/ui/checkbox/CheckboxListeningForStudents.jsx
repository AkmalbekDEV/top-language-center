import { Check, X } from "lucide-react";

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
      </button>
    </div>
  );
};

export const CheckboxListeningForStudents = ({
  listening_homework1,
  listening_homework2,
  listening_homework3,
}) => {
  const attendanceFields = [
    { name: "listening_homework1", value: listening_homework1 },
    { name: "listening_homework2", value: listening_homework2 },
    { name: "listening_homework3", value: listening_homework3 },
  ];
  return (
    <div className="flex gap-4 justify-center">
      {attendanceFields.map(({ name, value }) => (
        <CustomCheckbox key={name} value={value} />
      ))}
    </div>
  );
};

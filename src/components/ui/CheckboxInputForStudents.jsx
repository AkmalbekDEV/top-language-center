import { Checkbox } from "@chakra-ui/react";

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

export const CheckboxInputForStudents = ({
  attendance1,
  attendance2,
  attendance3,
}) => {
  const attendanceFields = [attendance1, attendance2, attendance3]

  return (
    <div className="flex gap-2 justify-center">
      {attendanceFields.map((attendance, index) => (
        <Checkbox
          key={index}
          sx={checkboxStyle}
          isChecked={attendance === "true"}
          size="lg"
          // disabled
        />
      ))}
    </div>
  );
};

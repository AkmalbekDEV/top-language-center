import { Checkbox } from "@chakra-ui/react";

const checkboxStyle = {
  '& .chakra-checkbox__control': {
    borderRadius: '50%', // Makes the checkbox circular
    width: '30px',       // Adjust width as needed
    height: '30px',      // Adjust height as needed
    border: '2px solid lightgray',
    backgroundColor: "white",
    transition: 'border-color 0.2s'
  },
  '&.chakra-checkbox__control:hover': {
    borderColor: 'blue', // Change color on hover
  },
  '& .chakra-checkbox__control[aria-checked="true"]': {
    backgroundColor: 'blue', // Background color when checked
    borderColor: 'blue', // Same color for checked state
  },
};

export const CheckboxInput = ({ attendance1, attendance2, attendance3 }) => {
  const attendanceValues = [attendance1, attendance2, attendance3];

  return (
    <div className="flex gap-2 justify-center">
      {attendanceValues.map((attendance, index) => (
        <Checkbox
          key={index}
          sx={checkboxStyle}
          isChecked={attendance === "true"}
          size="lg"
          visibility="visible"
        />
      ))}
    </div>
  );
};
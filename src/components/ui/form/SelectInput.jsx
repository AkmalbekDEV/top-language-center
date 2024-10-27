import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

const SelectInput = React.forwardRef((props, ref) => {
  const { id, label, options } = props;

  return (
    <FormControl marginTop={3}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select ref={ref} id={id} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
});

SelectInput.displayName = "SelectInput";

SelectInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
};

export default SelectInput;

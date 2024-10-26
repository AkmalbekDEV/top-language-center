import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import PropTypes from "prop-types";

const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

TextInput.displayName = "TextInput"; // This helps to prevent warning while using React.forwardRef() and if there is a bug in the inspect the component shows this name which is written in the value of display name more precisely "TextInput" instead of forwardRef which improves readability

TextInput.propTypes = {
  id: PropTypes.number,
  label: PropTypes.string,
};

export default TextInput;

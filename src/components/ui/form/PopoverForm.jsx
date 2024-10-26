import { Box, Popover, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Form from "./StandardForm";
import PropTypes from "prop-types";

const PopoverForm = ({ editJournal, data }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <>
      <Box display="inline-block" mr={3}>
        Testing
      </Box>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={true}
      >
        <Form
          editJournal={editJournal}
          firstFieldRef={firstFieldRef}
          onCancel={onClose}
          data={data}
        />
      </Popover>
    </>
  );
};

PopoverForm.propTypes = {
  editJournal: PropTypes.func,
  data: PropTypes.any
};

export default PopoverForm;

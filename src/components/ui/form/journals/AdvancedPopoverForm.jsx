import { Popover, useDisclosure } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import AdvancedForm from "./AdvancedForm";

const AdvancedPopoverForm = ({ editJournal, data }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom"
        closeOnBlur={true}
      >
        <AdvancedForm
          editJournal={editJournal}
          firstFieldRef={firstFieldRef}
          onCancel={onClose}
          data={data}
        />
      </Popover>
    </>
  );
};

AdvancedPopoverForm.propTypes = {
  editJournal: PropTypes.func,
  data: PropTypes.any
};

export default AdvancedPopoverForm;

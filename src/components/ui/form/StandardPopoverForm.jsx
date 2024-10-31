import { Popover, useDisclosure } from "@chakra-ui/react";
import React from "react";
import StandardForm from "./StandardForm";
import PropTypes from "prop-types";

const StandardPopoverForm = ({ editJournal, data }) => {
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
        <StandardForm
          editJournal={editJournal}
          firstFieldRef={firstFieldRef}
          onCancel={onClose}
          data={data}
        />
      </Popover>
    </>
  );
};

StandardPopoverForm.propTypes = {
  editJournal: PropTypes.func,
  data: PropTypes.any
};

export default StandardPopoverForm;

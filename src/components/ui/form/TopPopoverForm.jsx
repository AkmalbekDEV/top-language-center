import { Popover, useDisclosure } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import TopForm from "./TopForm";

const TopPopoverForm = ({ editJournal, data }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={true}
      >
        <TopForm
          editJournal={editJournal}
          firstFieldRef={firstFieldRef}
          onCancel={onClose}
          data={data}
        />
      </Popover>
    </>
  );
};

TopPopoverForm.propTypes = {
  editJournal: PropTypes.func,
  data: PropTypes.any
};

export default TopPopoverForm;

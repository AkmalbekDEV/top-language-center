import {
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverTrigger
} from "@chakra-ui/react";
import PropTypes from "prop-types";

function PopoverComponent(props) {
  const {header, trigger, children, isOpen, onClose} = props
  return (
    <Popover isOpen={isOpen} onClose={onClose} className="bg-gray-200">
      <PopoverTrigger>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="bg-gray-200 rounded-xl p-5 max-sm:mr-10">
        <PopoverArrow />
        <PopoverHeader className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
          {header}
          <PopoverCloseButton />
        </PopoverHeader>
        <PopoverBody>
          {children}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

PopoverComponent.propTypes = {
  trigger: PropTypes.node.isRequired,
  header: PropTypes.string,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
}

export default PopoverComponent;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

const AdminPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(true);
  };
  return (
    <div>
      <div className="flex items-center justify-evenly w-full h-screen max-w-[1250px] mx-auto max-sm:px-5">
        <form className="w-full flex items-center justify-center flex-col gap-5">
          <InputGroup size="lg" w={{ base: "100%", md: "50%" }}>
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button colorScheme="blue" w={{ base: "30%", md: "8%" }}>
            Enter!
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;

import React, { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { SignJWT } from "jose";

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [text, setText] = useState("show");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_APP_ADMIN_PASSWORD;
    const hashedSecretKey = import.meta.env.VITE_APP_SECRET_KEY;
    const secretKey = new TextEncoder().encode(hashedSecretKey);
    console.log(password == correctPassword);
    console.log(
      "Given password" + password + " Real password:" + correctPassword
    );
    const alg = "HS256";
    if (password === correctPassword) {
      const token = await new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg })
        .setExpirationTime("2h")
        .sign(secretKey);
      console.log(token);

      localStorage.setItem("Token", token);
      // window.location.href = "/admin";
    } else {
      toast({
        title: "Incorrect Password!",
        description: "Please refill the password input and try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const handleToggle = () => {
    if (type === "password") {
      setText("Hide");
      setType("text");
    } else {
      setText("Show");
      setType("password");
    }
  };
  return (
    <div>
      <div className="flex items-center justify-evenly w-full h-screen max-w-[1250px] mx-auto max-sm:px-5">
        <form
          className="w-full flex items-center justify-center flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <InputGroup size="lg" w={{ base: "100%", md: "50%" }}>
            <Input
              pr="4.5rem"
              type={type}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleToggle}>
                {text}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            type="submit"
            colorScheme="blue"
            w={{ base: "30%", md: "8%" }}
          >
            Enter!
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;

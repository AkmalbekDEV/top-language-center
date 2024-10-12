import { useEffect, useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { SignJWT, jwtVerify } from "jose";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const StudentLogin = ({ groups }) => {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [text, setText] = useState("show");
  const toast = useToast();
  const navigate = useNavigate();

  const checkingEveryGroupPassword = groups.find(group => group.password === password)

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      const secretKey = new TextEncoder().encode(
        import.meta.env.VITE_APP_SECRET_KEY
      );
      if (token) {
        try {
          const { payload } = await jwtVerify(token, secretKey);

          if (payload.role === "student") {
            return navigate(`/student-groups/${checkingEveryGroupPassword.id}`);
          }
        } catch (err) {
          return err;
        }
      }
    };
    checkToken();
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // const correctPassword = import.meta.env.VITE_APP_ADMIN_PASSWORD;
    const hashedSecretKey = import.meta.env.VITE_APP_SECRET_KEY;
    const secretKey = new TextEncoder().encode(hashedSecretKey);
    if (checkingEveryGroupPassword) {
      const token = await new SignJWT({ role: "student" })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1d")
        .sign(secretKey);
      const refreshToken = await new SignJWT({ role: "student" })
        .setProtectedHeader({ alg: "HS256" })
        .sign(secretKey);

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      window.location.href = `/student-groups/${checkingEveryGroupPassword.id}`;
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
    <div className="w-full h-[100vh] flex flex-col items-center justify-center px-5">
      <h1 className="text-center text-5xl text-blue-600 font-bold mt-48 max-sm:text-4xl">
        Student Login
      </h1>
      <div className="flex-grow" />
      <form
        className="w-full flex items-center justify-center flex-col gap-5 mb-40"
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
      <div className="flex-grow" />
    </div>
  );
};

StudentLogin.propTypes = {
  groups: PropTypes.array
}

export default StudentLogin;

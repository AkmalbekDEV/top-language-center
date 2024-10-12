import { useEffect, useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { SignJWT, jwtVerify } from "jose";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [text, setText] = useState("show");
  const [adminClick, setAdminClick] = useState(false)
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      const secretKey = new TextEncoder().encode(
        import.meta.env.VITE_APP_SECRET_KEY
      );
      if (token) {
        try {
          const { payload } = await jwtVerify(token, secretKey);
          if (payload.role === "admin") {
            return navigate("/groups");
          }
        } catch (err) {
          return err;
        }
      }
    };
    checkToken();
  }, [navigate]);

  const handleAdminClick = () => {
    setAdminClick(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_APP_ADMIN_PASSWORD;
    const hashedSecretKey = import.meta.env.VITE_APP_SECRET_KEY;
    const secretKey = new TextEncoder().encode(hashedSecretKey);
    if (password === correctPassword) {
      const token = await new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1d")
        .sign(secretKey);
      const refreshToken = await new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .sign(secretKey);

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      window.location.href = "/groups";
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
        {
          adminClick ?
            <div className="w-full h-[100vh] flex flex-col items-center justify-center">
              <h1 className="text-center text-5xl text-blue-600 font-bold mt-48 max-sm:text-4xl">
                Admin Login
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
            :
            <div className="grid gap-5">
              <h1 className='text-4xl font-medium text-center text-blue-700'>Are you a Student or a Teacher?</h1>
              <div className='flex items-center justify-center gap-5'>
                <Link to="/student-login" className='transition-all px-5 py-2 rounded-xl bg-blue-700 text-white hover:shadow-md hover:shadow-blue-600 active:bg-blue-800'>Student</Link>
                <h1 className='text-2xl font-bold text-blue-700'>|</h1>
                <button onClick={handleAdminClick} className='transition-all px-5 py-2 rounded-xl bg-blue-700 text-white hover:shadow-md hover:shadow-blue-600 active:bg-blue-800'>Teacher</button>
              </div>
            </div>
        }
      </div>
    </div>
  );
};

export default LoginPage;

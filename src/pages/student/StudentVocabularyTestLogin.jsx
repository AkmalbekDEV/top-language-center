import { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { SignJWT } from "jose";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useJournalManager } from "../../queries/JournalManager";

const StudentVocabularyTestLogin = () => {

  const { useJournals } = useJournalManager();
  const searchParams = new URLSearchParams(location.search);
  const typeValue = searchParams.get("type");
  const { groupId, weekId } = useParams();
  console.log(groupId, weekId);

  const { data: journals } = useJournals(typeValue, groupId, weekId);

  const [username, setUsername] = useState("");
  const [type, setType] = useState("password");
  const [text, setText] = useState("show");
  const toast = useToast();

  const checkingEveryGroupUsername = journals?.journals?.find(journal => journal.login === username)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hashedSecretKey = import.meta.env.VITE_APP_SECRET_KEY;
    const secretKey = new TextEncoder().encode(hashedSecretKey);
    if (checkingEveryGroupUsername) {
      const testToken = await new SignJWT({
        role: `test${checkingEveryGroupUsername.login}`,
        name: checkingEveryGroupUsername.name,
        username: checkingEveryGroupUsername.login,
        userId: checkingEveryGroupUsername.id,
        groupId: groupId,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1d")
        .sign(secretKey);
      const refreshToken = await new SignJWT({ role: `test${checkingEveryGroupUsername.login}` })
        .setProtectedHeader({ alg: "HS256" })
        .sign(secretKey);

      localStorage.setItem("testToken", testToken);
      localStorage.setItem("refreshToken", refreshToken);
      window.location.href = `/student-groups/${groupId}/week/${weekId}/vocabulary/test?type=${typeValue}`;
    } else {
      toast({
        title: "There is no user with this username!",
        description: "Please refill the username input and try again",
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
        Vocabulary Login
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
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

StudentVocabularyTestLogin.propTypes = {
  groups: PropTypes.array
}

export default StudentVocabularyTestLogin;

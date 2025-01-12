import { Link, useParams } from "react-router-dom";
import { useJournalManager } from "../../queries/JournalManager"
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { jwtVerify } from "jose";
import { useStudentTestManager } from "../../queries/StudentVocabTestManager";
import { useVocabManager } from "../../queries/VocabTestManager";

const StudentVocabularyTest = () => {

  const [isClicked, setIsClicked] = useState(false);
  const [isOnceClicked, setIsOnceClicked] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("")

  useEffect(() => {
    const getUserDetails = async () => {
      const token = localStorage.getItem("testToken");
      const secretKey = new TextEncoder().encode(
        import.meta.env.VITE_APP_SECRET_KEY
      );

      try {
        const { payload } = await jwtVerify(token, secretKey);
        // Now you have access to all user details from the token
        setUserDetails({
          username: payload.username,
          name: payload.name,
          weekId: payload.weekId,
          userId: payload.userId,
          groupId: payload.groupId
        });
      } catch (err) {
        console.error('Error getting user details:', err);
      }
    };

    getUserDetails();
  }, []);

  const { useJournals, useJournalWeeks } = useJournalManager();
  const { useVocabTests } = useVocabManager();

  const searchParams = new URLSearchParams(location.search);
  const typeValue = searchParams.get("type");
  const { groupId, weekId } = useParams();

  const { data: tests } = useVocabTests(groupId, weekId);
  const { data: journals } = useJournals(typeValue, groupId, weekId);
  const { data: weeks } = useJournalWeeks(weekId);
  const selectedWeek = weeks?.find(week => week.week === weekId)
  const specificAccess = typeValue === "standard" ? "standardAccess" : typeValue === "advanced" ? "advancedAccess" : "topAccess";
  const toast = useToast();

  const { useAddStudentTest } = useStudentTestManager();
  const addStudent = useAddStudentTest();
  console.log(userDetails);

  const handleStartTest = async () => {
    try {
      setIsClicked(true);
      setIsOnceClicked(true);
      await addStudent.mutateAsync({
        weekRef: userDetails.weekId,
        studentId: userDetails.userId,
        studentLogin: userDetails.username,
        studentName: userDetails.name,
        score: `0/${tests.length}`,
        groupRef: userDetails.groupId,
        answers: {
          answer1: ""
        }
      });
      setIsClicked(false)
    } catch (error) {
      setError(error.message);
    }
  };

  if (selectedWeek?.[specificAccess] === false) {
    return "No available vocabularies"
  }
  console.log(isOnceClicked)

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {
        isOnceClicked ? <div>
          Wait until everyone is ready!
        </div> : <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-4xl font-bold mb-6">Are You Ready?</h1>
          <div className="flex space-x-4 gap-10">
            <button
              onClick={handleStartTest}
              disabled={isClicked}
              className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition ${isClicked ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                }`}
            >
              {isClicked ? "Redirecting..." : "Yes"}
            </button>
            <Link to={`/student-groups/${groupId}/week/${weekId}?type=${typeValue}`} className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition">No</Link>
          </div>
        </div>
      }
    </div>
  )
}

export default StudentVocabularyTest
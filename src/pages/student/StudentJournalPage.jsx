import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StudentContext } from "../../context/StudentsContext";
import { JournalContext } from "../../context/journals/JournalContext";
import StudentJournalTableBody from "./StudentJournalTableBody";

function StudentJournalPage() {
  const { journal, getJournals } = useContext(JournalContext);
  const { state, fetchData } = useContext(StudentContext);
  const { groupType, id, weekId } = useParams();
  const [journalType, setJournalType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getJournals(Number(journalType), id, weekId);
    fetchData(id);
  }, [getJournals, id, fetchData, weekId, journalType]);

  useEffect(() => {
    if (groupType === "standard") {
      setJournalType("0");
    } else if (groupType === "advanced") {
      setJournalType("1");
    } else if (groupType === "top") {
      setJournalType("2");
    } else {
      navigate("/404");
    }
  }, [setJournalType, navigate, groupType]);

  const backPathname =
    "/" + location.pathname.split("/").splice(1, 3).join("/");

  return (
    <div className="min-w-100 grid grid-rows-1">
      <div className="flex items-center justify-center max-sm:justify-between max-sm:flex-col-reverse pt-5">
        <div className="grid w-full gap-10">
          <div className="w-full flex justify-between">
            <Link
              className="px-6 py-1.5 rounded-md bg-[#EDF2F7] text-[#1A202C] text-xl font-semibold"
              to={backPathname}
            >
              Back
            </Link>
          </div>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-medium">Group in {state.groupName}</h1>
          </div>
        </div>
      </div>
      <div className="w-100">
        <StudentJournalTableBody data={journal} students={state} />
      </div>
    </div>
  );
}

export default StudentJournalPage;

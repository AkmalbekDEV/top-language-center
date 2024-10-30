import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StudentContext } from "../../context/StudentsContext";
import { JournalContext } from "../../context/journals/JournalContext";
import { Button } from "@chakra-ui/react";
import JournalTableTypeBody from "../../components/ui/JournalTypeTable";
import PopoverComponent from "../../components/ui/Popover";
import JournalForm from "../../components/ui/JournalForm";

function JournalPage() {
  const { journal, loading, error, getJournals } = useContext(JournalContext);
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
    "/" + location.pathname.split("/").splice(1, 4).join("/");

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
            <Link
              className="px-6 py-1.5 rounded-md text-gray-200 text-xl font-medium bg-[#1E40AF]"
              to={`/students/${id}`}
            >
              Students
            </Link>
            <PopoverComponent
              trigger={<Button>Add column</Button>}
              header="Adding Student"
            >
              <JournalForm students={state} />
            </PopoverComponent>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-medium">Group in {state.groupName}</h1>
          </div>
          <div className="text-center">
            {loading && (
              <span className="bg-blue-500 text-white p-3 rounded-3xl">Loading...</span>
            )}
            {error && "Error: " + error}
          </div>
        </div>
      </div>
      <div className="w-100">
        <JournalTableTypeBody data={journal} students={state} />
      </div>
    </div>
  );
}

export default JournalPage;

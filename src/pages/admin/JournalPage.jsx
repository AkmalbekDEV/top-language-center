import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StudentContext } from "../../context/StudentsContext";
import { JournalContext } from "../../context/journals/JournalContext";
import PopoverComponent from "../../components/ui/Popover";
import { Button } from "@chakra-ui/react";
import JournalTableTypeBody from "../../components/ui/JournalTypeTable";

function JournalPage() {
  const { journal, loading, error, getJournals } = useContext(JournalContext);
  const [journalType, setJournalType] = useState("");
  const { state, fetchData } = useContext(StudentContext);
  const { groupType, id, weekId } = useParams();
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

  console.log(journalType.toString());

  console.log(journal.journals);
  const backPathname =
    "/" + location.pathname.split("/").splice(1, 4).join("/");

  return (
    <div className="max-w-100">
      <marquee className="bg-black text-white">
        This page is in test mode. Sorry if there are any bugs
      </marquee>
      {loading && "Loading..."}
      {error && "Error: " + error}
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
              <form className="grid gap-2">
                <h1 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                  Student&apos;s Name
                </h1>
                <input
                  name="name"
                  type="text"
                  placeholder="O'quvchining ismi..."
                  className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                />
                <h1 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                  1st month
                </h1>
                <select
                  name="first_month"
                  required
                  className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                >
                  <option value="true">Paid</option>
                  <option value="false">Unpaid</option>
                </select>
                <h1 className="text-2xl mt-2 font-medium text-blue-600 text-center">
                  2nd month
                </h1>
                <select
                  name="second_month"
                  required
                  className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
                >
                  <option value="true">Paid</option>
                  <option value="false">Unpaid</option>
                </select>
                <button className="text-center text-lg rounded-xl hover:shadow-md hover:shadow-blue-500 transition-all active:bg-blue-700 font-medium text-white px-5 py-2 mt-5 bg-blue-600">
                  Submit!
                </button>
              </form>
            </PopoverComponent>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-medium">Group in {state.groupName}</h1>
          </div>
        </div>
      </div>
      <div className="w-100">
        <JournalTableTypeBody data={journal} />
      </div>
    </div>
  );
}

export default JournalPage;

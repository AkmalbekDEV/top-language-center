import { Link, useLocation, useParams } from "react-router-dom";
import StudentJournalTableBody from "./StudentJournalTableBody";
import { useJournalManager } from "../../queries/JournalManager";
import { useStudentsManager } from "../../queries/StudentsManager";

function StudentJournalPage() {
  const { groupId, weekId } = useParams();
  const { useJournals } = useJournalManager();
  const { useStudents } = useStudentsManager();
  const location = useLocation();
  const { data: students } = useStudents(groupId);
  // Parse the query string using URLSearchParams
  const searchParams = new URLSearchParams(location.search);

  // Get the value of the specific query parameter
  const typeValue = searchParams.get("type");

  const { data, isLoading } = useJournals(typeValue, groupId, weekId);
  console.log(data);

  if (isLoading) return <div>Loading journals...</div>;

  return (
    <div className="min-w-100 grid grid-rows-1">
      <div className="flex items-center justify-center max-sm:justify-between max-sm:flex-col-reverse pt-5">
        <div className="grid w-full gap-10">
          <div className="w-full flex justify-between">
            <Link
              className="px-6 py-1.5 rounded-md bg-[#EDF2F7] text-[#1A202C] text-xl font-semibold"
              to={`/student-groups/${groupId}?type=${students?.groupType}`}
            >
              Back
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-medium">
              Group in {students?.groupName}
            </h1>
          </div>
          <div className="text-center h-[50px]">
            {isLoading && (
              <span className="bg-blue-500 text-white p-3 rounded-3xl">
                Loading...
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="w-100">
        <StudentJournalTableBody
          data={data.journals}
        />
      </div>
    </div>
  );
}

export default StudentJournalPage;
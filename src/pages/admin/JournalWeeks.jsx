import { Link, useParams } from "react-router-dom";
import { useJournalManager } from "../../queries/JournalManager";
import { useStudentsManager } from "../../queries/StudentsManager";
import { useEffect, useState } from "react";

const JournalWeeks = () => {
  const { useStudents } = useStudentsManager();
  const { useJournalWeeks } = useJournalManager();
  const { groupId } = useParams();
  const [groupName, setGroupName] = useState("");

  const { data: students, isLoading: studentsLoading } = useStudents(groupId);
  const { data: weeks, isLoading: weeksLoading } = useJournalWeeks();

  useEffect(() => {
    if (students?.groupName) {
      setGroupName(students.groupName);
    }
  }, [students]);

  // Show loading state if either data is loading
  if (weeksLoading || studentsLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if(location.pathname.includes('student-groups')) {
    return (
      <div>
        {groupName && (
          <h1 className="text-5xl text-blue-600 text-center font-bold mt-16 mb-12 max-md:text-3xl">
            Journal Page in {groupName}
          </h1>
        )}
        <div className="grid justify-items-center content-center gap-3">
          {weeks?.map((number) => {
            // Construct the URL string directly
            const journalUrl = `/student-groups/${groupId}/week/${number.week}?type=${students?.groupType?.toLowerCase()}`;
  
            return (
              <Link
                key={number.id}
                className="flex cursor-pointer w-[250px] items-center justify-between hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600 transition-all border-2 border-blue-600 rounded-xl bg-blue-600"
                to={journalUrl}
              >
                <span className="w-full text-lg font-medium text-white py-3 text-center">
                  Week {number.week}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      {groupName && (
        <h1 className="text-5xl text-blue-600 text-center font-bold mt-16 mb-12 max-md:text-3xl">
          Journal Page in {groupName}
        </h1>
      )}
      <div className="grid justify-items-center content-center gap-3">
        {weeks?.map((number) => {
          // Construct the URL string directly
          const journalUrl = `/group/${groupId}/students/journals/${
            number.week
          }?type=${students?.groupType?.toLowerCase()}`;

          return (
            <Link
              key={number.id}
              className="flex cursor-pointer w-[250px] items-center justify-between hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600 transition-all border-2 border-blue-600 rounded-xl bg-blue-600"
              to={journalUrl}
            >
              <span className="w-full text-lg font-medium text-white py-3 text-center">
                Week {number.week}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default JournalWeeks;

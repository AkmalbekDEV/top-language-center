import { useEffect, useContext } from "react";
import { JournalContext } from "../../context/journals/JournalContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StudentContext } from "../../context/StudentsContext";

const JournalWeeks = () => {
    const { week, loading, error, getWeeks } =
    useContext(JournalContext);
    const { state, fetchData } = useContext(StudentContext);
    const { groupName } = state;
    const navigate = useNavigate()
    const { groupType, id } = useParams();
    
    useEffect(() => {
      fetchData(id);
      getWeeks();
    }, [getWeeks, fetchData, id]);

  useEffect(() => {
    if(groupType !== "standard" && groupType !== "advanced" && groupType !== "top") {
        navigate("/404")
    }
  }, [navigate, groupType])

    // let weeksType;

  // if (groupType === "standard") {
  //   weeksType = "0";
  // } else if (groupType === "advanced") {
  //   weeksType = "1";
  // } else if (groupType === "top") {
  //   weeksType = "2";
  // } else {
  //   useEffect(() => {
  //     navigate("/404");
  //   }, [navigate]); // Ensure navigate is called only once
  //   return null; // Prevent rendering anything before navigation
  // }

  // const checkGroup =
  // groups?.type === "Standard"
  // ? 0
  // : groups?.type === "Advanced"
  // ? 1
  // : groups?.type === "Top"
  // ? 2
  // : "Non existed";
  // console.log("GroupCheck: ", checkGroup);


  const currentPath = location.pathname;
  const newPath = (weekId) => `${currentPath}/week/${weekId}`;

  return (
    <div>
      <marquee className="bg-black text-white">
        This page is in test mode. Sorry if there are any bugs
      </marquee>
      {loading && "loading..."}
      {error && `Error: ${error}`}
      <h1 className="text-5xl text-blue-600 text-center font-bold mt-16 mb-12 max-md:text-3xl">{`Journal Page in ${groupName}`}</h1>
      <div className="grid justify-items-center content-center gap-3">
        {week.map((number) => (
          <div
            key={number.id}
            className="flex cursor-pointer w-[250px] items-center justify-between hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600 transition-all border-2 border-blue-600 rounded-xl bg-blue-600"
          >
            <Link
              to={newPath(number.id)}
              className="w-[100%] text-lg font-medium text-white py-3 text-center"
            >
              Week {number.week}
            </Link>
          </div>
        ))}
      </div>
      {/* {selectedGroup && (
        <div>
          <h2>Journals for Group ID: {selectedGroup}</h2>
          <button onClick={handleAddNewJournal}>Add New Journal</button>
          <ul>
            {filteredJournals.map(journal => (
              <li key={journal.id}>
                <button onClick={() => handleJournalClick(journal.id)}>Week: {journal.week}</button>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default JournalWeeks;
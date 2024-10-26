import PropTypes from "prop-types";
import {
  studentAdvancedJournalTableJson,
  studentStandardJournalTableJson,
  studentTopJournalTableJson
} from "../../data/journalTableJson";
import JournalTableComponent from "../../components/ui/Table"
import { TableSpan } from "../../components/ui/TableSpan";
import { calculateAverage } from "../../utils/functions";

function StudentJournalTableBody({ data, students }) {
  const groupType = students?.students[0]?.group?.type; // Check data structure

  let chosenType;
  if (groupType === "Standard") {
    chosenType = studentStandardJournalTableJson;
  } else if (groupType === "Advanced") {
    chosenType = studentAdvancedJournalTableJson;
  } else if (groupType === "Top") {
    chosenType = studentTopJournalTableJson;
  }

  return (
    <JournalTableComponent header={chosenType}>
      {data.journals && data.journals.length > 0 ? (
        data?.journals?.map((journal, index) => {
          const uniqueId = `${index + 1}`;
          const overallAverage = calculateAverage(journal?.listening, journal?.reading, journal?.writing, journal?.speaking);
          return groupType === "Standard" ? (
            <tr
              key={journal.id}
              className="border-b-2 border-blue-500 text-lg font-medium max-sm:text-base"
            >
              <td className="whitespace-nowrap px-6 max-sm:ml-[3px] max-sm:px-3 py-4 font-medium max-sm:text-sm">
                {uniqueId}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.name || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.listening}/>
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.reading}/>
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.listening2}/>
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.reading2}/>
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.vocabulary || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.grammar} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.writing}/>
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.vocabulary_homework}/>
              </td>
            </tr>
          ) : groupType === "Advanced" ? (
            <tr
              key={journal.id}
              className="border-b-2 border-blue-500 text-lg font-medium max-sm:text-base"
            >
              <td className="whitespace-nowrap px-6 max-sm:ml-[3px] max-sm:px-3 py-4 font-medium max-sm:text-sm">
                {uniqueId}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.name || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.listening || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.reading || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.vocabulary || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.listeningHW || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.readingHW || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.grammar || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.writing || "N/A"}
              </td>
            </tr>
          ) : groupType === "Top" ? (
            <tr
              key={journal.id}
              className="border-b-2 border-blue-500 text-lg font-medium max-sm:text-base"
            >
              <td className="whitespace-nowrap px-6 max-sm:ml-[3px] max-sm:px-3 py-4 font-medium max-sm:text-sm">
                {uniqueId}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.name || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.listening || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.reading || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.writing || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.speaking || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {overallAverage || "N/A"}
              </td>
            </tr>
          ) : (
            ""
          );
        })
      ) : (
        <tr>
          <td colSpan="8" className="text-center py-4">
            No journals available
          </td>
        </tr>
      )}
    </JournalTableComponent>
  );
}

StudentJournalTableBody.propTypes = {
  data: PropTypes.any,
  students: PropTypes.any,
};

export default StudentJournalTableBody;

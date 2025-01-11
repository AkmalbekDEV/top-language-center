import PropTypes from "prop-types";
import {
  studentAdvancedJournalTableJson,
  studentStandardJournalTableJson,
  studentTopJournalTableJson,
} from "../../data/journalTableJson";
import JournalTableComponent from "../../components/ui/Table";
import { TableSpan, TableVocabSpan } from "../../components/ui/custom";
import { calculateAverage } from "../../utils/functions";
import { CheckboxInputForStudents } from "../../components/ui/checkbox/CheckboxInputForStudents";
import { CheckboxListeningForStudents } from "../../components/ui/checkbox/CheckboxListeningForStudents";
import { CheckboxReadingForStudents } from "../../components/ui/checkbox/CheckboxReadingForStudents";

function StudentJournalTableBody({ data }) {
  // Parse the query string using URLSearchParams
  const searchParams = new URLSearchParams(location.search);

  // Get the value of the specific query parameter
  const typeValue = searchParams.get("type");

  let chosenType;
  if (typeValue === "standard") {
    chosenType = studentStandardJournalTableJson;
  } else if (typeValue === "advanced") {
    chosenType = studentAdvancedJournalTableJson;
  } else if (typeValue === "top") {
    chosenType = studentTopJournalTableJson;
  }

  return (
    <JournalTableComponent header={chosenType}>
      {data && data.length > 0 ? (
        data?.map((journal, index) => {
          const uniqueId = `${index + 1}`;
          const overallAverage = calculateAverage(
            journal?.listening,
            journal?.reading,
            journal?.writing,
            journal?.speaking
          );
          return typeValue === "standard" ? (
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
                {journal?.login || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <CheckboxInputForStudents
                  attendance1={journal?.attendance1}
                  attendance2={journal?.attendance2}
                  attendance3={journal?.attendance3}
                />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.listening} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.listening_reading} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.reading} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableVocabSpan data={journal?.vocabulary} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.grammar} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.writing} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.vocabulary_homework} />
              </td>
            </tr>
          ) : typeValue === "advanced" ? (
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
                {journal?.login || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <CheckboxInputForStudents
                  attendance1={journal?.attendance1}
                  attendance2={journal?.attendance2}
                  attendance3={journal?.attendance3}
                />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.listening || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.reading || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableVocabSpan data={journal?.vocabulary || "N/A"} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.listeningHW || "N/A"} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.readingHW || "N/A"} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.grammar || "N/A"} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.writing || "N/A"} />
              </td>
            </tr>
          ) : typeValue === "top" ? (
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
                {journal?.login || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <CheckboxInputForStudents
                  attendance1={journal?.attendance1}
                  attendance2={journal?.attendance2}
                  attendance3={journal?.attendance3}
                />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableVocabSpan data={journal?.vocab_result || "N/A"} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.vocab_homework || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <CheckboxListeningForStudents
                  listening_homework1={journal?.listening_homework1}
                  listening_homework2={journal?.listening_homework2}
                  listening_homework3={journal?.listening_homework3}
                  journalId={journal?.id}
                  journalType="top"
                />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <CheckboxReadingForStudents
                  reading_homework1={journal?.reading_homework1}
                  reading_homework2={journal?.reading_homework2}
                  reading_homework3={journal?.reading_homework3}
                  journalId={journal?.id}
                  journalType="top"
                />
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
          <td colSpan="11" className="text-center py-4">
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

import PropTypes from "prop-types";
import {
  advancedJournalTableJson,
  standardJournalTableJson,
  topJournalTableJson,
} from "../../data/journalTableJson";
import JournalTableComponent from "./Table";

function JournalTableTypeBody({ data, students }) {
  const groupType = students?.students[0]?.group?.type; // Check data structure

  let chosenType;
  if (groupType === "Standard") {
    chosenType = standardJournalTableJson;
  } else if (groupType === "Advanced") {
    chosenType = advancedJournalTableJson;
  } else if (groupType === "Top") {
    chosenType = topJournalTableJson;
  }

  return (
    <JournalTableComponent header={chosenType}>
      {data.journals && data.journals.length > 0 ? (
        data?.journals?.map((journal, index) => {
          const uniqueId = `${index + 1}`;
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
                {journal?.listening || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.reading || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.vocabulary || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.grammar || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.writing || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.vocabulary_homework || "N/A"}
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
                {journal?.overall || "N/A"}
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

JournalTableTypeBody.propTypes = {
  data: PropTypes.any,
  students: PropTypes.any,
};

export default JournalTableTypeBody;

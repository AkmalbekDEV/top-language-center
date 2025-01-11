import PropTypes from "prop-types";
import {
  advancedJournalTableJson,
  standardJournalTableJson,
  topJournalTableJson,
} from "../../data/journalTableJson";
import JournalTableComponent from "./Table.jsx";
import { Button } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { calculateAverage } from "../../utils/functions";
import PopoverForm from "./form/journals/StandardPopoverForm.jsx";
import TopPopoverForm from "./form/journals/TopPopoverForm.jsx";
import AdvancedPopoverForm from "./form/journals/AdvancedPopoverForm.jsx";
import CheckboxInput from "./checkbox/CheckoxInput.jsx";
import { TableSpan, TableVocabSpan } from "./custom";
import { useJournalManager } from "../../queries/JournalManager.jsx";
import CheckboxInputForListening from "./checkbox/CheckboxInputForListening.jsx";
import CheckboxInputForReading from "./checkbox/CheckboxForReading.jsx";

function JournalTableTypeBody({ data, handleDeleteClick }) {
  const searchParams = new URLSearchParams(location.search);
  const typeValue = searchParams.get("type");
  
  let chosenType;
  if (typeValue === "standard") {
    chosenType = standardJournalTableJson;
  } else if (typeValue === "advanced") {
    chosenType = advancedJournalTableJson;
  } else if (typeValue === "top") {
    chosenType = topJournalTableJson;
  }

  const {useUpdateJournal} = useJournalManager();
  const editJournal = useUpdateJournal();
  return (
    <JournalTableComponent header={chosenType}>
      {data && data.length > 0 ? (
        data.map((journal, index) => {
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
                <CheckboxInput
                  journalId={journal?.id}
                  attendance1={journal?.attendance1}
                  attendance2={journal?.attendance2}
                  attendance3={journal?.attendance3}
                  journalType="standard"
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
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] py-4">
                <div className="flex justify-center gap-2">
                  <PopoverForm editJournal={editJournal} data={journal} />
                  <Button
                    size="sm"
                    onClick={() => handleDeleteClick(journal?.id)}
                  >
                    <MdDelete />
                  </Button>
                </div>
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
                <CheckboxInput
                  attendance1={journal?.attendance1}
                  attendance2={journal?.attendance2}
                  attendance3={journal?.attendance3}
                  journalId={journal?.id}
                  journalType="advanced"
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
              <td className="whitespace-nowrap px-6 py-4 text-wrap">
                <TableSpan data={journal?.listeningHW} />
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-wrap">
                <TableSpan data={journal?.readingHW} />
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-wrap">
                <TableSpan data={journal?.grammar} />
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-wrap">
                <TableSpan data={journal?.writing} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] py-4">
                <div className="flex justify-center gap-2">
                  <AdvancedPopoverForm
                    editJournal={editJournal}
                    data={journal}
                  />
                  <Button
                    size="sm"
                    onClick={() => handleDeleteClick(journal?.id)}
                  >
                    <MdDelete />
                  </Button>
                </div>
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
                <CheckboxInput
                  attendance1={journal?.attendance1}
                  attendance2={journal?.attendance2}
                  attendance3={journal?.attendance3}
                  journalId={journal?.id}
                  journalType="top"
                />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableVocabSpan data={journal?.vocab_result || "N/A"} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.vocab_homework || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <CheckboxInputForListening
                  listening_homework1={journal?.listening_homework1}
                  listening_homework2={journal?.listening_homework2}
                  listening_homework3={journal?.listening_homework3}
                  journalId={journal?.id}
                  journalType="top"
                />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <CheckboxInputForReading
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
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] py-4">
                <div className="flex justify-center gap-2">
                  <TopPopoverForm editJournal={editJournal} data={journal} />
                  <Button
                    size="sm"
                    onClick={() => handleDeleteClick(journal?.id)}
                  >
                    <MdDelete />
                  </Button>
                </div>
              </td>
            </tr>
          ) : (
            ""
          );
        })
      ) : (
        <tr>
          <td colSpan="13" className="text-center py-4">
            No journals available
          </td>
        </tr>
      )}
    </JournalTableComponent>
  );
}

JournalTableTypeBody.propTypes = {
  data: PropTypes.any,
  handleDeleteClick: PropTypes.func,
};

export default JournalTableTypeBody;

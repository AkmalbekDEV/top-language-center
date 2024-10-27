import PropTypes from "prop-types";
import {
  advancedJournalTableJson,
  standardJournalTableJson,
  topJournalTableJson,
} from "../../data/journalTableJson";
import JournalTableComponent from "./Table";
import { useContext } from "react";
import { JournalContext } from "../../context/journals/JournalContext";
import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { TableSpan } from "./TableSpan";
import { calculateAverage } from "../../utils/functions";
import PopoverForm from "./form/StandardPopoverForm.jsx";
import TopPopoverForm from "./form/TopPopoverForm";
import AdvancedPopoverForm from "./form/AdvancedPopoverForm";

function JournalTableTypeBody({ data, students }) {
  const groupTypeJson = students?.students[0]?.group?.type; // Check data structure

  let chosenType;
  if (groupTypeJson === "Standard") {
    chosenType = standardJournalTableJson;
  } else if (groupTypeJson === "Advanced") {
    chosenType = advancedJournalTableJson;
  } else if (groupTypeJson === "Top") {
    chosenType = topJournalTableJson;
  }

  const { editJournal } = useContext(JournalContext);
  const { groupType, id, weekId } = useParams();

  return (
    <JournalTableComponent header={chosenType}>
      {data.journals && data.journals.length > 0 ? (
        data?.journals?.map((journal, index) => {
          const uniqueId = `${index + 1}`;
          const overallAverage = calculateAverage(
            journal?.listening,
            journal?.reading,
            journal?.writing,
            journal?.speaking
          );
          return groupType === "standard" ? (
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
                <TableSpan data={journal?.listening} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.listening2} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.reading} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.reading2} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                {journal?.vocabulary || "N/A"}
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
                <div className="flex justify-center gap-2 max-sm:gap-0">
                <PopoverForm editJournal={editJournal} data={journal} />
                  <Button size={{ base: "xs", sm: "sm" }}>
                    <MdDelete />
                  </Button>
                </div>
              </td>
            </tr>
          ) : groupType === "advanced" ? (
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
                <TableSpan data={journal?.listeningHW} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.readingHW} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.grammar} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] max-sm:text-sm py-4 text-wrap">
                <TableSpan data={journal?.writing} />
              </td>
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] py-4">
                <div className="flex justify-center gap-2 max-sm:gap-0">
                  <AdvancedPopoverForm editJournal={editJournal} data={journal}/>
                  <Button size={{ base: "xs", sm: "sm" }}>
                    <MdDelete />
                  </Button>
                </div>
              </td>
            </tr>
          ) : groupType === "top" ? (
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
              <td className="whitespace-nowrap px-6 max-sm:px-[3px] py-4">
                <div className="flex justify-center gap-2 max-sm:gap-0">
                  <TopPopoverForm editJournal={editJournal} data={journal}/>
                  <Button size={{ base: "xs", sm: "sm" }}>
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
import PropTypes from "prop-types";

const TableVocabSpan = ({data}) => {
  return (
    <span
      className={`font-semibold rounded-full border py-1 px-3 ${
        data === "Yes"
          ? "bg-green-300 text-green-800 border-green-400"
          : data === "No"
          ? "bg-red-500 text-white border-red-600"
          : data === "-"
          ? "px-[20px] bg-orange-300 text-orange-800 border-orange-400"
          : ""
      }`}
    >
      {data === "Yes" ? "Passed" : "Failed" || "N/A"}
    </span>
  );
};

export default TableVocabSpan

TableVocabSpan.propTypes = {
  data: PropTypes.any
}
import PropTypes from "prop-types";

function TableComponent(props) {
  const { header, children } = props;
  return (
    <table className="w-full text-center text-sm font-light rounded-xl border-2 border-blue-500 relative">
      <thead className="border-b bg-blue-500 font-medium text-white z-[5] sticky -top-[1px]">
        <tr>
          {header?.map((element) => {
            return (
              <th
                scope="col"
                className="px-6 max-md:px-5.5 max-md:py-2 py-4 text-wrap"
                key={element.id}
              >
                {element.title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

TableComponent.propTypes = {
  header: PropTypes.array,
  children: PropTypes.node.isRequired,
};

export default TableComponent;

import PropTypes from "prop-types"
import { useParams } from 'react-router-dom';
import JournalWeeks from "../admin/JournalWeeks";

function GroupsForStudents({ groups }) {
  const { id } = useParams();

  const group = groups.find(group => group.id === parseInt(id));

  if (!group) {
    return <h1>Group not found</h1>;
  }

  return (
    <div>
      <JournalWeeks/>
    </div>
  );
}

GroupsForStudents.propTypes = {
  groups: PropTypes.array
}

export default GroupsForStudents
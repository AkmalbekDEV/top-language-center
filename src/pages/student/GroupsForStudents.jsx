import PropTypes from "prop-types"
import { useParams } from 'react-router-dom';

function GroupsForStudents({ groups }) {
  const { id } = useParams();

  const group = groups.find(group => group.id === parseInt(id));

  if (!group) {
    return <h1>Group not found</h1>;
  }

  return (
    <div>
      <h1>{group.name}</h1>
      <p>Type: {group.type}</p>
      {/* Add more group-specific details here */}
    </div>
  );
}

GroupsForStudents.propTypes = {
  groups: PropTypes.array
}

export default GroupsForStudents
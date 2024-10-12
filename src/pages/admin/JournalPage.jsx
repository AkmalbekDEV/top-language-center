import { useEffect, useContext } from 'react';
import { JournalContext } from '../../context/journals/JournalContext';
import { useParams } from 'react-router-dom';

const JournalsPage = () => {
  const { journal, loading, error, getJournals } = useContext(JournalContext)
  const {data, groupName} = journal
  const {id} = useParams()
  useEffect(() => {
    getJournals(0, id)
  }, [])
  console.log(id);
  return (
    <div>
      {loading && loading}
      {error && error}
      <h1>{groupName ? `Journals Page in ${groupName}` : "Non-existent group"}</h1>
      <div>
        {data?.map(group => (
          <div key={group.id}>
            <h2>Group ID: {group.group_id}</h2>

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

export default JournalsPage;

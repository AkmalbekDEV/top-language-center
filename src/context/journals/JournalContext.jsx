import { createContext, useCallback, useState } from "react";
import Axios from "../../api";
import { journalRelationUrl, weeksListUrl } from "../../utils/urls";
import PropTypes from "prop-types";

export const JournalContext = createContext();

const JournalProvider = ({ children }) => {
  const [journal, setJournal] = useState([]);
  const [week, setWeek] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getJournals = useCallback(async (journalType, groupId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios.get(
        journalRelationUrl(journalType, groupId)
      );
      const data = response.data;

      const groupJournals = data.filter(
        (journal) => journal.group.id.toString() === groupId
      );
      if (groupJournals.length > 0) {
        setJournal({
          journals: groupJournals,
          groups: groupJournals[0].group,
          groupName: groupJournals[0].group.name,
        });
      } else {
        setJournal({
          journals: [],
          groups: groupJournals[0].group,
          groupName: "",
        });
      }
    } catch (err) {
      setError(err);
      setJournal({
        journals: [],
        groups: groupJournals[0].group,
        groupName: "",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const getWeeks = useCallback(async (weekType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios.get(weeksListUrl[weekType]);
      setWeek(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <JournalContext.Provider
      value={{ journal, week, loading, error, getJournals, getWeeks }}
    >
      {children}
    </JournalContext.Provider>
  );
};

JournalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default JournalProvider;

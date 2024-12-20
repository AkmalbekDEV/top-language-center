import { createContext, useCallback, useState } from "react";
import Axios from "../../api";
import {
  journalAddUrl,
  journalDeleteUrl,
  journalEditUrl,
  journalRelationUrl,
  weeksListUrl,
} from "../../utils/urls";
import PropTypes from "prop-types";

export const JournalContext = createContext();

const JournalProvider = ({ children }) => {
  const [journal, setJournal] = useState([]);
  const [week, setWeek] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getJournals = useCallback(async (journalType, groupId, weekId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios.get(
        journalRelationUrl(journalType, groupId, weekId)
      );
      const data = response.data;
      const groupJournals = data.filter(
        (journal) =>
          journal.group.id.toString() === groupId &&
          journal.journal_week_id.toString() === weekId
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
          groups: [],
          groupName: "",
        });
      }
    } catch (err) {
      setError(err);
      setJournal({
        journals: [],
        groups: [],
        groupName: "",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const getWeeks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios.get(weeksListUrl);
      setWeek(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const postJournal = async (journalType, body) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios.post(journalAddUrl(journalType), body);
      setJournal((prevState) => ({
        ...prevState,
        journals: [...prevState.journals, response.data],
      }));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const editJournal = async (journalType, body, id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios.patch(journalEditUrl(journalType, id), body);
      const updatedJournal = response.data;
      setJournal((prevState) => ({
        ...prevState,
        journals: prevState.journals.map((journal) =>
          journal.id === id ? updatedJournal : journal
        ),
      }));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const deleteJournal = async (journalType, id) => {
    setLoading(true)
    setError(null)
    try {
      await Axios.delete(journalDeleteUrl(journalType, id));
      setJournal((prevJournal) => ({
        ...prevJournal,
        journals: prevJournal.journals.filter((journal) => journal.id !== id),
      }));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <JournalContext.Provider
      value={{
        journal,
        week,
        loading,
        error,
        getJournals,
        getWeeks,
        postJournal,
        editJournal,
        deleteJournal
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};

JournalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default JournalProvider;

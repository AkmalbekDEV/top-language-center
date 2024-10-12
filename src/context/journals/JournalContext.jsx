import { createContext, useCallback, useState } from "react"
import Axios from "../../api"
import { journalRelationUrl } from "../../utils/urls"
import PropTypes from "prop-types"

export const JournalContext = createContext()

const JournalProvider = ({ children }) => {

  const [journal, setJournal] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getJournals = useCallback(async (journalType, groupId) => {
    setLoading(true)
    setError(null)
    try {
      const response = await Axios.get(journalRelationUrl(journalType, groupId))
      const data = response.data

      const groupJournals = data.filter(
        (journal) => journal.group.id.toString() === groupId
      )
      if(groupJournals.length > 0) {
        setJournal({
          journals: groupJournals,
          groupName: groupJournals[0].group.name,
        })
      }
      else {
        setJournal({
          journals: [],
          groupName: ""
        })
      }
    }
    catch (err) {
      setError(err)
      setJournal({
        journals: [],
        groupName: ""
      })
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <JournalContext.Provider
      value={{ journal, loading, error, getJournals }}
    >
      {children}
    </JournalContext.Provider>
  )
}

JournalProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default JournalProvider
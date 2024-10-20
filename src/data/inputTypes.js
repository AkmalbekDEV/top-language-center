const inputTypes = {
    Standard: {
      Listening: "select",
      Reading: "select",
      Vocabulary: "number",
      Grammar: "select",
      Writing: "select",
      VocabularyHW: "select",
    },
    Advanced: {
      Listening: "number",
      Reading: "number",
      Vocabulary: "number",
      ListeningHW: "select",
      ReadingHW: "select",
      Grammar: "select",
      Writing: "select",
    },
    Top: {
      Listening: "range",
      Reading: "range",
      Writing: "range",
      Speaking: "range",
      Overall: "auto",
    },
  };

export default inputTypes
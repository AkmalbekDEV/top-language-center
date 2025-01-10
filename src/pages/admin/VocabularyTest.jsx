import { Link, useParams } from "react-router-dom";
import { useVocabManager } from "../../queries/VocabTestManager";
import { useState } from "react";
import { useToast, Button } from "@chakra-ui/react";
import PopoverComponent from "../../components/ui/Popover";
import { useJournalManager } from "../../queries/JournalManager";

const VocabularyTest = () => {
  const {
    useVocabTests,
    useAddVocabTest,
    useUpdateVocabTest,
    useDeleteVocabTest,
    useToggleAccess,
  } = useVocabManager();
  const { useJournalWeeks, useUpdateJournalWeekTimer } = useJournalManager();

  const addTest = useAddVocabTest();
  const updateTest = useUpdateVocabTest();
  const deleteTest = useDeleteVocabTest();
  const toggleAccess = useToggleAccess();
  const { data: weeks, isLoading: weeksLoading } = useJournalWeeks();
  const editTimer = useUpdateJournalWeekTimer();

  const searchParams = new URLSearchParams(location.search);
  const typeValue = searchParams.get("type");
  const specificTimer = typeValue + "Timer";
  const { groupId, weekId } = useParams();
  const [timer, setTimer] = useState({
    weekId: null,
    advancedTimer: "",
    standardTimer: "",
    topTimer: "",
  });
  const { data: tests, isLoading } = useVocabTests(groupId, weekId);
console.log()
  const [editingTest, setEditingTest] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });
  const toast = useToast();

  console.log(tests);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTest.mutateAsync({
        testData: formData,
        groupId,
        journalRef: `${typeValue}_journals`,
        weekId,
      });

      // Reset form
      setFormData({
        question: "",
        answer: "",
      });
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "success",
        title: "Added!",
        description: "New vocab successfully added",
      });
    } catch (error) {
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "error",
        title: "Add Failed",
        description: "There was an error adding the vocab",
      });
      console.error("Failed to add vocab:", error);
    }
  };

  const handleEditTimer = async (e) => {
    e.preventDefault();
    try {
      await editTimer.mutateAsync({
        weekId: `journal_weeks-00` + timer.weekId,
        updateData: timer,
      });
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "success",
        title: "Edited!",
        description: "The timer was successfully edited",
      });
    } catch (error) {
      console.error("Edit error: ", error);
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "error",
        title: "Edit Failed",
        description: "There was an error editing the timer",
      });
    }
  };

  const handleEditTimerClick = (vocab) => {
    if (typeValue === "standard") {
      setTimer({ weekId: String(vocab.weekId), standardTimer: vocab.standardTimer });
    }
    else if (typeValue === "advanced") {
      setTimer({ weekId: String(vocab.weekId), advancedTimer: vocab.advancedTimer });
    }
    else {
      setTimer({ weekId: String(vocab.weekId), topTimer: vocab.topTimer });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (editingTest) {
  //     await updateTest.mutateAsync({
  //       testId: editingTest.id,
  //       updateData: formData,
  //       groupId,
  //       journalRef: `${typeValue}_journals`,
  //       weekId,
  //     })
  //   } else {
  //     await addTest.mutateAsync({
  //       testData: formData,
  //       groupId,
  //       journalRef: `${typeValue}_journals`,
  //       weekId,
  //     })
  //   }
  //   setIsOpen(false);
  //   setEditingTest(null);
  //   setFormData({
  //     question: "",
  //     answer: "",
  //     options: [],
  //   })
  // }
  console.log(tests);
  return (
    <div className="min-w-100 grid grid-rows-1">
      <div className="flex items-center justify-center max-sm:justify-between max-sm:flex-col-reverse pt-5">
        <div className="grid w-full gap-10">
          <div className="w-full flex justify-between">
            <Link
              className="px-6 py-1.5 rounded-md bg-[#EDF2F7] text-[#1A202C] text-xl font-semibold"
              to={`/group/${groupId}/students/journals/${weekId}?type=${typeValue}`}
            >
              Back
            </Link>
            <Link
              className="px-6 py-1.5 rounded-md text-gray-200 text-xl font-medium bg-[#1E40AF]"
              to={`/group/${groupId}/students`}
            >
              Students
            </Link>
            <PopoverComponent
              trigger={
                <Button
                  size="xl"
                  className="px-5 py-1.5 max-sm:py-1 max-sm:px-3 max-sm:text-[1rem] rounded-md bg-gray-200 text-black text-xl font-medium"
                >
                  <h1 className="text-lg font-medium text-blue-600">
                    Add Test
                  </h1>
                </Button>
              }
              header="Add Test"
            >
              <form onSubmit={handleSubmit} className="grid gap-2">
                <div className="grid gap-[2px]">
                  <label
                    htmlFor="question"
                    className="text-xl my-2 font-medium text-blue-600 text-center"
                  >
                    Question:
                  </label>
                  <input
                    type="text"
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    placeholder="Enter a question..."
                    required
                    className="w-full px-5 rounded-lg py-1 border-[1px] border-gray-500"
                  />
                </div>

                <div className="grid gap-[2px]">
                  <label
                    htmlFor="answer"
                    className="text-xl my-2 font-medium text-blue-600 text-center"
                  >
                    Answer:
                  </label>
                  <input
                    type="text"
                    id="answer"
                    name="answer"
                    value={formData.answer}
                    onChange={handleChange}
                    placeholder="Enter the answer..."
                    required
                    className="w-full px-5 rounded-lg py-1 border-[1px] border-gray-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={addTest.isPending}
                  className="text-center bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                  {addTest.isPending ? "Adding..." : "Add Test"}
                </button>
              </form>
            </PopoverComponent>
          </div>
          {/* <div className="text-center">
            <h1 className="text-4xl font-medium">
              Group in {students?.groupName} | Week {students?.weekNumber} | Vocabulary Test
            </h1>
          </div> */}
          <div className="text-center h-[50px]">
            {isLoading && (
              <span className="bg-blue-500 text-white p-3 rounded-3xl">
                Loading...
              </span>
            )}
          </div>
          {tests?.length !== 0 && (
            <div className="text-center">
              <span>Timer</span>
              <PopoverComponent
                trigger={
                  <Button
                    onClick={
                      typeValue === "standard"
                        ? () => handleEditTimerClick({ weekId: weekId, standardTimer: weeks?.[weekId - 1]?.standardTimer })
                        : typeValue === "advanced"
                          ? () => handleEditTimerClick({ weekId: weekId, advancedTimer: weeks?.[weekId - 1]?.advancedTimer })
                          : () => handleEditTimerClick({ weekId: weekId, topTimer: weeks?.[weekId - 1]?.topTimer })
                    }
                    size="xl"
                    className="px-5 py-1.5 max-sm:py-1 max-sm:px-3 max-sm:text-[1rem] rounded-md bg-gray-200 text-black text-xl font-medium"
                  >
                    <h1 className="text-lg font-medium text-blue-600">
                      {
                        typeValue === "standard"
                          ? weeks?.[weekId - 1]?.standardTimer
                          : typeValue === "advanced"
                            ? weeks?.[weekId - 1]?.advancedTimer
                            : weeks?.[weekId - 1]?.topTimer

                      } sec
                    </h1>
                  </Button>
                }
                header="Edit Timer"
              >
                <form onSubmit={handleEditTimer} className="grid gap-2">
                  <div className="grid gap-[2px]">
                    <label
                      htmlFor="question"
                      className="text-xl my-2 font-medium text-blue-600 text-center"
                    >
                      Timer:
                    </label>
                    <input
                      type="number"
                      id="timer"
                      name={specificTimer}
                      value={typeValue === "standard" ? timer.standardTimer : typeValue === "advanced" ? timer.advancedTimer : timer.topTimer}

                      onChange={(e) => {
                        if (typeValue === "standard") {
                          setTimer({ ...timer, standardTimer: e.target.value })
                        } else if (typeValue === "advanced") {
                          setTimer({ ...timer, advancedTimer: e.target.value })
                        } else {
                          setTimer({ ...timer, topTimer: e.target.value })
                        }
                      }
                      }
                      required
                      className="w-full px-5 rounded-lg py-1 border-[1px] border-gray-500"
                    />
                  </div>
                  <button
                    className="text-center bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                    disabled={editTimer.isPending}
                  >
                    {editTimer.isPending ? "Editing..." : "Edit Timer"}
                  </button>
                </form>
              </PopoverComponent>
            </div>
          )}
          <div className="space-y-4">
            {tests?.map((test) => (
              <div
                key={test.id}
                className="p-4 border rounded-lg bg-white shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">Test {test.test}</h3>
                    <p>Question: {test.question}</p>
                    <p>Answer: {test.answer}</p>
                  </div>
                  {/* <div className="space-x-2">
                      <Switch
                        checked={test.access}
                        onCheckedChange={() => handleToggleAccess(test)}
                      />
                      <Button variant="outline" onClick={() => handleEdit(test)}>
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(test)}
                      >
                        Delete
                      </Button>
                    </div> */}
                </div>
              </div>
            ))}
          </div>

          {/* <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg max-w-md w-full">
                  <h3 className="text-lg font-bold mb-4">
                    {editingTest ? "Edit Test" : "Add New Test"}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label>Question</label>
                      <Input
                        value={formData.question}
                        onChange={(e) =>
                          setFormData({ ...formData, question: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label>Correct Answer</label>
                      <Input
                        value={formData.correct_answer}
                        onChange={(e) =>
                          setFormData({ ...formData, correct_answer: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label>Timer (seconds)</label>
                      <Input
                        type="number"
                        value={formData.timer / 1000}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            timer: parseInt(e.target.value) * 1000,
                          })
                        }
                        min="1"
                        required
                      />
                    </div>
                    <div>
                      <label>Test Number</label>
                      <Input
                        type="number"
                        value={formData.test}
                        onChange={(e) =>
                          setFormData({ ...formData, test: parseInt(e.target.value) })
                        }
                        min="1"
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingTest ? "Update" : "Create"} Test
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </Dialog> */}
        </div>
      </div >
    </div >
  );
};

export default VocabularyTest;

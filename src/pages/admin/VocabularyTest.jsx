import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useVocabManager } from "../../queries/VocabTestManager";
import { useToast, Button, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Switch } from "@chakra-ui/react";
import PopoverComponent from "../../components/ui/Popover";
import { useJournalManager } from "../../queries/JournalManager";

const VocabularyTest = () => {
  const {
    useVocabTests,
    useAddVocabTest,
    useUpdateVocabTest,
    useDeleteVocabTest,
  } = useVocabManager();
  const { useJournalWeeks, useUpdateJournalWeekTimer } = useJournalManager();

  const addTest = useAddVocabTest();
  const updateTest = useUpdateVocabTest();
  const deleteTest = useDeleteVocabTest();
  const { data: weeks, isLoading: weeksLoading } = useJournalWeeks();
  const [testToDelete, setTestToDelete] = useState(null);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const cancelRef = React.useRef();

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

  const [editData, setEditData] = useState({
    id: null,
    question: "",
    answer: "",
  });
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });
  const toast = useToast();

  console.log(editData);

  // POST request to add a new test to the database START
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

  // POST request to add a new test to the database END

  // UPDATE request to edit a test in the database START

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await updateTest.mutateAsync({
        testId: editData.id,
        updateData: editData
      });
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "success",
        title: "Updated!",
        description: "Vocab successfully updated",
      });
    } catch (error) {
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "error",
        title: "Update Failed",
        description: "There was an error updating the vocab",
      });
      console.error("Failed to update vocab:", error);
    }
  }

  const handleEditClick = (vocab) => {
    setEditData(vocab);
    setFormData({
      id: vocab.id,
      question: vocab.question,
      answer: vocab.answer,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE request to edit a test in the database END

  // UPDATE request to toggle access to a test in the database START

  // Handle the toggle
  const handleToggle = async (weekData) => {
    try {
      const accessType = typeValue === "standard"
        ? "standardAccess"
        : typeValue === "advanced"
          ? "advancedAccess"
          : "topAccess";

      // Get current value and toggle it
      const currentValue = weekData[accessType];

      await editTimer.mutateAsync({
        weekId: `journal_weeks-${String(weekData.weekId).padStart(3, '0')}`,
        updateData: {
          [accessType]: !currentValue  // Toggle the boolean value
        },
      });

      if (!currentValue) {
        toast({
          position: "top",
          duration: 5000,
          isClosable: true,
          status: "success",
          title: "Test is ON!",
          description: "Access to the test is on",
        });
      } else {
        toast({
          position: "top",
          duration: 5000,
          isClosable: true,
          status: "error",
          title: "Test is OFF!",
          description: "Access to the test is off",
        });
      }
    } catch (error) {
      console.error("Edit error: ", error);
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "error",
        title: "Edit Failed",
        description: "There was an error toggling the access",
      });
    }
  };

  // UPDATE request to toggle the access from the database END

  // DELETE request to delete a test from the database START

  const handleDelete = async () => {
    if (!testToDelete) return;

    try {
      await deleteTest.mutateAsync({ testId: testToDelete.id });
      onDeleteClose();
      setTestToDelete(null);
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "success",
        title: "Deleted!",
        description: "The test successfully deleted",
      });
    } catch (error) {
      console.error("Delete vocab test error:", error);
    }
  };

  const handleDeleteClick = (vocab) => {
    setTestToDelete(vocab);
    onDeleteOpen();
  }

  // DELETE request to delete a test from the database END

  // EDIT method timer START

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

  // EDIT method timer END

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
            <div>
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
              <div className="text-center">
                <span>Access</span>
                <Switch
                  isChecked={
                    typeValue === "standard"
                      ? weeks?.[weekId - 1]?.standardAccess
                      : typeValue === "advanced"
                        ? weeks?.[weekId - 1]?.advancedAccess
                        : weeks?.[weekId - 1]?.topAccess
                  }
                  onChange={() => handleToggle(weeks[weekId - 1])}
                >
                  Access Test
                </Switch>
              </div>
            </div>
          )}
          <div className="space-y-4">
            {tests?.map((test, index) => (
              <div
                key={test.id}
                className="p-4 border rounded-lg bg-white shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">Test {index + 1}</h3>
                    <p>Question: {test.question}</p>
                    <p>Answer: {test.answer}</p>
                  </div>
                  <div className="space-x-2">
                    {/* <Switch
                        checked={test.access}
                        onCheckedChange={() => handleToggleAccess(test)}
                      /> */}
                    <PopoverComponent
                      trigger={
                        <Button
                          size="xl"
                          className="px-5 py-1.5 max-sm:py-1 max-sm:px-3 max-sm:text-[1rem] rounded-md bg-gray-200 text-black text-xl font-medium"
                          onClick={() => handleEditClick(test)}
                        >
                          <h1 className="text-lg font-medium text-blue-600">
                            Edit
                          </h1>
                        </Button>
                      }
                      header={`Edit Test ${test.test}`}
                    >
                      <form onSubmit={handleEdit} className="grid gap-2">
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
                            value={editData.question}
                            onChange={handleEditChange}
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
                            value={editData.answer}
                            onChange={handleEditChange}
                            placeholder="Enter the answer..."
                            required
                            className="w-full px-5 rounded-lg py-1 border-[1px] border-gray-500"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={updateTest.isPending}
                          className="text-center bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                        >
                          {updateTest.isPending ? "Updating..." : "Update Test"}
                        </button>
                      </form>
                    </PopoverComponent>
                    <Button
                      variant={"destructive"}
                      size={{ base: "xs", sm: "sm" }}
                      className="max-sm:mr-[5px]"
                      onClick={() => handleDeleteClick(test)}
                    >
                      Delete
                    </Button>
                    {/* <Button variant="outline" onClick={() => handleEdit(test)}>
                      Edit
                    </Button> */}
                    {/* <Button
                      variant="destructive"
                      onClick={() => handleDelete(test)}
                    >
                      Delete
                    </Button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <AlertDialog
            isOpen={isDeleteOpen}
            leastDestructiveRef={cancelRef}
            onClose={onDeleteClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Vocab Test
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to delete this test? This
                  action cannot be undone.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onDeleteClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={handleDelete} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </div>
      </div >
    </div >
  );
};

export default VocabularyTest;

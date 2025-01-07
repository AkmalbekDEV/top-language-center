import { useState } from "react";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";
import { useStudentsManager } from "../../../../queries/StudentsManager";

const AddStudentForm = ({ groupId }) => {
  const { useAddStudent } = useStudentsManager();
  const addStudent = useAddStudent();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    first_month: "false",
    second_month: "false",
  });

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
      await addStudent.mutateAsync({
        studentData: formData,
        groupId,
      });

      // Reset form
      setFormData({
        name: "",
        first_month: "false",
        second_month: "false",
      });

      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "success",
        title: "Added!",
        description: "New student successfully added",
      });
    } catch (error) {
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "error",
        title: "Add Failed",
        description: "There was an error adding the student",
      });
      console.error("Failed to add student:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-2">
      <div className="grid gap-[2px]">
        <label
          htmlFor="name"
          className="text-xl my-2 font-medium text-blue-600 text-center"
        >
          Student Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Student Name..."
          required
          className="w-full px-5 rounded-lg py-1 border-[1px] border-gray-500"
        />
      </div>

      <div className="grid text-center gap-2">
        <label htmlFor="first_month" className="text-xl font-medium text-blue-600">
          1-month
        </label>
        <select
          id="first_month"
          name="first_month"
          value={formData.first_month}
          onChange={handleChange}
          className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
        >
          <option value="true">Paid</option>
          <option value="false">Unpaid</option>
        </select>
      </div>
      <div className="grid text-center gap-2">
        <label htmlFor="second_month" className="text-xl font-medium text-blue-600">
          2-month
        </label>
        <select
          id="second_month"
          name="second_month"
          value={formData.second_month}
          onChange={handleChange}
          className="w-full px-5 py-1 rounded-xl border-2 border-gray-500"
        >
          <option value="true">Paid</option>
          <option value="false">Unpaid</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={addStudent.isPending}
        className="text-center bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {addStudent.isPending ? "Adding..." : "Add Student"}
      </button>
    </form>
  );
};

AddStudentForm.propTypes = {
  groupId: PropTypes.string.isRequired,
};

export default AddStudentForm;

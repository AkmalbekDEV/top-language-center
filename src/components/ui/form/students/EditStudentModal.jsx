import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@chakra-ui/react";
import { useStudentsManager } from "../../../../context/StudentsContext";

const EditStudentModal = ({ student, onClose }) => {
  const { useUpdateStudent } = useStudentsManager();
  const editStudent = useUpdateStudent();
  const [formData, setFormData] = useState({
    name: student.name,
    first_month: student.first_month,
    second_month: student.second_month,
  });
  const toast = useToast();
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editStudent.mutateAsync({ id: student.id, ...formData });
      toast({
        duration: 5000,
        isClosable: true,
        position: "top",
        status: "success",
        title: "Edited!",
        description: "The student successfully edited!",
      });
      onClose();
    } catch (error) {
      toast({
        duration: 5000,
        isClosable: true,
        position: "top",
        status: "error",
        title: "Failed!",
        description: `Error: ${error}`,
      });
      console.error("Edit student error:", error);
    }
  };
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-15 cursor-pointer"
      onClick={handleBackgroundClick}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 w-96 relative cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Student</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-xl font-medium mb-2 text-blue-600"
            >
              Student Name:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="grid mb-4">
            <label
              htmlFor="first_month"
              className="text-xl font-medium text-blue-600"
            >
              1-month:
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

          <div className="grid mb-4">
            <label
              htmlFor="first_month"
              className="text-xl font-medium text-blue-600"
            >
              2-month:
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
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditStudentModal;

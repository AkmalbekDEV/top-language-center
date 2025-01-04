import { useState, useEffect } from "react";
import { useGroupsManager } from "../../../../queries/GroupManager";
import { motion } from "framer-motion";
import { useToast } from "@chakra-ui/react";

const EditGroupModal = ({ group, onClose }) => {
  const { useUpdateGroup } = useGroupsManager();
  const editGroup = useUpdateGroup();
  const [formData, setFormData] = useState({
    name: group.name,
    type: group.type,
    password: group.password,
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
      await editGroup.mutateAsync({ id: group.id, ...formData });
      toast({
        duration: 5000,
        isClosable: true,
        position: "top",
        status: "success",
        title: "Edited!",
        description: "The group successfully edited!",
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
      console.error("Edit group error:", error);
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
          <h2 className="text-xl font-semibold">Edit Group</h2>
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
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Group Name
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

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Group Type
            </label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="Standard">Standard</option>
              <option value="Advanced">Advanced</option>
              <option value="Top">Top</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="text"
              autoComplete="off"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
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

export default EditGroupModal;

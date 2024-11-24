import { useState } from "react";
import { GROUP_TYPES } from "../../../../constants/groupTypes";
import { useGroupsManager } from "../../../../context/GroupContext";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";

const AddGroupForm = () => {
  const { useAddGroup } = useGroupsManager();
  const addGroup = useAddGroup();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    type: GROUP_TYPES.STANDARD,
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
      await addGroup.mutateAsync(formData);
      // Reset form
      setFormData({
        name: "",
        password: "",
        type: GROUP_TYPES.STANDARD,
      });
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "success",
        title: "Added!",
        description: "New group successfully added",
      });
    } catch (error) {
      toast({
        position: "top",
        duration: 5000,
        isClosable: true,
        status: "error",
        title: "Add Failed",
        description: "There was an error adding the group",
      });
      console.error("Failed to add group:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-2">
      <div className="grid gap-[2px]">
        <label
          htmlFor="name"
          className="text-xl my-2 font-medium text-blue-600 text-center"
        >
          Group Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Group Name..."
          required
          className="w-full px-5 rounded-lg py-1 border-[1px] border-gray-500"
        />
      </div>

      <div className="grid gap-[2px]">
        <label
          htmlFor="password"
          className="text-xl my-2 font-medium text-blue-600 text-center"
        >
          Password:
        </label>
        <input
          type="text"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password..."
          required
          className="w-full px-5 rounded-lg py-1 border-[1px] border-gray-500"
        />
      </div>

      <div className="grid gap-[2px]">
        <label
          htmlFor="type"
          className="text-xl my-2 font-medium text-blue-600 text-center"
        >
          Group Type:
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full px-5 rounded-lg py-1 border-[1px] border-gray-500"
        >
          {Object.values(GROUP_TYPES).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={addGroup.isPending}
        className="text-center bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {addGroup.isPending ? "Adding..." : "Add Group"}
      </button>
    </form>
  );
};

AddGroupForm.propTypes = {
  initialData: PropTypes.array,
  onSubmit: PropTypes.any,
};

export default AddGroupForm;

import React, { useContext } from "react";
import { GroupContext } from "../context/GroupContext";
import { useNavigate } from "react-router-dom";

const GroupPage = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };
  const { state } = useContext(GroupContext);
  console.log(state);
  return (
    <div>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="grid gap-10">
          <div className="flex items-center justify-center">
            <button
              onClick={handleLogOut}
              className="text-xl text-white text-center cursor-pointer px-2 py-1 rounded-md bg-red-500 w-fit"
            >
              Log Out
            </button>
          </div>
          <h1 className="text-5xl text-blue-600 text-center font-bold">
            Choose the group
          </h1>
          <div className="max-sm:flex max-sm:justify-center">
            <div className="grid grid-cols-3 justify-items-center gap-5 max-sm:grid-cols-2">
              {state.map((group) => {
                return (
                  <button
                    // onClick={() => navigate(`/${group.href}`)}
                    key={group.id}
                    className="cursor-pointer hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600 transition-all px-5 py-3 max-sm:flex max-sm:justify-center rounded-xl bg-blue-600"
                  >
                    <h1 className="text-lg font-medium text-white">
                      {group.name}
                    </h1>
                  </button>
                );
              })}
              <button className="cursor-pointer border-solid border-2 border-blue-600 px-5 py-3 max-sm:flex max-sm:justify-center rounded-xl bg-white">
                <h1 className="text-lg font-medium text-blue-600">Add Group</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;

/* eslint-disable react/prop-types */
import { useState } from "react";

const Colors = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

const CreateGroup = ({ setShowCreateGroup, data, setData }) => {
  const [groupDetails, setGroupDetails] = useState({
    groupColor: "",
    groupName: "",
  });

  const handleCreateGroup = () => {
    if (
      groupDetails.groupColor.trim() === "" ||
      groupDetails.groupName.trim() === ""
    ) {
      alert("Please fill all the details");
    } else {
      const groupExists = data.some(
        (group) =>
          group.groupName.toLowerCase() === groupDetails.groupName.toLowerCase()
      );

      if (groupExists) {
        alert("Group already exists");
        return;
      }
      const newData = [
        ...data,
        {
          groupName: groupDetails.groupName,
          color: groupDetails.groupColor,
          icon:
            groupDetails.groupName.length > 2
              ? groupDetails.groupName.substring(0, 2)
              : groupDetails.groupName,
          messages: [
            {
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
              message: "Welcome to the new group!",
            },
          ],
        },
      ];
      setData(newData);
      localStorage.setItem("Data", JSON.stringify(newData));
      setGroupDetails({ groupColor: "", groupName: "" });
      setShowCreateGroup(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#2F2F2FBF] z-10 flex items-center justify-center"
      onClick={() => setShowCreateGroup(false)}
    >
      <div
        className="bg-white w-full max-w-md mx-4 p-6 rounded-lg z-20 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          Create New Notes Group
        </h1>
        <p className="text-lg md:text-2xl font-semibold mb-4">
          Group Name{" "}
          <input
            type="text"
            placeholder="Enter your group name"
            className="text-[#979797] border-2 border-solid border-[#979797] px-4 md:px-8 py-2 rounded-full text-lg outline-none w-full mt-2 md:mt-0"
            value={groupDetails.groupName}
            name="groupName"
            onChange={(e) =>
              setGroupDetails({ ...groupDetails, groupName: e.target.value })
            }
            required
          />
        </p>
        <p className="text-lg md:text-2xl font-semibold mb-4">
          Choose Color{" "}
          <div className="flex flex-wrap mt-2">
            {Colors.map((col, id) => (
              <div
                key={id}
                style={{
                  backgroundColor: col,
                  outline:
                    groupDetails.groupColor === col ? "4px solid black" : "",
                  outlineOffset: "5px",
                }}
                className="h-10 w-10 md:h-12 md:w-12 rounded-3xl mx-2 my-2 cursor-pointer"
                onClick={() =>
                  setGroupDetails({ ...groupDetails, groupColor: col })
                }
              ></div>
            ))}
          </div>
        </p>

        <button
          className="bg-black text-white px-6 py-2 rounded-lg font-normal mt-4 w-full"
          onClick={handleCreateGroup}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateGroup;

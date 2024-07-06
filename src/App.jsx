/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import GroupName from "./components/GroupName";
import CreateGroup from "./components/CreateGroup";
import MessageTemplate from "./components/MessageTemplate";
import Inbox from "./components/Inbox";

const App = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showMessageTemplate, setShowMessageTemplate] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const storedData = JSON.parse(localStorage.getItem("PocketNotesData"));
  const [data, setData] = useState(
    storedData
      ? storedData
      : [
          {
            groupName: "Me",
            color: "blue",
            icon: "me",
            messages: [
              {
                date: "",
                time: "",
                message: "",
              },
            ],
          },
        ]
  );

  useEffect(() => {
    localStorage.setItem("PocketNotesData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateMessages = (groupName, newMessage) => {
    setData((prevData) =>
      prevData.map((group) =>
        group.groupName === groupName
          ? { ...group, messages: [...group.messages, newMessage] }
          : group
      )
    );
    if (selectedGroup.groupName === groupName) {
      setSelectedGroup((prevGroup) => ({
        ...prevGroup,
        messages: [...prevGroup.messages, newMessage],
      }));
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      {showSidebar && (
        <div className="bg-white h-full md:h-screen w-full md:w-[30%] flex flex-col overflow-hidden pl-4 py-4">
          <h1 className="text-2xl font-[500] mb-4 md:mb-8 md:text-left text-center w-full">
            Pocket Notes
          </h1>
          <div className="flex flex-col items-start overflow-y-scroll no-scrollbar">
            <button
              className="bg-black text-white rounded-full text-lg md:text-xl w-[90%] md:w-auto md:px-8 py-3 md:py-4 font-semibold mb-4 md:mb-6 mr-4 "
              onClick={() => setShowCreateGroup(true)}
            >
              + Create Notes Group
            </button>
            {showCreateGroup && (
              <CreateGroup
                setShowCreateGroup={setShowCreateGroup}
                data={data}
                setData={setData}
              />
            )}

            {data.map((group, id) => (
              <GroupName
                data={group}
                key={id}
                selectedGroup={selectedGroup}
                setSelectedGroup={(group) => {
                  setSelectedGroup(group);
                  setShowMessageTemplate(false);
                  setShowSidebar(!isMobile);
                }}
                setShowMessageTemplate={setShowMessageTemplate}
              />
            ))}
          </div>
        </div>
      )}
      {showMessageTemplate ? (
        <div className="hidden md:block w-full h-full">
          <MessageTemplate />
        </div>
      ) : (
        selectedGroup && (
          <Inbox
            data={selectedGroup}
            updateMessages={updateMessages}
            goBack={() => {
              setShowSidebar(true);
              setShowMessageTemplate(true);
              if (isMobile) setSelectedGroup(null);
            }}
          />
        )
      )}
    </div>
  );
};

export default App;

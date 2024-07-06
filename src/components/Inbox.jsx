/* eslint-disable react/prop-types */
import { useState } from "react";

const Inbox = ({ data, updateMessages, goBack }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      const newMessage = {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        message,
      };
      updateMessages(data.groupName, newMessage);
      setMessage("");
    }
  };

  return (
    <div className="w-full h-screen bg-[#F7ECDC] relative overflow-hidden">
      <div className="nav w-full flex justify-between items-center gap-5 bg-[#E8E8E8] p-5">
        {window.innerWidth < 768 && (
          <button onClick={goBack} className="text-xl font-bold">
            &larr; Back
          </button>
        )}
        <div className="flex items-center gap-5">
          <div
            className="flex justify-center items-center text-white text-xl p-2 rounded-full"
            style={{ backgroundColor: data.color }}
          >
            {data.icon.toUpperCase()}
          </div>
          <h1 className="text-xl">{data.groupName}</h1>
        </div>
      </div>

      <div className="messages flex-grow h-full w-full overflow-y-auto overflow-x-hidden no-scrollbar p-2 sm:p-5">
        {data?.messages?.map((text, id) => (
          <div
            key={id}
            className="flex flex-col sm:flex-row justify-center gap-2 p-5 px-2 m-4 w-full"
          >
            <div className="flex flex-col w-full sm:w-[20%]">
              <p>{text.time}</p>
              <p>{text.date}</p>
            </div>

            <div className="w-full sm:w-[70%]">{text.message}</div>
          </div>
        ))}
      </div>

      <div className="textBox bg-[#E8E8E8] w-full absolute bottom-0 md:h-44 flex justify-center items-center p-2 md:p-0">
        <div className="w-[95%] h-[80%] relative">
          <textarea
            type="text"
            className="w-full h-full rounded-lg p-4 resize-none outline-none"
            placeholder="Enter your text here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <img
            src="/SendVector.png"
            alt="send"
            className="absolute bottom-5 right-5 cursor-pointer"
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default Inbox;

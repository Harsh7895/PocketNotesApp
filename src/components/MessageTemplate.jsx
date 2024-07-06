const MessageTemplate = () => {
  return (
    <div className="bg-[#F7ECDC] h-[100vh] w-full flex flex-col justify-center items-center relative">
      <img src="/pocketNotes.png" alt="pocket-notes" />
      <h1 className="text-3xl font-[400] p-2">Pocket Notes</h1>
      <p className="w-[50%]">
        Send and receive messages without keeping your phone online. Use Pocket
        Notes on up to 4 linked devices and 1 mobile phone
      </p>
      <p className="absolute bottom-4 right-[44%] flex gap-2">
        <img src="/lockVector.png" alt="lock" />
        <span className="text-[16px]">end-to-end encrypted</span>
      </p>
    </div>
  );
};

export default MessageTemplate;

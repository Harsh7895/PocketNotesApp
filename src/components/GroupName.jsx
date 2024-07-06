/* eslint-disable react/prop-types */
const GroupName = ({
  data,
  selectedGroup,
  setSelectedGroup,
  setShowMessageTemplate,
}) => {
  const icon = data.icon.toUpperCase();

  const handleSelectedGroup = (data) => {
    setShowMessageTemplate(false);
    setSelectedGroup(data);
  };

  return (
    <div
      className="flex gap-2 items-center  cursor-pointer w-full justify-start py-4 rounded-full px-4 rounded-r-none"
      style={{ backgroundColor: selectedGroup === data ? "#F7ECDC" : "" }}
      onClick={() => handleSelectedGroup(data)}
    >
      <div
        className="flex justify-center items-center text-white text-xl p-2 rounded-full"
        style={{ backgroundColor: data.color }}
      >
        {icon}
      </div>
      <div className="text-xl font-medium">
        {data.groupName.length > 20
          ? data.groupName.substring(0, 20)
          : data.groupName}
      </div>
    </div>
  );
};

export default GroupName;

const StatCard = ({ label, value }) => {
  return (
    <div className="bg-[#caf0f8] rounded-2xl p-5 shadow-lg">
      <p className="text-sm font-[Paprika] text-[#03045e]">{label}</p>
      <p className="text-2xl font-semibold text-[#000814] mt-2">{value}</p>
    </div>
  );
};

export default StatCard;

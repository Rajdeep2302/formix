import { useNavigate } from "react-router-dom";

const FormCard = ({ title, status, id }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#caf0f8] rounded-2xl p-5 shadow-lg flex flex-col gap-4">
      <h3 className="font-[Courgette] text-[#03045e]">{title}</h3>

      <p className="text-sm font-[Paprika] text-[#000814]">
        No description added yet.
      </p>

      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === "Live"
              ? "bg-[#48cae4] text-[#03045e]"
              : "bg-[#000814] text-white"
          }`}
        >
          {status}
        </span>

        <button
          onClick={() => navigate(`/Responses?form=${id}`)}
          className="text-sm font-medium text-[#03045e] hover:underline"
        >
          Open
        </button>
      </div>
    </div>
  );
};

export default FormCard;

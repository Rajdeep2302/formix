import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CellCreator from "../form-builder/CellCreator";
import CellRenderer from "../form-builder/CellRenderer";

const NewForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [cells, setCells] = useState([]);
  const navigate = useNavigate();

  const createCell = (cell) => {
    setCells([...cells, cell]);
    setShowPopup(false);
  };

  const deleteCell = (i) => {
    const updated = [...cells];
    updated.splice(i, 1);
    setCells(updated);
  };

  const publishForm = async () => {
    const title = document.querySelector("input").value;
    const description = document.querySelector("textarea").value;
    const token = localStorage.getItem("token");

    if (!title || cells.length === 0)
      return alert("Form title and at least one field required");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/forms/publish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ title, description, fields: cells }),
        }
      );

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      const link = `${window.location.origin}/form/${data.formId}`;
      await navigator.clipboard.writeText(link);

      alert("Form published!\n\nLink copied to clipboard:\n" + link);
    } catch {
      alert("Server error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#f1fffa] p-10 font-[Paprika]"
    >
      <div className="max-w-5xl mx-auto bg-[#caf0f8] rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-[#48cae4] p-6">
          <input
            defaultValue="Untitled Form"
            className="text-2xl font-[Courgette] text-[#03045e] bg-transparent outline-none w-full"
          />
          <textarea
            defaultValue="Add a description"
            className="w-full mt-2 text-sm bg-transparent outline-none resize-none text-[#03045e]"
          />
        </div>

        <div className="flex justify-end p-3">
          <button
            onClick={publishForm}
            className="bg-[#03045e] text-[#caf0f8] px-6 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            Publish
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {cells.length === 0 && (
            <p className="text-center opacity-70 text-[#000814] italic">
              No fields added yet.
            </p>
          )}

          <form className="flex flex-col gap-4">
            {cells.map((cell, i) => (
              <CellRenderer key={i} cell={cell} index={i} del={deleteCell} />
            ))}
          </form>

          <div className="flex justify-center">
            <button
              onClick={() => setShowPopup(true)}
              className="bg-[#48cae4] text-[#03045e] px-8 py-3 rounded-lg shadow hover:scale-105 transition font-semibold"
            >
              + Add Field
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <CellCreator
          close={() => setShowPopup(false)}
          createCell={createCell}
        />
      )}
    </motion.div>
  );
};

export default NewForm;

import { useState } from "react";
import { motion } from "framer-motion";

const CellRenderer = ({ cell, index, del }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const wrap = "bg-white rounded-xl p-4 shadow flex flex-col gap-2 relative";
  const label = "font-[Courgette] text-[#03045e]";
  const input = "w-full p-2 rounded-md border outline-none text-[#000814]";
  const delBtn = "absolute top-3 right-3 text-red-400 hover:text-red-600 cursor-pointer text-sm";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={wrap}
    >
      <span onClick={() => del(index)} className={delBtn}>✕</span>

      <p className={label}>
        {index + 1}. {cell.question}
      </p>

      {(cell.type === "short" || cell.type === "long") && (
        <textarea
          rows={cell.type === "long" ? 3 : 1}
          maxLength={cell.limit || undefined}
          placeholder={cell.limit ? `Max ${cell.limit} characters` : "Answer"}
          className={input}
        />
      )}

      {cell.type === "name" && <input type="text" className={input} placeholder="Full name" />}

      {cell.type === "email" && <input type="email" className={input} placeholder="example@mail.com" />}

      {cell.type === "mobile" && <input type="tel" className={input} placeholder="+91 XXXXX XXXXX" />}

      {(cell.type === "date" || cell.type === "dbo") && (
        <input type="date" min={cell.from || undefined} max={cell.to || undefined} className={input} />
      )}

      {["radio","checkbox"].includes(cell.type) &&
        cell.options.map((o,i)=>(
          <label key={i} className="flex gap-2 items-center text-[#000814]">
            <input type={cell.type} name={`cell-${index}`} className="accent-[#48cae4]" />
            {o}
          </label>
        ))
      }

      {cell.type === "dropdown" && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="w-full p-2 border rounded flex justify-between items-center bg-white"
          >
            <span>{selected || "Select Option"}</span>
            <span className="text-sm">⌄</span>
          </button>

          {open && (
            <div className="absolute w-full bg-white shadow rounded mt-1 z-10">
              {cell.options.map((o,i)=>(
                <div
                  key={i}
                  onClick={()=>{
                    setSelected(o);
                    setOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-[#caf0f8] cursor-pointer"
                >
                  {o}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default CellRenderer;

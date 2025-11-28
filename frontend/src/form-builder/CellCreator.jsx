import { useState } from "react";
import { motion } from "framer-motion";

const TYPES = [
  "name",
  "email",
  "mobile",
  "short",
  "long",
  "date",
  "dbo",
  "radio",
  "dropdown",
  "checkbox",
];

const CellCreator = ({ close, createCell }) => {
  const [type, setType] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [limit, setLimit] = useState("");
  const [range, setRange] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const needsOptions = ["radio", "dropdown", "checkbox"].includes(type);
  const isText = ["short", "long"].includes(type);
  const isDate = ["date", "dbo"].includes(type);

  const ready =
    type &&
    question &&
    (needsOptions ? options.filter((o) => o.trim()).length >= 2 : true);

  const addOption = () => setOptions([...options, ""]);

  const create = () => {
    createCell({
      type,
      question,
      options: options.filter((o) => o.trim()),
      limit,
      from,
      to,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-[460px] bg-[#caf0f8] rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-[#48cae4] p-4 text-center text-[#03045e] font-[Courgette] text-lg">
          Create Field
        </div>

        <div className="p-6 flex flex-col gap-4 font-[Paprika]">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-3 rounded-lg outline-none bg-white shadow text-[#000814]"
          >
            <option value="">Select Field Type</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t.toUpperCase()}
              </option>
            ))}
          </select>

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter question"
            className="p-3 rounded-lg outline-none bg-white shadow text-[#000814]"
          />

          {isText && (
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="Character limit (optional)"
              className="p-3 rounded-lg bg-white shadow outline-none text-[#000814]"
            />
          )}

          {isDate && (
            <div className="flex flex-col gap-2 text-[#03045e] text-sm">
              <label className="flex gap-2">
                <input type="checkbox" onChange={() => setRange(!range)} />
                Use date range
              </label>

              {range && (
                <div className="flex gap-2">
                  <input
                    type="date"
                    onChange={(e) => setFrom(e.target.value)}
                    className="p-2 rounded bg-white"
                  />
                  <input
                    type="date"
                    onChange={(e) => setTo(e.target.value)}
                    className="p-2 rounded bg-white"
                  />
                </div>
              )}
            </div>
          )}

          {needsOptions && (
            <div className="flex flex-col gap-2">
              {options.map((o, i) => (
                <input
                  key={i}
                  value={o}
                  onChange={(e) => {
                    const n = [...options];
                    n[i] = e.target.value;
                    setOptions(n);
                  }}
                  placeholder={`Option ${i + 1}`}
                  className="p-2 rounded bg-white outline-none shadow text-[#000814]"
                />
              ))}
              <button
                onClick={addOption}
                className="text-sm text-[#03045e] hover:underline self-start"
              >
                + Add option
              </button>
            </div>
          )}

          <div className="flex justify-between mt-4">
            <button
              onClick={close}
              className="text-sm text-red-400 hover:underline"
            >
              Cancel
            </button>

            {ready && (
              <button
                onClick={create}
                className="bg-[#48cae4] px-5 py-2 rounded-lg shadow text-[#03045e] hover:scale-105 transition"
              >
                Create
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CellCreator;

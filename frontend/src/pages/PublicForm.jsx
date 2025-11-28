import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PublicForm = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/forms/public/${formId}`)
      .then(res => res.json())
      .then(setForm);
  }, [formId]);

  const update = (q, v) => {
    setAnswers(prev => ({ ...prev, [q]: v }));
  };

  const submit = async (e) => {
    e.preventDefault();

    const payload = form.fields.map(f => ({
      question: f.question,
      value: answers[f.question] || ""
    }));

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/responses/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: payload })
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message || "Submit failed");

    setSubmitted(true);
  };

  if (!form) return <p>Loading...</p>;

  if (submitted)
    return (
      <div className="min-h-screen flex justify-center items-center font-[Paprika] text-xl text-[#03045e]">
        ✅ Your response was submitted.
      </div>
    );

  return (
    <motion.div className="min-h-screen bg-[#f1fffa] p-8 font-[Paprika]">
      <div className="max-w-2xl mx-auto bg-[#caf0f8] p-6 rounded-xl shadow">
        <h1 className="text-2xl font-[Courgette] text-[#03045e]">{form.title}</h1>
        <p className="text-sm text-[#000814]">{form.description}</p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={submit}>
          {form.fields.map((cell, i) => (
            <Field key={i} cell={cell} onChange={update} />
          ))}

          <button
            type="submit"
            className="bg-[#48cae4] text-[#03045e] py-2 rounded shadow hover:scale-105 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
};

const Field = ({ cell, onChange }) => {
  const base = "w-full p-2 rounded border outline-none";

  if (cell.type === "short" || cell.type === "long")
    return (
      <textarea
        className={base}
        onChange={(e)=>onChange(cell.question,e.target.value)}
        placeholder={cell.question}
        maxLength={cell.limit || undefined}
      />
    );

  if (cell.type === "name" || cell.type === "email" || cell.type === "mobile")
    return (
      <input
        type={cell.type === "email" ? "email" : "text"}
        placeholder={cell.question}
        onChange={(e)=>onChange(cell.question,e.target.value)}
        className={base}
      />
    );

  if (cell.type === "date" || cell.type === "dbo")
    return (
      <input
        type="date"
        min={cell.from}
        max={cell.to}
        onChange={(e)=>onChange(cell.question,e.target.value)}
        className={base}
      />
    );

  if (["radio","checkbox"].includes(cell.type))
    return (
      <div>
        <p>{cell.question}</p>
        {cell.options.map((o,i)=>(
          <label key={i} className="block">
            <input
              type={cell.type}
              name={cell.question}
              value={o}
              onChange={(e)=>onChange(cell.question,e.target.value)}
            />
            {o}
          </label>
        ))}
      </div>
    );

  if (cell.type === "dropdown")
    return (
      <select
        className={base}
        onChange={(e)=>onChange(cell.question,e.target.value)}
      >
        <option value="">Select</option>
        {cell.options.map((o,i)=>(
          <option key={i}>{o}</option>
        ))}
      </select>
    );

  return null;
};

export default PublicForm;

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Responses = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const formId = searchParams.get("form");

  useEffect(() => {
    if (!formId) {
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/responses/${formId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        setResponses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [formId]);

  const allQuestions =
    responses.length > 0
      ? responses[0].answers.map(ans => ans.question)
      : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#f1fffa] p-10 font-[Paprika]"
    >
      <div className="max-w-6xl mx-auto bg-[#caf0f8] rounded-2xl shadow-lg p-6">
        <h1 className="text-xl font-[Courgette] text-[#03045e] mb-4">
          Form Responses
        </h1>

        {!formId && (
          <p className="text-[#03045e]">
            Select a form from Dashboard to view responses.
          </p>
        )}

        {loading && <p className="text-[#03045e]">Loading...</p>}

        {!loading && formId && responses.length === 0 && (
          <p className="text-[#03045e]">No responses yet.</p>
        )}

        {!loading && responses.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#48cae4] text-[#03045e]">
                  <th className="p-3 text-left">#</th>
                  {allQuestions.map((q, i) => (
                    <th key={i} className="p-3 text-left">
                      {q}
                    </th>
                  ))}
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {responses.map((resp, i) => (
                  <tr
                    key={resp._id}
                    className="border-t border-white hover:bg-white/40 transition"
                  >
                    <td className="p-3 text-[#000814]">{i + 1}</td>
                    {resp.answers.map((a, j) => (
                      <td
                        key={j}
                        className="p-3 text-[#000814] break-words"
                      >
                        {a.value}
                      </td>
                    ))}
                    <td className="p-3 text-[#000814]">
                      {new Date(resp.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Responses;

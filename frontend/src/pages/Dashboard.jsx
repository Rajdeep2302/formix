import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormCard from "../components/FormCard";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const [stats, setStats] = useState({ totalForms: 0, totalResponses: 0, liveForms: 0 });
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/summary`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(setStats);

    fetch(`${import.meta.env.VITE_API_URL}/api/forms/my`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(setForms);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-[Courgette] text-[#03045e]">
          Dashboard Overview
        </h1>

        <button
          onClick={() => navigate("/NewForm")}
          className="bg-[#48cae4] px-6 py-2 rounded-lg shadow hover:scale-105 transition font-medium text-[#03045e]"
        >
          + Create Form
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard label="Total Forms" value={stats.totalForms} />
        <StatCard label="Responses" value={stats.totalResponses} />
        <StatCard label="Live Forms" value={stats.liveForms} />
      </div>

      <h2 className="text-lg font-[Paprika] text-[#03045e] mb-4">
        Your Forms
      </h2>

      {forms.length === 0 && (
        <p className="text-sm text-[#03045e]">No forms created yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form) => (
          <FormCard
            key={form._id}
            title={form.title}
            status={form.published ? "Live" : "Draft"}
            id={form._id}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;

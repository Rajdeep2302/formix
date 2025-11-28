import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 h-screen bg-[#48cae4] flex flex-col px-6 py-8 shadow-xl"
    >
      <h1 className="text-xl font-[Stalinist One] text-[#03045e] tracking-widest mb-10 select-none">
        FORMIX
      </h1>

      <nav className="flex flex-col gap-4 text-[#000814]">
        <NavLink
          to="/Dashboard"
          className={({ isActive }) =>
            `px-4 py-3 rounded-xl bg-[#caf0f8] shadow hover:scale-[1.04] transition font-medium ${
              isActive ? "ring-2 ring-[#03045e]" : ""
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/NewForm"
          className={({ isActive }) =>
            `px-4 py-3 rounded-xl bg-[#caf0f8] shadow hover:scale-[1.04] transition font-medium ${
              isActive ? "ring-2 ring-[#03045e]" : ""
            }`
          }
        >
          New Form
        </NavLink>

        <NavLink
          to="/Responses"
          className={({ isActive }) =>
            `px-4 py-3 rounded-xl bg-[#caf0f8] shadow hover:scale-[1.04] transition font-medium ${
              isActive ? "ring-2 ring-[#03045e]" : ""
            }`
          }
        >
          Responses
        </NavLink>
      </nav>

      <div className="mt-auto">
        <button
          onClick={logout}
          className="w-full bg-[#03045e] text-[#caf0f8] py-3 rounded-xl shadow-lg hover:scale-[1.04] transition font-semibold"
        >
          Logout
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

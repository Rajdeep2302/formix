import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreateAccount = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) return alert("All fields are required");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message || "Registration failed");

      alert("Account created. Login now.");
      navigate("/");
    } catch {
      alert("Server not reachable");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-screen bg-[#f1fffa] flex justify-center items-center"
    >
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-[#caf0f8]/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-[Stalinist One] text-[#03045e] tracking-wider mb-4">
            FORMIX
          </h1>
          <p className="font-[Paprika] text-[#03045e] leading-relaxed">
            One account.
            <br />
            All your forms.
            <br />
            Zero confusion.
          </p>
        </div>

        <div className="p-10 bg-white/40 backdrop-blur-lg">
          <h2 className="text-xl font-[Courgette] text-[#03045e] mb-6">
            Create your account
          </h2>

          <form className="flex flex-col gap-5" onSubmit={register}>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-white outline-none border border-white shadow focus:ring-2 focus:ring-[#48cae4] font-[Paprika] text-[#000814]"
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-white outline-none border border-white shadow focus:ring-2 focus:ring-[#48cae4] font-[Paprika] text-[#000814]"
            />

            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-white outline-none border border-white shadow focus:ring-2 focus:ring-[#48cae4] font-[Paprika] text-[#000814]"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 cursor-pointer text-[#03045e] text-sm"
              >
                {show ? "HIDE" : "SHOW"}
              </span>
            </div>

            <button
              type="submit"
              className="bg-[#48cae4] text-[#03045e] py-3 rounded-lg shadow hover:scale-105 transition font-semibold"
            >
              Create Account
            </button>
          </form>

          <div className="mt-5 text-center font-[Paprika] text-sm text-[#03045e]">
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer hover:underline"
            >
              Already have an account?
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateAccount;

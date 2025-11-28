import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) return alert("Email and password required");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      navigate("/Dashboard");
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
            Create powerful forms.
            <br />
            Collect responses.
            <br />
            Stay organized.
          </p>
        </div>

        <div className="p-10 bg-white/40 backdrop-blur-lg">
          <h2 className="text-xl font-[Courgette] text-[#03045e] mb-6">
            Login to your dashboard
          </h2>

          <form className="flex flex-col gap-5" onSubmit={login}>
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
              Login
            </button>
          </form>

          <div className="flex justify-between mt-5 font-[Paprika] text-sm text-[#03045e]">
            <span
              onClick={() => navigate("/CreateAccount")}
              className="cursor-pointer hover:underline"
            >
              Create account
            </span>
            <span className="cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;

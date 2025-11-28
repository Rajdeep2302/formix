import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/Dashboard";
import NewForm from "./pages/NewForm";
import Responses from "./pages/Responses";
import LandingLayout from "./layouts/LandingLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import PublicForm from "./pages/PublicForm";

const App = () => {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
      </Route>

      <Route path="/form/:formId" element={<PublicForm />} />

      <Route element={<DashboardLayout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/NewForm" element={<NewForm />} />
      <Route path="/Responses" element={<Responses />} />
    </Routes>
  );
};

export default App;

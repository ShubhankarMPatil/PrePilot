import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Calendar from "../pages/Calendar";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import ExamCenter from "../pages/ExamCenter";
import Results from "../pages/Results";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/exam-center" element={<ExamCenter />}/>
      <Route path="/results" element={<Results />}/>
    </Routes>
  );
}
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Calendar from "../pages/Calendar";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
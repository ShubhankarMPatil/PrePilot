import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Calendar from "../pages/Calendar";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import ExamCenter from "../pages/ExamCenter";
import Results from "../pages/Results";
import KnowledgeBase from "../pages/KnowledgeBase";
import Practice from "../pages/Practice";
import Review from "../pages/Review";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/exam-center/" element={<ExamCenter />}/>
      <Route path="/exam-center/:testId" element={<ExamCenter />}/>
      <Route path="/knowledge-base" element={<KnowledgeBase />}/>
      <Route path="/practice" element={<Practice />}/>
      <Route path="/results/:testId" element={<Results />}/>
      <Route path="/review/:testId" element={<Review />}/>
    </Routes>
  );
}
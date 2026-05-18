import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import NotFoundPage from "../pages/NotFoundPage";
import Layout from "../layout/Layout";
import TestPage from "../pages/TestPage";
import HistoryPage from "../pages/HistoryPage";
import LeaderboardPage from "../pages/LeaderboardPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;

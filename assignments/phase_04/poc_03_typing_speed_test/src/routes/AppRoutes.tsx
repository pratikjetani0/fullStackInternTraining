import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import NotFoundPage from "../pages/NotFoundPage";
import Layout from "../layout/Layout";
import TestPage from "../pages/TestPage";
import HistoryPage from "../pages/HistoryPage";
import LeaderboardPage from "../pages/LeaderboardPage";
import RouteGuard from "../components/RouteGuard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route
          path="login"
          element={
            <RouteGuard requireAuth={false}>
              <LoginPage />
            </RouteGuard>
          }
        />
        <Route
          path="signup"
          element={
            <RouteGuard requireAuth={false}>
              <SignupPage />
            </RouteGuard>
          }
        />

        <Route
          path="test"
          element={
            <RouteGuard requireAuth>
              <TestPage />
            </RouteGuard>
          }
        />
        <Route
          path="history"
          element={
            <RouteGuard requireAuth>
              <HistoryPage />
            </RouteGuard>
          }
        />
        <Route
          path="leaderboard"
          element={
            <RouteGuard requireAuth>
              <LeaderboardPage />
            </RouteGuard>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;

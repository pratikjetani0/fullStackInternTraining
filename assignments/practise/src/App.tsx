import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";

const App = () => {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
    </Routes>
  );
};

export default App;
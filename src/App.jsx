import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import TraineeDashboard from "./pages/trainee/TraineeDashboard";
import SupervisorDashboard from "./pages/supervisor/SupervisorDashboard";
import SupervisorAssessment from "./pages/supervisor/SupervisorAssessment";
import SupervisorHistory from "./pages/supervisor/SupervisorHistory";
import GMDashboard from "./pages/gm/GMDashboard";
import GMMonitoring from "./pages/gm/GMMonitoring";
import GMTraineeDetail from "./pages/gm/GMTraineeDetail";
import GuidePage from "./pages/guide/GuidePage";

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  const home = { trainee: "/trainee", supervisor: "/supervisor", gm: "/gm" }[user.role];
  return <Navigate to={home} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Panduan penggunaan — bisa diakses tanpa login */}
          <Route path="/panduan/:role" element={<GuidePage />} />

          <Route
            path="/trainee"
            element={
              <ProtectedRoute roles={["trainee"]}>
                <TraineeDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/supervisor"
            element={
              <ProtectedRoute roles={["supervisor"]}>
                <SupervisorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supervisor/nilai/:traineeId"
            element={
              <ProtectedRoute roles={["supervisor"]}>
                <SupervisorAssessment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supervisor/riwayat"
            element={
              <ProtectedRoute roles={["supervisor"]}>
                <SupervisorHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/gm"
            element={
              <ProtectedRoute roles={["gm"]}>
                <GMDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gm/monitoring"
            element={
              <ProtectedRoute roles={["gm"]}>
                <GMMonitoring />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gm/trainee/:traineeId"
            element={
              <ProtectedRoute roles={["gm"]}>
                <GMTraineeDetail />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
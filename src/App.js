import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./hooks/ProtectedRoute";
import FeedPage from "./pages/feed/FeedPage";
import LoginPage from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/auth/RegisterPage";
import AuthLayout from "./pages/auth/AuthLayout";
import FeedLayout from "./pages/feed/FeedLayout";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <FeedLayout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth/login"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />
      <Route
        path="/auth/register"
        element={
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <FeedLayout>
              <ProfilePage />
            </FeedLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

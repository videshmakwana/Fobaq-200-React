import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/style.scss";
import FallBack from "./ErrorBoundary/FallBack";
import UserProtectedRoutes from "./ProtectedRoute/ProtectedRoute";

const ErrorBoundary = lazy(() => import("./ErrorBoundary/ErrorBoundary.js"));
const Login = lazy(() => import("./components/Login/Login"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const Signup = lazy(() => import("./components/Login/Signup"));
const ForgetPassword = lazy(() => import("./components/Login/ForgetPassword"));
const SetPassword = lazy(() => import("./components/Login/SetPassword"));

const App = () => {
  return (
    <ErrorBoundary fallbackUI={<FallBack />}>
      <Suspense>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="password/forget" element={<ForgetPassword />} />
            <Route path="reset-password" element={<SetPassword />} />
            <Route
              path="dashboard"
              element={<UserProtectedRoutes element={<Dashboard />} />}
            />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;

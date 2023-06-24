import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/style.scss";
import FallBack from "./ErrorBoundary/FallBack";

const ErrorBoundary = lazy(() => import("./ErrorBoundary/ErrorBoundary.js"));
const Login = lazy(() => import("./components/Login/Login"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const Signup = lazy(() => import("./components/Login/Signup"));
const ResetPassword = lazy(() => import("./components/Login/ResetPassword"));

const App = () => {
  return (
    <ErrorBoundary fallbackUI={<FallBack />}>
      <Suspense>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="password/forget" element={<ResetPassword />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;

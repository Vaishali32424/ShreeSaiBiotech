import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AUTH_TOKEN_KEY = "shreesaibiotech-dashboard-token";
const AUTH_TOKEN_EXPIRY_KEY = "shreesaibiotech-dashboard-token-expiry";
const VALID_IDENTIFIER = "shreesaibiotech.in";
const VALID_PHONE = "8989496905";
const VALID_PASSWORD = "Navin@1122";

export const isDashboardAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
  const expiryValue = window.localStorage.getItem(AUTH_TOKEN_EXPIRY_KEY);

  if (!token || !expiryValue) {
    return false;
  }

  const expiry = Number(expiryValue);

  if (Number.isNaN(expiry) || Date.now() > expiry) {
    clearDashboardAuth();
    return false;
  }

  return true;
};

export const clearDashboardAuth = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_TOKEN_EXPIRY_KEY);
};

export const loginToDashboard = (identifier: string, password: string) => {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const normalizedPassword = password.trim();

  const isValidIdentifier =
    normalizedIdentifier === VALID_IDENTIFIER ||
    normalizedIdentifier === VALID_PHONE;

  if (!isValidIdentifier || normalizedPassword !== VALID_PASSWORD) {
    return false;
  }

  const expiryTime = Date.now() + 60 * 60 * 1000;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(AUTH_TOKEN_KEY, "dashboard-authenticated");
    window.localStorage.setItem(AUTH_TOKEN_EXPIRY_KEY, String(expiryTime));
  }

  return true;
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  if (!isDashboardAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fromPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/dashboard";

  if (isDashboardAuthenticated()) {
    return <Navigate to={fromPath} replace />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (loginToDashboard(identifier, password)) {
      navigate(fromPath, { replace: true });
      return;
    }

    setError("Invalid credentials. Please try again.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard Access</h1>
          <p className="mt-2 text-sm text-slate-600">
            Login to access protected dashboard pages.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="identifier">
              Email or Phone
            </label>
            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-slate-500"
              placeholder="ID or Phone"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-slate-500"
              placeholder="Enter password"
              required
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

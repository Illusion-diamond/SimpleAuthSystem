import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        <p className="mt-4 text-gray-300">Welcome back, {user?.name || user?.email || "User"}.</p>
      </div>
    </div>
  );
};

export default Dashboard;

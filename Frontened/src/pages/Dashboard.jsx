import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Profile from "../components/Profile";
import Branches from "./Branches";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const email = user?.email;
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [commits, setCommits] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userRes, commitsRes] = await Promise.all([
          fetch(`http://localhost:5000/api/auth/admin?email=${email}`),
          fetch("http://localhost:5000/api/github-webhook/all-commits/")
        ]);

        const userJson = await userRes.json();
        const commitsJson = await commitsRes.json();

        setUserData(userJson);
        setCommits(commitsJson);

        const branchRes = await fetch(
          `https://gitlab.com/api/v4/projects/${user.repoUrlEncode}/repository/branches`
        );
        const branchJson = await branchRes.json();
        setBranches(branchJson);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (email) fetchDashboardData();
  }, [email, user?.repoUrlEncode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium animate-pulse text-slate-700">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100">

      {/* Navbar */}
      <nav className="w-full bg-white/70 backdrop-blur-md border-b border-slate-200 shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">

          {/* Left Logo + Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Admin Dashboard
            </h1>
          </div>

          {/* Middle Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
            <button className="hover:text-indigo-600 transition" onClick={() => navigate("/merge-requests", { state: { repoUrlEncode: user?.repoUrlEncode } })}>Merge requests</button>
            <button
              className="hover:text-indigo-600 transition"
              onClick={() => navigate("/merge-activity", { state: { repoUrlEncode: user?.repoUrlEncode } })}
            >
              Merge Activity
            </button>

          </div>

          {/* Right Side - User Info */}
          <div className="flex items-center gap-4">

            {/* Desktop Name + Email */}
            <div className="text-right hidden sm:block">
              <p className="font-semibold text-slate-700">{userData?.name}</p>
              <p className="text-slate-500 text-sm">{userData?.email}</p>
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
              {userData?.name?.charAt(0)?.toUpperCase()}
            </div>
          </div>

        </div>
      </nav>



      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex flex-col gap-10">

        {/* Profile Section
        <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-6 sm:p-10 hover:shadow-2xl transition-shadow duration-300 border border-white/30">
          {userData && (
            <Profile
              name={userData.name}
              email={userData.email}
              company={userData.company}
              designation={userData.designation}
            />
          )}
        </div> */}

        {/* Branch Tabs */}
        <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-6 sm:p-10 hover:shadow-2xl transition-shadow duration-300 border border-white/30">
          <Branches branches={branches} repoUrlEncode={user?.repoUrlEncode} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

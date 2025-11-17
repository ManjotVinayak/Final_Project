import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Commits from "../components/Commits";
import Meter from "../components/Meter";
import Profile from "../components/Profile";
import Branch from "../components/Branch";
import Branches from "./Branches";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const email = user?.email;

  const [userData, setUserData] = useState(null);
  const [commits, setCommits] = useState([]);
  const [branches, setBranches] = useState([]);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch user + commits in parallel
        const [userRes, commitsRes] = await Promise.all([
          fetch(`http://localhost:5000/api/auth/admin?email=${email}`),
          fetch("http://localhost:5000/api/github-webhook/all-commits/")
        ]);

        const userJson = await userRes.json();
        const commitsJson = await commitsRes.json();

        setUserData(userJson);
        setCommits(commitsJson);

        // Fetch branches from GitLab
        const branchRes = await fetch(
          `https://gitlab.com/api/v4/projects/${user.repoUrlEncode}/repository/branches`
        );
        const branchJson = await branchRes.json();
        setBranches(branchJson);  // <-- FIXED
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
      <div className="flex justify-center items-center min-h-screen text-lg font-medium">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50">
      {/* Header */}
      <div className="w-full py-10 px-6 sm:px-12 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent mb-3">
            ML Pipeline Monitor
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto sm:mx-0">
            Real-time monitoring and collaboration dashboard
          </p>
          <div className="mt-6 h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto sm:mx-0"></div>
        </div>
      </div>

      {/* Profile */}
      {userData && (
        <Profile
          name={userData.name}
          email={userData.email}
          company={userData.company}
          designation={userData.designation}
        />
      )}

      {/* Branch Tabs Component */}
      <Branches branches={branches} repoUrlEncode={user?.repoUrlEncode} />
    </div>
  );
};

export default Dashboard;

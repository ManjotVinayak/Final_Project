import Commits from "../components/Commits";
import Meter from "../components/Meter";
import Profile from "../components/Profile";

const Dashboard = ( {email} ) => {
  const userData= async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/admin/${email}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return {};
    }
  }

  const commits = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/github-webhook/all-commits/');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching commits:', error);
      return [];
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50">
      {/* Unified Header Section */}
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

      {/* Profile Section */}
      <div className="w-full py-10 px-6 sm:px-12 space-y-8">
        <Profile {...userData} />
        <Meter status="warning" lastUpdated="Just now" />
        <Commits commits={commits} />
      </div>
    </div>
  );
};

export default Dashboard;

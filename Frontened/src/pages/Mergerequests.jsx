import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GitMerge, User, Clock, ArrowLeft } from "lucide-react";

const MergeRequests = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get repoUrlEncode from navbar
  const repoUrlEncode = location.state?.repoUrlEncode;

  const [merges, setMerges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!repoUrlEncode) {
      setLoading(false);
      return;
    }

    async function loadMergeRequests() {
      try {
        const res = await fetch(
          `https://gitlab.com/api/v4/projects/${repoUrlEncode}/merge_requests?order_by=updated_at&sort=desc`
        );

        const data = await res.json();
        setMerges(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching merge requests:", err);
      } finally {
        setLoading(false);
      }
    }

    loadMergeRequests();
  }, [repoUrlEncode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-slate-600">
        Loading merge activity...
      </div>
    );
  }

  if (!repoUrlEncode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <p className="text-2xl font-semibold text-red-500">
          No repository selected
        </p>
        <p className="text-slate-500 mt-2">
          Navigate via the dashboard so repo details are passed correctly.
        </p>
        <button
          className="mt-6 px-6 py-3 rounded-xl bg-blue-600 text-white shadow hover:bg-blue-700"
          onClick={() => navigate("/dashboard")}
        >
          Go Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 p-6 sm:p-12">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Page Heading */}
        <div>
          <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
            <GitMerge className="w-9 h-9 text-purple-600" />
            Merge Activity
          </h1>
          <p className="text-slate-500 mt-2">
            Viewing merge-requests for this repository.
          </p>
        </div>

        {/* Merge List */}
        <div className="space-y-6">
          {merges.length > 0 ? (
            merges.map((mr) => (
              <div
                key={mr.id}
                className="p-6 bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all"
              >
                {/* Title */}
                <h2 className="text-lg font-semibold text-slate-900 mb-2">
                  {mr.title}
                </h2>

                {/* Info line */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">

                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {mr.author?.name}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(mr.updated_at).toLocaleString()}
                  </span>

                  <span className="px-2 py-1 rounded-lg bg-purple-100 text-purple-700">
                    Merge → {mr.target_branch}
                  </span>

                  <span className="px-2 py-1 rounded-lg bg-blue-100 text-blue-700">
                    Source: {mr.source_branch}
                  </span>
                </div>

                {/* Extra details */}
                <p className="text-xs text-slate-500 mt-3">
                  MR ID: {mr.iid} • Project ID: {mr.project_id}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-500 text-lg border border-slate-300 rounded-xl bg-white">
              No merged merge-requests found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MergeRequests; 
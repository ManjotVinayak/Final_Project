import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GitMerge, GitBranch, Clock, ArrowLeft } from "lucide-react";

const MergeActivity = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const repoUrlEncode = location.state?.repoUrlEncode;
  const [mergeCommits, setMergeCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!repoUrlEncode) {
      setLoading(false);
      return;
    }

    const loadMergeCommits = async () => {
      try {
        // Fetch commits of main branch
        const res = await fetch(
          `https://gitlab.com/api/v4/projects/${repoUrlEncode}/repository/commits?ref_name=main`
        );

        const data = await res.json();

        // Filter actual merge commits (multiple parents OR "Merge branch" title)
        const merges = data.filter(
          (c) =>
            (c.parent_ids && c.parent_ids.length > 1) ||
            c.title.startsWith("Merge branch") ||
            c.title.startsWith("Merge remote")
        );

        // Extract source branch from commit message if present
        const formatted = merges.map((m) => {
          const match = m.title.match(/['"](.*?)['"]/); // extract branch name
          return {
            ...m,
            sourceBranch: match ? match[1] : "Unknown",
          };
        });

        setMergeCommits(formatted);
      } catch (err) {
        console.error("Error loading merge commits:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMergeCommits();
  }, [repoUrlEncode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-slate-600">
        Loading merge history...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 p-6 sm:p-12">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
            <GitMerge className="w-9 h-9 text-purple-600" />
            Main Branch Merge History
          </h1>
          <p className="text-slate-500 mt-2">
            This shows actual merge commits applied to <strong>main</strong>.
          </p>
        </div>

        {/* Merge Cards */}
        <div className="space-y-6">
          {mergeCommits.length > 0 ? (
            mergeCommits.map((commit) => (
              <div
                key={commit.id}
                className="p-6 bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all"
              >
                <h2 className="text-lg font-semibold text-slate-900">
                  {commit.title}
                </h2>

                {/* Branch + Time */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mt-3">
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-4 h-4 text-purple-600" />
                    Merger: 
                    <span className="font-medium text-purple-700">
                      {commit.author_name}
                    </span>
                  </span>

                  <span className="px-2 py-1 rounded-lg bg-green-100 text-green-700">
                    Merged into main
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(commit.created_at).toLocaleString()}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-3">
                  Commit ID: {commit.id.slice(0, 8)}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-500 text-lg border border-slate-300 rounded-xl bg-white">
              No merges detected on main.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MergeActivity;

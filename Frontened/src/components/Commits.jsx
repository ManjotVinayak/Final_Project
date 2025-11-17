import { GitCommit, Clock, User } from "lucide-react";
import { useState, useEffect } from "react";

const Commits = ({ repoUrlEncode, branch }) => {
  const [commits, setCommits] = useState([]);
  const hasCommits = commits.length > 0;

  useEffect(() => {
    if (!repoUrlEncode || !branch) {
      setCommits([]);
      return;
    } 
    let mounted = true;
    async function loadCommits() {
      try {
        const res = await fetch(
          `https://gitlab.com/api/v4/projects/${repoUrlEncode}/repository/commits?ref_name=${branch}`
        );  
        const data = await res.json();
        if (!mounted) return;
        setCommits(Array.isArray(data) ? data : []);
      }
      catch (err) {
        console.error("Error fetching commits:", err);
        if (mounted) {
          setCommits([]);
        }
      }
    }
    loadCommits();
    return () => {
      mounted = false;
    };
  }, [repoUrlEncode, branch]);

  return (
    <div className="glass-card rounded-2xl p-6 shadow-2xl bg-white border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <GitCommit className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-slate-900">Recent Commits</h3>
        <span className="ml-auto text-sm text-slate-500">
          {hasCommits ? `${commits.length} commits` : "No commits"}
        </span>
      </div>

      {hasCommits ? (
        <div className="space-y-3">
          {commits.map((commit, index) => (
            <div
              key={commit.id || index}
              className="group relative flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all duration-200 border border-slate-200"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <GitCommit className="w-4 h-4 text-blue-600" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 mb-1 truncate">
                  {commit.title || commit.message}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-500" />
                    <span>{commit.author_name || "Unknown"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{new Date(commit.created_at).toLocaleDateString()}</span>
                  </div>
                  <code className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-mono">
                    {commit.short_id}
                  </code>
                </div>
              </div>

              {index === 0 && (
                <span className="absolute -top-2 -right-2 px-2 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full">
                  Latest
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-slate-500 text-sm border border-dashed border-slate-300 rounded-xl">
          No commits available yet.
        </div>
      )}
    </div>
  );
};

export default Commits;

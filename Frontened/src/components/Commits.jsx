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
        if (mounted) {
          setCommits(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Error fetching commits:", err);
        if (mounted) setCommits([]);
      }
    }

    loadCommits();
    return () => (mounted = false);
  }, [repoUrlEncode, branch]);

  return (
    <div className="rounded-2xl p-8 bg-white/60 backdrop-blur-xl border border-slate-200 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <GitCommit className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-slate-800">Recent Commits</h3>
        <span className="ml-auto text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
          {hasCommits ? `${commits.length} commits` : "No commits"}
        </span>
      </div>

      {hasCommits ? (
        <div className="space-y-4">
          {commits.map((commit, index) => (
            <div
              key={commit.id || index}
              className="relative p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition duration-200 flex items-start gap-4"
            >
              {/* Icon */}
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <GitCommit className="w-5 h-5 text-blue-600" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-slate-900 font-semibold truncate text-sm mb-1">
                  {commit.title || commit.message}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {commit.author_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(commit.created_at).toLocaleString()}
                  </span>

                  <code className="px-2 py-1 bg-slate-200 rounded text-slate-800 font-mono text-xs">
                    {commit.short_id}
                  </code>
                </div>
              </div>

              {/* Latest Badge */}
              {index === 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-blue-600 text-white px-3 py-1 rounded-full shadow-md">
                  Latest
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-slate-500 bg-slate-100 border border-dashed border-slate-300 rounded-xl">
          No commits found for this branch.
        </div>
      )}
    </div>
  );
};

export default Commits;

import { GitBranch } from "lucide-react";
import { useEffect, useState } from "react";

const Branch = ({ branch }) => {
  const [commitDetails, setCommitDetails] = useState(null);

  useEffect(() => {
    if (!branch?.commit?.url) return;

    async function loadCommitDetails() {
      try {
        const res = await fetch(branch.commit.url);
        const data = await res.json();
        setCommitDetails(data);
      } catch (err) {
        console.error("Error loading commit details:", err);
      }
    }

    loadCommitDetails();
  }, [branch]);

  return (
    <div className="rounded-2xl p-8 bg-white/60 backdrop-blur-xl border border-slate-200 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <GitBranch className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-slate-800">
          Branch Details
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        
        {/* Branch Name */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">Name</p>
          <p className="font-semibold text-slate-800">{branch.name}</p>
        </div>

        {/* Last Commit SHA */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">Last Commit SHA</p>
          <p className="font-semibold text-slate-800">
            {branch.commit?.sha?.substring(0, 7) || "N/A"}
          </p>
        </div>

        {/* Author */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">Author</p>
          <p className="font-semibold text-slate-800">
            {commitDetails?.commit?.author?.name || "Loading..."}
          </p>
        </div>

        {/* Commit Time */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500">Last Updated</p>
          <p className="font-semibold text-slate-800">
            {commitDetails?.commit?.author?.date
              ? new Date(commitDetails.commit.author.date).toLocaleString()
              : "Loading..."}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Branch;

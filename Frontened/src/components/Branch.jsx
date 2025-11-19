import { GitBranch } from "lucide-react";

const Branch = ({ branch }) => {
  if (!branch) return null;

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
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-slate-500">Name</p>
          <p className="font-semibold text-slate-800">{branch.name}</p>
        </div>

        {/* Last Commit ID */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-slate-500">Last Commit</p>
          <p className="font-semibold text-slate-800">
            {branch.commit?.short_id || "N/A"}
          </p>
        </div>

        {/* Author */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-slate-500">Author</p>
          <p className="font-semibold text-slate-800">
            {branch.commit?.author_name || "N/A"}
          </p>
        </div>

        {/* Commit Time */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-slate-500">Last Updated</p>
          <p className="font-semibold text-slate-800">
            {branch.commit?.committed_date
              ? new Date(branch.commit.committed_date).toLocaleString()
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Branch;

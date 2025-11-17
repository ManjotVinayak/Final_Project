import { GitBranch } from "lucide-react";
import { useEffect, useState } from "react";

const Branch = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await fetch("https://gitlab.com/api/v4/projects/75592213/repository/branches"); 
        const data = await res.json();
        setBranches(data);
      } catch (err) {
        console.error("Error fetching branches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-lg font-medium">
        Loading Branches...
      </div>
    );
  }

  if (branches.length === 0) {
    return (
      <div className="text-center text-slate-500 italic py-10">
        No branches found.
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-lg hover:shadow-xl transition-all duration-300 p-6">
      <div className="flex items-center gap-3 mb-4">
        <GitBranch className="w-5 h-5 text-blue-600" />
        <h2 className="text-2xl font-bold text-slate-800">Repository Branches</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map((branch, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-slate-200 p-4 hover:shadow-md bg-white transition-all"
          >
            <p className="text-slate-800 font-semibold">{branch.name}</p>
            <p className="text-slate-500 text-sm mt-1">
              Last commit: {branch.commit?.sha?.slice(0, 7) || "—"}
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Committed: {branch.commit?.committed_date ? new Date(branch.commit.committed_date).toLocaleString() : "—"}
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Author: {branch.commit?.author_name || "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Branch;

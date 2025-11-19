import React, { useState } from "react";
import Meter from "../components/Meter";
import Commits from "../components/Commits";
import Branch from "../components/Branch";

const Branches = ({ branches, repoName, repoOwner }) => {
    const [activeBranch, setActiveBranch] = useState(
        branches?.[0]?.name || ""
    );

    if (!branches || branches.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                No branches found.
            </div>
        );
    }

    return (
        <div className="w-full mt-10">
            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-300 px-6 sm:px-12">
                {branches.map((branch) => (
                    <button
                        key={branch.name}
                        onClick={() => setActiveBranch(branch.name)}
                        className={`py-3 px-2 -mb-px font-medium
              ${activeBranch === branch.name
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-500"
                            }`}
                    >
                        {branch.name}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="w-full py-10 px-6 sm:px-12 space-y-8">
                {branches.map((branch) =>
                    activeBranch === branch.name ? (
                        <div key={branch.name}>
                            {/* Branch Specific Content */}
                            {/* <Meter status="warning" lastUpdated="Just now" /> */}
                            <Commits
                                branch={branch.name}
                                repoName={repoName}
                                repoOwner={repoOwner}
                            />
                            {/* Branch details */}
                            <Branch branch={branch} />
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
};

export default Branches;

import React from 'react';

const commitsData = [
  {
    sha: 'a1b2c3d',
    message: 'Fix: resolved login bug',
    author: 'Jane Doe',
    date: '2025-10-10T14:23:00Z',
    url: 'https://github.com/user/repo/commit/a1b2c3d',
  },
  {
    sha: 'f4e5d6c',
    message: 'Feat: add signup validation',
    author: 'John Smith',
    date: '2025-10-09T11:45:00Z',
    url: 'https://github.com/user/repo/commit/f4e5d6c',
  },
  {
    sha: '789abc1',
    message: 'Docs: update README',
    author: 'Alice Johnson',
    date: '2025-10-08T09:10:00Z',
    url: 'https://github.com/user/repo/commit/789abc1',
  },
  {
    sha: '456def7',
    message: 'Refactor: optimize API calls',
    author: 'Bob Brown',
    date: '2025-10-07T16:30:00Z',
    url: 'https://github.com/user/repo/commit/456def7',
  },
  {
    sha: '123abc4',
    message: 'Chore: update dependencies',
    author: 'Charlie Green',
    date: '2025-10-06T10:00:00Z',
    url: 'https://github.com/user/repo/commit/123abc4',
  },
];

const formatDate = (isoString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(isoString).toLocaleDateString(undefined, options);
};

const Commits = () => {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Last 5 Commits</h2>
      <ul className="divide-y divide-gray-200">
        {commitsData.map(({ sha, message, author, date, url }) => (
          <li key={sha} className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline truncate max-w-xs"
              title={message}
            >
              {message}
            </a>
            <div className="text-gray-600 text-sm sm:text-right mt-1 sm:mt-0 space-x-4">
              <span>{author}</span>
              <span>{formatDate(date)}</span>
              <span className="font-mono text-gray-500">{sha.substring(0, 7)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Commits;

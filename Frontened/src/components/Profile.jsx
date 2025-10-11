import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Using react-icons for profile icon

const Profile = () => {
  const user = {
    username: 'John Doe',
    email: 'john.doe@example.com',
    company: 'Awesome Co.',
    designation: 'Software Engineer',
  };

  return (
    <div className="flex items-center space-x-6">
      {/* Profile Icon / Picture */}
      <FaUserCircle className="text-gray-400 w-20 h-20" />

      {/* User Details */}
      <div className="flex flex-col space-y-1">
        <h2 className="text-xl font-semibold text-gray-800">{user.username}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">{user.company}</p>
        <p className="text-gray-600 italic">{user.designation}</p>
      </div>
    </div>
  );
};

export default Profile;

import { Building2, Briefcase } from "lucide-react";

const Profile = ({ username, company, designation, profileImage }) => {
  const initials = username.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-lg hover:shadow-xl transition-all duration-300 p-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-blue-500/30">
          {profileImage ? (
            <img
              src={profileImage}
              alt={username}
              className="aspect-square h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl font-semibold">
              {initials}
            </div>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {username}
          </h2>
          <div className="flex flex-col sm:flex-row sm:gap-6 gap-2 justify-center sm:justify-start text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-blue-600/70" />
              <span>{company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-blue-600/70" />
              <span>{designation}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

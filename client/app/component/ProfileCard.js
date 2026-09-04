export default function ProfileCard({ user, profileImage }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-8 flex items-center gap-8 shadow-lg">
 {/* <div className="h-60 bg-gradient-to-r from-green-500 via-green-700 to-black"></div>
 <div className="px-10 pb-10 relative "> */}
      <img
        src={user.profileImage ||  "https://i.pravatar.cc/200"}
        alt="Profile"
        className="w-36 h-36 rounded-full object-cover border-4 border-green-500"
      />

      <div className="pt-28">
        <p className="uppercase text-sm text-gray-400">
          Profile
        </p>

        <h1 className="text-5xl font-bold mt-2">
          {user.name}
        </h1>

        <p className="text-gray-400 mt-2">
          {user.email}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Beatly User
        </p>

      </div>

    </div>
   
  );
}
export default function EditProfileForm({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  updateProfile,
  profileImage,
  setProfileImage,
  selectedFile,
  setSelectedFile,
}) {
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);

      const preview = URL.createObjectURL(file);
      setProfileImage(preview);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-2xl p-8 mt-8 shadow-lg">

      <h2 className="text-3xl font-bold mb-8 text-center">
        Edit Profile
      </h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-8">

        <img
          src={profileImage || "/default-user.png"}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-green-500"
        />

        {/* Hidden File Input */}

        <input
          type="file"
          id="profileImage"
          accept="image/* "
          className="hidden"
          onChange={handleImage}
        />

        {/* Custom Button */}

        <label
          htmlFor="profileImage"
          className="mt-5 cursor-pointer bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-semibold transition"
        >
          📷 Change Photo
        </label>

      </div>

      {/* Name */}

      <input
        className="w-full p-3 rounded-lg bg-zinc-800 mb-4 outline-none"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Email */}

      <input
        className="w-full p-3 rounded-lg bg-zinc-800 mb-4 outline-none"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}

      <input
        type="password"
        className="w-full p-3 rounded-lg bg-zinc-800 mb-6 outline-none"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Save Button */}

      <button
        onClick={updateProfile}
        className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg text-lg font-bold transition"
      >
        Save Changes
      </button>

    </div>
  );
}
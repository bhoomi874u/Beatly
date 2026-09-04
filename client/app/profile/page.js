"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import ProfileCard from "../component/ProfileCard";
import ProfileStats from "../component/ProfileStats";
import EditProfileForm from "../component/EditProfileForm";
import RecentSongs from "../component/RecentSongs";
import PlaylistSection from "../component/PlaylistSection";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [favorites, setFavorites] = useState([]);
  const [recent, setRecent] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const [profileImage, setProfileImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH PROFILE =================

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    console.log("TOKEN =", token);

    if (!token) {
      setError("You are not logged in.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        " https://beatly-efuo.onrender.com/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("PROFILE DATA:", res.data);

      setUser(res.data);
      setName(res.data.name || "");
      setEmail(res.data.email || "");
      setProfileImage(res.data.profileImage || "");

    } catch (error) {
      console.log("PROFILE ERROR:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      setError(
        error.response?.data?.message ||
        "Unable to load profile."
      );

    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH STATS =================

  const fetchStats = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {

      const favoriteRes = await axios.get(
        " https://beatly-efuo.onrender.com/api/favorite",
        config
      );

      const recentRes = await axios.get(
        " https://beatly-efuo.onrender.com/api/recent",
        config
      );

      const playlistRes = await axios.get(
        " https://beatly-efuo.onrender.com/api/playlist",
        config
      );

      console.log("Favorites:", favoriteRes.data);
      console.log("Recent:", recentRes.data);
      console.log("Playlists:", playlistRes.data);

      setFavorites(
        Array.isArray(favoriteRes.data)
          ? favoriteRes.data
          : []
      );

      setRecent(
        Array.isArray(recentRes.data)
          ? recentRes.data
          : []
      );

      setPlaylists(
        Array.isArray(playlistRes.data)
          ? playlistRes.data
          : []
      );

    } catch (error) {

      console.log("STATS ERROR:", error);

      // Stats fail hone par profile ko loading mein mat rakho.
      setFavorites([]);
      setRecent([]);
      setPlaylists([]);
    }
  };

  // ================= UPDATE PROFILE =================

  const updateProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {

      // STEP 1: Upload profile image
      if (selectedFile) {

        const formData = new FormData();

        formData.append(
          "profileImage",
          selectedFile
        );

        const uploadRes = await axios.post(
          " https://beatly-efuo.onrender.com/api/auth/upload-profile",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(
          "Image Uploaded:",
          uploadRes.data
        );
      }

      // STEP 2: Update name/email/password
      const res = await axios.put(
        " https://beatly-efuo.onrender.com/api/auth/profile",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "PROFILE UPDATED:",
        res.data
      );

      alert("Profile Updated Successfully");

      setPassword("");
      setSelectedFile(null);

      await fetchProfile();

      setShowEditModal(false);

    } catch (error) {

      console.log(
        "UPDATE PROFILE ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Update Failed"
      );
    }
  };

  // ================= LOGOUT =================

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    const loadProfile = async () => {
      await fetchProfile();
      await fetchStats();
    };

    loadProfile();
  }, []);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-zinc-700 border-t-green-500 rounded-full animate-spin mx-auto mb-5" />

          <h1 className="text-xl font-semibold">
            Loading profile...
          </h1>

          <p className="text-zinc-500 text-sm mt-2">
            Please wait
          </p>

        </div>

      </div>
    );
  }

  // ================= ERROR =================

  if (error || !user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">

        <div className="text-center bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md">

          <div className="text-4xl mb-4">
            ⚠️
          </div>

          <h1 className="text-2xl font-bold mb-2">
            Profile unavailable
          </h1>

          <p className="text-zinc-400 mb-6">
            {error || "Unable to load your profile."}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-full"
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  // ================= PROFILE UI =================

  return (
    <div className="min-h-screen bg-black text-white max-w-7xl mx-auto p-5 sm:p-8 lg:p-10">

      {/* Profile Header */}
      <ProfileCard
        user={user}
        profileImage={profileImage}
      />

      {/* Stats */}
      <ProfileStats
        favorites={favorites.length}
        recent={recent.length}
        playlists={playlists.length}
      />

      {/* Recent Songs */}
      <RecentSongs recent={recent} />

      {/* Playlists */}
      <PlaylistSection playlists={playlists} />

      {/* Edit Profile */}
      <div className="mt-8">

        <button
          onClick={() => setShowEditModal(true)}
          className="bg-green-500 hover:bg-green-400 text-black px-8 py-3 rounded-full font-bold transition"
        >
          ✏️ Edit Profile
        </button>

      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <EditProfileForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              updateProfile={updateProfile}
            />

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowEditModal(false)}
                className="bg-zinc-700 hover:bg-zinc-600 px-6 py-2.5 rounded-lg transition"
              >
                Cancel
              </button>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-400 text-white px-6 py-2.5 rounded-lg transition"
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
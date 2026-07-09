import { useState } from "react";
import { useAuth } from "../zustand/useAuth";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuth();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };

    reader.onerror = () => {
      toast.error("Failed to read image");
    };

    reader.readAsDataURL(file);
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] px-4 pt-24 pb-10">
      <div className="mx-auto max-w-2xl">
        <div className="space-y-8 rounded-3xl border border-white/15 bg-black/30 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          {/* title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Your Profile</h1>
            <p className="mt-2 text-sm text-white/60">
              Manage your personal information
            </p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-36 rounded-full border-4 border-white/30 object-cover shadow-xl shadow-pink-500/25"
              />

              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-1 right-1 cursor-pointer rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] p-3 text-white shadow-lg shadow-pink-500/30 transition hover:scale-110 ${
                  isUpdatingProfile ? "pointer-events-none animate-pulse" : ""
                }`}
              >
                <Camera className="size-5" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="text-sm text-white/60">
              {isUpdatingProfile ?
                "Uploading..."
              : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* display info */}
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-white/70">
                <User className="size-4" />
                Full Name
              </div>

              <p className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-white shadow-inner">
                {authUser?.fullname}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-white/70">
                <Mail className="size-4" />
                Email Address
              </div>

              <p className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-white shadow-inner">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* footer info */}
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Account Information
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-white/10 py-3 text-white/80">
                <span>Member Since</span>
                <span className="font-medium text-white">
                  {authUser.createdAt?.split("T")[0]}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 text-white/80">
                <span>Account Status</span>
                <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-300">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

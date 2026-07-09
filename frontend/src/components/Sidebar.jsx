import { useEffect } from "react";
import { useChat } from "../zustand/useChat";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuth } from "../zustand/useAuth";

const Sidebar = () => {
  const { getUsers, users, selectedUser, isUsersLoading, setSelectedUser } =
    useChat();

  const { onlineUsers } = useAuth();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="flex h-full w-20 flex-col border-r border-white/10 bg-black/20 backdrop-blur-xl transition-all duration-200 lg:w-72">
      {/* header */}
      <div className="border-b border-white/10 p-5">
        <div className="flex items-center justify-center gap-2 text-white lg:justify-start">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#F77737] shadow-lg shadow-pink-500/25">
            <Users className="size-5 text-white" />
          </div>

          <div className="hidden lg:block">
            <h2 className="font-semibold">Contacts</h2>
            <p className="text-xs text-white/50">{users.length} people</p>
          </div>
        </div>
      </div>

      {/* users */}
      <div className="w-full flex-1 overflow-y-auto px-2 py-3">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`group mb-2 flex w-full items-center gap-3 rounded-2xl p-3 transition-all duration-200 ${
              selectedUser?._id === user._id ?
                "bg-white/15 ring-1 ring-white/20 shadow-lg shadow-pink-500/10"
              : "hover:bg-white/10"
            }`}
          >
            <div className="relative mx-auto shrink-0 lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullname}
                className={`size-12 rounded-full border object-cover transition ${
                  selectedUser?._id === user._id ?
                    "border-pink-300/70"
                  : "border-white/20"
                }`}
              />

              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 rounded-full bg-green-400 ring-2 ring-[#18181f]" />
              )}
            </div>

            <div className="hidden min-w-0 text-left lg:block">
              <div className="truncate font-semibold text-white">
                {user.fullname}
              </div>

              <div
                className={`text-sm ${
                  onlineUsers.includes(user._id) ? "text-green-300" : (
                    "text-white/45"
                  )
                }`}
              >
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

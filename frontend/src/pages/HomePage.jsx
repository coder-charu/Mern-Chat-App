import { useChat } from "../zustand/useChat";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChat();

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] px-4 pt-24 pb-6">
      <div className="mx-auto flex h-[calc(100vh-7.5rem)] w-full max-w-6xl overflow-hidden rounded-3xl border border-white/15 bg-black/30 shadow-2xl backdrop-blur-xl">
        <Sidebar />

        {!selectedUser ?
          <NoChatSelected />
        : <ChatContainer />}
      </div>
    </div>
  );
};

export default HomePage;

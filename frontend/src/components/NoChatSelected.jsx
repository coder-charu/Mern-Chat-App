import { MessageSquareHeart } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex w-full flex-1 items-center justify-center bg-black/10 backdrop-blur-xl p-8">
      <div className="max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#F77737] shadow-2xl shadow-pink-500/25 animate-pulse">
          <MessageSquareHeart className="size-11 text-white" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-white">Start a Conversation</h2>

        {/* Subtitle */}
        <p className="mt-4 text-lg leading-8 text-white/65">
          Pick a contact from the sidebar and start chatting in real time.
        </p>

        {/* Small quote */}
        <p className="mt-10 text-sm italic text-white/40">
          "Every message brings people a little closer."
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;

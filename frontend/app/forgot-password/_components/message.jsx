import React from "react";

const Message = () => {
  return (
    <div className="relative w-full bg-[#10B77F0D] rounded-lg text-white mt-6 py-4 px-6 border-l-4 border-(--primary)">
      <p className="leading-[1.4] text-(--gray)">
        We'll send a code to your email to verify your identity. Make sure you
        have access to this inbox.
      </p>
    </div>
  );
};

export default Message;

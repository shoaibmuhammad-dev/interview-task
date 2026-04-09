import Image from "next/image";
import React from "react";

const Button = ({ type, text, isLoading, icon, textColor }) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`bg-(--primary) font-bold rounded-lg w-full h-14 text-center flex items-center justify-center gap-2 
      shadow-[0px_4px_6px_-4px_#10B77F33,0px_10px_15px_-3px_#10B77F33] cursor-pointer`}
      style={{ color: textColor ? textColor : "#10221C" }}
    >
      {text}{" "}
      {icon && <Image src={icon} alt="button icon" width={16} height={16} />}
    </button>
  );
};

export default Button;

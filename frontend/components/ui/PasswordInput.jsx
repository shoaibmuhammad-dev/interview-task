import Image from "next/image";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";

const PasswordInput = ({
  label,
  name,
  placeholder = "••••••••",
  icon,
  formik,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const error = formik.touched[name] && formik.errors[name];

  return (
    <div className="w-full">
      {/* Label */}
      <label className="text-sm text-[#10B77F99] font-semibold uppercase">
        {label}
      </label>

      {/* Input Wrapper */}
      <div
        className={`w-full mt-1 flex items-center gap-3 border h-13.25 px-4 rounded-lg 
        ${error ? "border-red-500" : "border-[#10B77F33]"}`}
      >
        {/* Left Icon */}
        {icon && <Image src={icon} alt="icon" width={16} height={16} />}

        {/* Input */}
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full h-full outline-none placeholder:text-[#10B77F4D] text-white"
        />

        {/* Eye Toggle */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="focus:outline-none text-[#10B77F4D] cursor-pointer"
        >
          {showPassword ? (
            <IoEyeOffSharp size={20} />
          ) : (
            <IoEyeOutline size={20} />
          )}
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;

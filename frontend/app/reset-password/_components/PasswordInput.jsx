import Image from "next/image";
import React, { useState } from "react";

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
      <label className="text-sm text-(--gray) font-semibold uppercase">
        {label}
      </label>

      {/* Input Wrapper */}
      <div
        className={`w-full mt-1 flex items-center gap-3 border h-13.25 px-4 rounded-lg bg-[#1E293B]  
        ${error ? "border-red-500" : "border-[#334155]"}`}
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
          className="w-full h-full outline-none placeholder:text-(--gray) text-white"
        />
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;

import Image from "next/image";
import React from "react";

const Input = ({ label, name, type = "text", placeholder, icon, formik }) => {
  const error = formik.touched[name] && formik.errors[name];

  return (
    <div className="w-full">
      {/* Label */}
      <label className="text-sm text-[#10B77F99] font-semibold uppercase">
        {label}
      </label>

      {/* Input Wrapper */}
      <div
        className={`w-full flex items-center gap-3 border h-13.25 px-4 rounded-lg 
        ${error ? "border-red-500" : "border-[#10B77F33]"}`}
      >
        {icon && <Image src={icon} alt="icon" width={16} height={16} />}

        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full h-full outline-none placeholder:text-[#10B77F4D] text-white"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;

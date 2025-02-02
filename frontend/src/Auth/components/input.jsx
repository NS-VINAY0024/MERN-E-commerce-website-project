import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({ icon: Icon, type, value, onChange, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="relative mb-6">
      {/* Left Icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-[#2575fc]" />
      </div>
      {/* Input Field */}
      <input
        {...props}
        type={type === "password" && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        className="w-full px-40 pl-10 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-[#0093E9] focus:ring-2 focus:ring-[#0093E9] text-white placeholder-gray-400 transition duration-200"
      />

      {/* Eye Icon (Only for Password Fields) */}
      {type === "password" && value?.length > 0 && (
        <div
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#2575fc]"
          onClick={handleTogglePassword}
        >
          {showPassword ? (
            <FaEyeSlash className="size-5" />
          ) : (
            <FaEye className="size-5" />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;

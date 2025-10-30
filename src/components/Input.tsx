import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<Props> = ({ label, className = "", ...props }) => (
  <div className="flex flex-col mb-4">
    {label && <label className="mb-1 font-medium">{label}</label>}
    <input
      className={`border px-3 py-2 rounded focus:outline-none focus:ring ${className}`}
      {...props}
    />
  </div>
);

export default Input;

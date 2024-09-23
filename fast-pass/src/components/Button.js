import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";

const Button = ({ children, onClick, className, variant = "default" }) => {
  const baseClasses = "rounded-full transition-all duration-300 transform hover:scale-105";
  const variantClasses = {
    default: "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white",
    outline: "border-2 border-blue-500 text-blue-500",
    danger: "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white",
    success: "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white",
  };

  return (
    <ShadcnButton
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </ShadcnButton>
  );
};

export default Button;
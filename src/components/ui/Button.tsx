// src/components/ui/Button.tsx

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    style={{
      padding: "0.75em 1.5em",
      borderRadius: 8,
      background: "#0070f3",
      color: "#fff",
      fontWeight: 600,
      border: "none",
      cursor: "pointer",
      fontSize: 16,
    }}
    {...props}
  >
    {children}
  </button>
);

export default Button;
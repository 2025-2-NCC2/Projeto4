// src/components/Card.jsx
import React from "react";

export function Card({ children }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
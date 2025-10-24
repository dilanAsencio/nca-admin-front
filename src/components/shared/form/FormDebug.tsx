// 📁 /components/shared/form/FormDebug.tsx
"use client";

import React from "react";
import { FieldErrors } from "react-hook-form";

interface FormDebugProps {
  errors: FieldErrors<any>;
}

export default function FormDebug({ errors }: FormDebugProps) {
  if (!errors || Object.keys(errors).length === 0) return null;

  return (
    <pre className="bg-gray-50 border border-red-300 rounded-md text-red-600 text-xs p-2 mt-2 overflow-auto max-h-40">
      {JSON.stringify(errors, null, 2)}
    </pre>
  );
}

"use client";

import { FC } from "react";

const LoadingSpinner = () => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/10">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"
          role="status"
        >
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
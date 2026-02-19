"use client";

import { useState, useTransition } from "react";
import { logUserActivity } from "@/services/user-activities/action"; 

type Props = {
  userId: string;
  activityId: string;
  isAlreadyCompleted: boolean;
};

export function CompleteButton({ userId, activityId, isAlreadyCompleted }: Props) {
  const [isPending, startTransition] = useTransition();
  // Initialize state based on the database data passed from the server
  const [completed, setCompleted] = useState(isAlreadyCompleted);

  const handleComplete = () => {
    if (completed) return; // Prevent double clicks

    const now = new Date();
    const localDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    startTransition(async () => {
      const response = await logUserActivity({ userId, activityId, localDate });
      if (response.success || response.isDuplicate) {
        setCompleted(true);
      }
    });
  };

  if (completed) {
    return (
      <button 
        disabled
        className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.4)] cursor-default transition-all"
      >
        {/* SVG Checkmark */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={handleComplete}
      disabled={isPending}
      className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center group-active:scale-95
        ${isPending 
          ? "border-slate-500 opacity-50 cursor-not-allowed" 
          : "border-slate-600 hover:border-emerald-500 hover:bg-emerald-500/10 cursor-pointer"
        }
      `}
    >
      {isPending && (
        <div className="w-3 h-3 rounded-full bg-slate-500 animate-pulse" />
      )}
    </button>
  );
}
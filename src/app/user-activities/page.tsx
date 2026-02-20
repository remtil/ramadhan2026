import { db } from "@/lib/db";
import { activities, userActivity } from "@/lib/db/schema";
import { calculateUserStreak } from "@/services/user-activities/action";
import { and, eq } from "drizzle-orm";
import { CompleteButton } from "./complete-button";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect("/login");
  }
  const userId = user.id;

  const serverToday = new Date().toISOString().split("T")[0];
  const allActivities = await db.select().from(activities);
  const completedToday = await db
    .select()
    .from(userActivity)
    .where(
      and(
        eq(userActivity.userId, userId),
        eq(userActivity.date, serverToday),
      ),
    );

  const allTimeHistory = await db
    .select()
    .from(userActivity)
    .where(eq(userActivity.userId, userId));

  const currentStreak = await calculateUserStreak(userId, serverToday);

  const completedIds = completedToday.map((record) => record.activityId);
  const totalPointsAllTime = allTimeHistory.reduce(
    (sum, r) => sum + r.pointsEarned,
    0,
  );
  const todaysPoints = completedToday.reduce(
    (sum, r) => sum + r.pointsEarned,
    0,
  );
  const totalAvailablePoints = allActivities.reduce(
    (sum, a) => sum + a.points,
    0,
  );

  const progressPercent =
    allActivities.length > 0
      ? Math.round((completedToday.length / allActivities.length) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-300 font-sans p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* --- HEADER & PROGRESS --- */}
        <header className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-orange-500">⚡</span> Activity Tracker
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Today's Progress
              </p>
              <p className="text-xl font-bold text-emerald-400">
                {completedToday.length}/{allActivities.length}{" "}
                <span className="text-sm text-slate-500 font-normal">
                  activities done
                </span>
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </header>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#12161f] border border-slate-800 rounded-xl p-5 hover:border-blue-500/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Points
              </p>
              <span>💎</span>
            </div>
            <h2 className="text-3xl font-black text-blue-400">
              {totalPointsAllTime}
            </h2>
            <p className="text-xs text-slate-500 mt-1">All time</p>
          </div>

          <div className="bg-[#12161f] border border-emerald-500/30 rounded-xl p-5 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Today's Points
              </p>
              <span>🎯</span>
            </div>
            <h2 className="text-3xl font-black text-emerald-400">
              {todaysPoints}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              of {totalAvailablePoints} available
            </p>
          </div>

          <div className="bg-[#12161f] border border-orange-500/30 rounded-xl p-5 shadow-[0_0_15px_rgba(249,115,22,0.05)]">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Streak
              </p>
              <span>🔥</span>
            </div>
            <h2 className="text-3xl font-black text-orange-400">
              {currentStreak}d
            </h2>
            <p className="text-xs text-slate-500 mt-1">Keep it up!</p>
          </div>

          <div className="bg-[#12161f] border border-slate-800 rounded-xl p-5 hover:border-green-500/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Completed
              </p>
              <span>✅</span>
            </div>
            <h2 className="text-3xl font-black text-white">
              {allTimeHistory.length}
            </h2>
            <p className="text-xs text-slate-500 mt-1">Total activities</p>
          </div>
        </div>

        {/* --- ACTIVITIES GRID --- */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Today's Activities</h2>
            <span className="text-xs font-medium bg-[#1a202c] text-slate-400 px-3 py-1 rounded-md">
              {serverToday}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allActivities.map((activity) => {
              const isDone = completedIds.includes(activity.id);

              return (
                <div
                  key={activity.id}
                  className={`bg-[#12161f] border ${isDone ? "border-emerald-500/50" : "border-slate-800 hover:border-slate-700"} rounded-xl p-4 flex items-center justify-between group transition-all`}
                >
                  <div className="flex items-center gap-4 opacity-100">
                    <div className="text-3xl">{activity.icon || "✨"}</div>
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1 text-emerald-400 bg-emerald-400/10">
                        {activity.type}
                      </span>
                      <h3 className="font-bold text-slate-200">
                        {activity.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {activity.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs font-bold text-amber-400">
                      +{activity.points} pts
                    </span>
                    <CompleteButton
                      userId={userId}
                      activityId={activity.id}
                      isAlreadyCompleted={isDone}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
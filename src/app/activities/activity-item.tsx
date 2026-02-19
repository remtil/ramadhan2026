"use client";

import { deleteActivity } from "@/services/activities/action";
import { useState, useTransition } from "react";
import { ActivityForm } from "./activity-form";

type Activity = {
	id: string;
	title: string;
	description?: string | null;
	points: number;
	icon?: string | null;
	type: "daily" | "optional";
	isActive: boolean;
};

const TYPE_STYLES = {
	daily: {
		badge: "bg-blue-50 text-blue-600 border-blue-100",
		label: "Daily",
	},
	optional: {
		badge: "bg-violet-50 text-violet-600 border-violet-100",
		label: "Optional",
	},
};

export function ActivityItem({ activity }: { activity: Activity }) {
	const [edit, setEdit] = useState(false);
	const [isPending, startTransition] = useTransition();

	const handleDelete = () => {
		startTransition(async () => {
			await deleteActivity(activity.id);
		});
	};

	const typeStyle = TYPE_STYLES[activity.type];

	if (edit) {
		return (
			<div className="rounded-2xl border border-neutral-200 bg-white p-4 space-y-4">
				<div className="flex items-center justify-between">
					<p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
						Editing
					</p>
					<button
						type="button"
						onClick={() => setEdit(false)}
						className="text-xs font-medium text-neutral-400 hover:text-neutral-700 transition"
					>
						✕ Cancel
					</button>
				</div>
				<ActivityForm
					id={activity.id}
					defaultValues={{
						...activity,
						description: activity.description ?? undefined,
						icon: activity.icon ?? undefined,
					}}
					onSuccess={() => setEdit(false)}
				/>
			</div>
		);
	}

	return (
		<div className="group relative flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 transition-all hover:-translate-y-0.5">
			{/* Top row */}
			<div className="flex items-start justify-between gap-2">
				<div className="flex-1 min-w-0">
					<h3 className="font-semibold text-neutral-900 leading-tight">
						{activity.title}
					</h3>
					{activity.description && (
						<p className="mt-1 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
							{activity.description}
						</p>
					)}
				</div>
				<span
					className={`inline-block shrink-0 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${typeStyle.badge}`}
				>
					{typeStyle.label}
				</span>
			</div>

			{/* Divider */}
			<div className="my-3 border-t border-neutral-100" />

			{/* Footer row */}
			<div className="flex items-center justify-between">
				{/* Points + Status */}
				<div className="flex items-center gap-2.5">
					<span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
						<span>⭐</span>
						<span>{activity.points} pts</span>
					</span>

					<span
						className={`flex items-center gap-1 text-xs font-medium ${
							activity.isActive ? "text-emerald-600" : "text-neutral-400"
						}`}
					>
						<span
							className={`h-1.5 w-1.5 rounded-full ${
								activity.isActive ? "bg-emerald-500" : "bg-neutral-300"
							}`}
						/>
						{activity.isActive ? "Active" : "Inactive"}
					</span>
				</div>

				{/* Action buttons - always visible on mobile, hover on desktop */}
				<div className="flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
					<button
						type="button"
						onClick={() => setEdit(true)}
						className="rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900"
					>
						Edit
					</button>

					<button
						type="button"
						onClick={handleDelete}
						disabled={isPending}
						className="rounded-lg border border-red-100 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500 transition hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isPending ? "…" : "Delete"}
					</button>
				</div>
			</div>
		</div>
	);
}

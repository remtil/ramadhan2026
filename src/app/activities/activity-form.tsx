"use client";

import { createActivity, updateActivity } from "@/services/activities/action";
import { useState, useTransition } from "react";

type ActivityFormValues = {
	title: string;
	description: string;
	points: number;
	icon: string;
	type: "daily" | "optional";
	isActive: boolean;
};

type Props = {
  defaultValues?: Partial<ActivityFormValues>;
  id?: string;
  onSuccess?: () => void;
};

const EMPTY_FORM: ActivityFormValues = {
  title: "",
  description: "",
  points: 0,
  icon: "",
  type: "optional",
  isActive: true,
};

export function ActivityForm({ defaultValues, id, onSuccess }: Props) {
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState<ActivityFormValues>({
    ...EMPTY_FORM,
    ...defaultValues,
  });

  const set = <K extends keyof ActivityFormValues>(
    key: K,
    value: ActivityFormValues[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      if (id) {
        await updateActivity(id, form);
        onSuccess?.();
      } else {
        await createActivity(form);
        setForm(EMPTY_FORM);
      }
    });
  };

  const inputClass =
    "w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="text-xs font-semibold uppercase tracking-wide text-neutral-500"
        >
          Title <span className="text-red-400">*</span>
        </label>
        <input
          required
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-xs font-semibold uppercase tracking-wide text-neutral-500"
        >
          Description
        </label>
        <textarea
          rows={2}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Points + Type row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label
            htmlFor="points"
            className="text-xs font-semibold uppercase tracking-wide text-neutral-500"
          >
            Points
          </label>
          <input
            type="number"
            min={0}
            value={form.points}
            onChange={(e) => set("points", Number(e.target.value))}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="type"
            className="text-xs font-semibold uppercase tracking-wide text-neutral-500"
          >
            Type
          </label>
          <div className="flex rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50">
            {(["daily", "optional"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set("type", t)}
                className={`flex-1 py-2.5 text-xs font-semibold capitalize transition ${
                  form.type === t
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-500 hover:bg-neutral-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active toggle */}
      <div
        className={`flex items-center justify-between rounded-xl border p-3.5 transition ${
          form.isActive
            ? "border-emerald-200 bg-emerald-50"
            : "border-neutral-200 bg-neutral-50"
        }`}
      >
        <div>
          <p className="text-sm font-medium text-neutral-800">
            {form.isActive ? "Active" : "Inactive"}
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">
            {form.isActive ? "Visible to users" : "Hidden from users"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => set("isActive", !form.isActive)}
          className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
            form.isActive ? "bg-emerald-500" : "bg-neutral-300"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all duration-200 ${
              form.isActive ? "left-6" : "left-1"
            }`}
          />
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-neutral-900 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending
          ? id
            ? "Saving changes…"
            : "Creating…"
          : id
            ? "Save Changes"
            : "Create Activity"}
      </button>
    </form>
  );
}

import { getActivity } from "@/services/activities/action";
import { ActivityItem } from "./activity-item";

export async function ActivityList() {
	const data = await getActivity();

	return (
		<div className="space-y-3">
			{data.length === 0 && (
				<div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 py-16 text-center">
					<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-3xl">
						📭
					</div>
					<p className="font-semibold text-neutral-800">No activities yet</p>
				</div>
			)}

			{data.map((item) => (
				<ActivityItem key={item.id} activity={item} />
			))}
		</div>
	);
}

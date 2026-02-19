import { ProtectedHeader } from "@/interfaces/layouts/protected_header";
import { ActivityForm } from "./activity-form";
import { ActivityList } from "./activity-list";

export const revalidate = 60;

export default function Page() {
	return (
		<div className="min-h-screen bg-[#f8f8f6]">
			<ProtectedHeader navLabel="Activities" />

			<main className="mx-auto max-w-7xl px-6 py-10 space-y-8">
				<div>
					<h1 className="text-2xl font-bold tracking-tight text-neutral-900">
						Activity Manager
					</h1>
				</div>

				<div className="grid gap-6 lg:grid-cols-[400px_1fr] items-start">
					<div className="rounded-2xl bg-white border border-neutral-200 shadow-sm overflow-hidden">
						<div className="px-5 py-4 border-b border-neutral-100 bg-neutral-50">
							<h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-widest">
								New Activity
							</h2>
						</div>
						<div className="p-5">
							<ActivityForm />
						</div>
					</div>

					<div className="rounded-2xl bg-white border border-neutral-200 shadow-sm overflow-hidden">
						<div className="px-5 py-4 border-b border-neutral-100 bg-neutral-50 flex items-center justify-between">
							<h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-widest">
								All Activities
							</h2>
						</div>
						<div className="p-5 max-h-[78vh] overflow-y-auto">
							<ActivityList />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

import { Sidebar } from "@/interfaces/layouts/sidebar";

export default function DashboardLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen bg-[#f8f8f6]">
			<Sidebar />
			<main className="flex-1 overflow-auto">{children}</main>
		</div>
	);
}

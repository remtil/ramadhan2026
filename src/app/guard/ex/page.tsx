import { ProtectedHeader } from "@/interfaces/layouts/protected_header";
import ScreenPrivate from "@/interfaces/screens/screen_private/main";

export default function Page() {
	return (
		<div className="min-h-screen bg-[#f8f8f6]">
			<ProtectedHeader navLabel="Dashboard" />
			<main className="mx-auto max-w-7xl px-6 py-10">
				<ScreenPrivate />
			</main>
		</div>
	);
}

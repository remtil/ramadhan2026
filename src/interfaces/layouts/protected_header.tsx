"use client";

import { Button } from "@/interfaces/components/ui/button";
import { signOut } from "@/services/auth/action";
import { PATH } from "@/shared/path";
import { useRouter } from "next/navigation";

type Props = {
	navLabel?: string;
};

export function ProtectedHeader({ navLabel }: Props) {
	const router = useRouter();

	async function handleLogout() {
		await signOut();
		router.push(PATH.LOGIN);
		router.refresh();
	}

	return (
		<header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-neutral-200">
			<div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="text-lg">🌙</span>
				</div>
				<nav className="flex items-center gap-3">
					{navLabel && (
						<span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-700">
							{navLabel}
						</span>
					)}
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="shrink-0 rounded-lg border-neutral-300 text-neutral-700 hover:bg-neutral-100"
						onClick={handleLogout}
					>
						Log out
					</Button>
				</nav>
			</div>
		</header>
	);
}

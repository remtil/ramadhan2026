"use client";

import { signOut } from "@/services/auth/action";
import { PATH } from "@/shared/path";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
	{
		href: PATH.DASHBOARD,
		label: "Dashboard",
		icon: (
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden
			>
				<title>Dashboard</title>
				<rect width="7" height="9" x="3" y="3" rx="1" />
				<rect width="7" height="5" x="14" y="3" rx="1" />
				<rect width="7" height="9" x="14" y="12" rx="1" />
				<rect width="7" height="5" x="3" y="16" rx="1" />
			</svg>
		),
	},
	{
		href: PATH.ACTIVITIES,
		label: "Activities",
		icon: (
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden
			>
				<title>Activities</title>
				<path d="M8 6h13" />
				<path d="M8 12h13" />
				<path d="M8 18h13" />
				<path d="M3 6h.01" />
				<path d="M3 12h.01" />
				<path d="M3 18h.01" />
			</svg>
		),
	},
	{
		href: PATH.USER_ACTIVITIES,
		label: "User Activities",
		icon: (
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden
			>
				<title>User ACtivities</title>
				<path d="M8 6h13" />
				<path d="M8 12h13" />
				<path d="M8 18h13" />
				<path d="M3 6h.01" />
				<path d="M3 12h.01" />
				<path d="M3 18h.01" />
			</svg>
		),
	},
];

function LogOutIcon() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			<title>Log out</title>
			<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
			<polyline points="16 17 21 12 16 7" />
			<line x1="21" x2="9" y1="12" y2="12" />
		</svg>
	);
}

export function Sidebar() {
	const pathname = usePathname();
	const router = useRouter();

	async function handleLogout() {
		await signOut();
		router.push(PATH.LOGIN);
		router.refresh();
	}

	return (
		<aside
			className="flex w-56 shrink-0 flex-col border-r-2 border-neutral-300 bg-white"
			aria-label="Sidebar"
		>
			<div className="flex h-14 items-center gap-2 border-b-2 border-neutral-300 px-4">
				<span className="text-xl" aria-hidden>
					🌙
				</span>
				<span className="font-semibold text-neutral-900">Ramadhan</span>
			</div>
			<nav
				className="flex flex-1 flex-col gap-1 p-3"
				aria-label="Main navigation"
			>
				{navItems.map((item) => {
					const active =
						pathname === item.href || pathname.startsWith(`${item.href}/`);
					return (
						<Link
							key={item.href}
							href={item.href}
							aria-current={active ? "page" : undefined}
							className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 ${
								active
									? "bg-neutral-200 text-neutral-900"
									: "text-neutral-800 hover:bg-neutral-100 hover:text-neutral-900"
							}`}
						>
							<span className="shrink-0 [&_svg]:size-5" aria-hidden>
								{item.icon}
							</span>
							{item.label}
						</Link>
					);
				})}
			</nav>
			<div className="border-t-2 border-neutral-300 p-3">
				<button
					type="button"
					className="inline-flex h-10 w-full items-center justify-start gap-3 rounded-lg border-2 border-neutral-400 bg-white px-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 [&_svg]:size-5 [&_svg]:shrink-0"
					onClick={handleLogout}
					aria-label="Log out"
				>
					<LogOutIcon />
					Log out
				</button>
			</div>
		</aside>
	);
}

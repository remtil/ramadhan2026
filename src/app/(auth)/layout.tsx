import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
import { AuthDecorations } from "./_components/auth-decorations";

const ramadhanFont = Cormorant_Garamond({
	weight: ["600", "700"],
	subsets: ["latin"],
	display: "swap",
});

const starPatternSvg = encodeURIComponent(
	'<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 2l1.8 5.5h5.6l-4.4 3.2 1.7 5.2-4.7-3.4-4.7 3.4 1.7-5.2-4.4-3.2h5.6L16 2z" fill="#d4a574" fill-opacity="0.28"/></svg>',
);

export default function AuthLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div
			className="min-h-screen grid lg:grid-cols-2 relative overflow-hidden"
			style={{
				background:
					"linear-gradient(105deg, #FEF9F5 0%, #FEF5ED 35%, #F8D7B6 70%, rgba(254, 245, 237, 0.6) 100%)",
			}}
		>
			<div className="absolute inset-0 pointer-events-none z-0">
				<AuthDecorations />
			</div>
			<div className="flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 relative z-10">
				<div className="absolute inset-0 lg:hidden opacity-40 pointer-events-none">
					<div
						className="absolute bottom-0 right-0 w-full h-1/2"
						style={{
							background:
								"linear-gradient(180deg, transparent 0%, rgba(248, 215, 182, 0.3) 100%)",
						}}
					/>
				</div>
				{children}
			</div>
			<div className="hidden lg:flex flex-col items-center justify-center relative overflow-hidden min-h-[50vh] lg:min-h-screen">
				<div
					className="absolute inset-0 opacity-30"
					style={{
						backgroundImage: `radial-gradient(circle at 20% 80%, rgba(248, 215, 182, 0.4) 0%, transparent 50%),
							radial-gradient(circle at 80% 20%, rgba(254, 245, 237, 0.5) 0%, transparent 45%)`,
					}}
				/>
				<div
					className="absolute inset-0 opacity-100"
					style={{
						backgroundImage: `url("data:image/svg+xml,${starPatternSvg}")`,
						backgroundSize: "64px 64px",
					}}
				/>
				<div
					className="absolute inset-0 opacity-[0.06]"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c4a574' fill-opacity='0.5' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 20V40H20L40 20z'/%3E%3C/g%3E%3C/svg%3E")`,
					}}
				/>
				<div className="relative z-10 w-full max-w-3xl px-6 flex flex-col items-center justify-center">
					<p
						className={`${ramadhanFont.className} text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wide text-neutral-800 text-center -mb-6 lg:-mb-8`}
					>
						Ramadhan 1447 H
					</p>
					<Image
						src="/mosque.png"
						alt=""
						width={640}
						height={853}
						className="w-full h-auto object-contain drop-shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]"
						priority
					/>
				</div>
			</div>
		</div>
	);
}

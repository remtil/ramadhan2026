export function AuthDecorations() {
	const star = (size: number, x: string, y: string, opacity: number) => (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			className="absolute pointer-events-none"
			style={{ left: x, top: y, opacity }}
			aria-hidden
			role="img"
		>
			<title>Bintang dekoratif</title>
			<path
				d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6L12 2z"
				fill="currentColor"
				className="text-amber-200/80"
			/>
		</svg>
	);

	const starOutline = (size: number, x: string, y: string, opacity: number) => (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1"
			className="absolute pointer-events-none text-amber-300/50"
			style={{ left: x, top: y, opacity }}
			aria-hidden
			role="img"
		>
			<title>Bintang dekoratif</title>
			<path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6L12 2z" />
		</svg>
	);

	return (
		<>
			{star(16, "12%", "18%", 0.6)}
			{star(12, "85%", "12%", 0.5)}
			{star(10, "8%", "72%", 0.4)}
			{star(14, "78%", "68%", 0.55)}
			{star(8, "22%", "42%", 0.35)}
			{star(9, "92%", "45%", 0.4)}
			{starOutline(20, "5%", "88%", 0.5)}
			{starOutline(14, "88%", "82%", 0.4)}
			{starOutline(11, "72%", "28%", 0.45)}
			{starOutline(15, "18%", "8%", 0.35)}
		</>
	);
}

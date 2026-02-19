export function getAuthErrorMessage(message: string): string {
	const lower = message.toLowerCase();
	if (lower.includes("rate limit") || lower.includes("ratelimit")) {
		return "Percobaan kirim email terlalu banyak. Tunggu beberapa menit (biasanya 1 jam) lalu coba lagi.";
	}
	return message;
}

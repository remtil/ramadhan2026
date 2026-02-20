"use client";

import { Button } from "@/interfaces/components/ui/button";
import { Input } from "@/interfaces/components/ui/input";
import { Label } from "@/interfaces/components/ui/label";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { createSupabaseClient } from "@/lib/supabase.client";
import { type SignInInput, signInSchema } from "@/lib/validations/schemas/auth";
import { checkEmailRegistered } from "@/services/auth/action";
import { PATH } from "@/shared/path";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function AuthLoginForm({ next }: { next?: string }) {
	const [error, setError] = useState<string | null>(null);
	const [sent, setSent] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError: setFormError,
	} = useForm<SignInInput>({
		defaultValues: { email: "" },
	});

	async function onSubmit(data: SignInInput) {
		setError(null);
		const parsed = signInSchema.safeParse(data);
		if (!parsed.success) {
			const first = parsed.error.flatten().fieldErrors;
			if (first.email) setFormError("email", { message: first.email[0] });
			return;
		}
		const { registered } = await checkEmailRegistered(parsed.data.email);
		if (!registered) {
			setError("Email belum terdaftar. Silakan sign up dulu.");
			return;
		}
		const base = `${window.location.origin}/auth/callback`;
		const redirectTo =
			next?.startsWith("/") === true
				? `${base}?next=${encodeURIComponent(next)}`
				: base;
		const supabase = createSupabaseClient();
		const { error: err } = await supabase.auth.signInWithOtp({
			email: parsed.data.email,
			options: { emailRedirectTo: redirectTo },
		});
		if (err) {
			setError(getAuthErrorMessage(err.message));
			return;
		}
		setSent(true);
	}

	if (sent) {
		return (
			<output className="block space-y-5" aria-live="polite">
				<div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
					<p className="text-sm font-semibold text-neutral-900">
						Cek email kamu
					</p>
					<p className="mt-1 text-sm text-neutral-600">
						Kami sudah kirim link ajaib ke email kamu. Klik link di email untuk
						masuk.
					</p>
				</div>
				<p className="text-center text-sm text-neutral-500">
					Belum punya akun?{" "}
					<Link
						href={PATH.SIGNUP}
						className="font-semibold text-neutral-900 hover:text-amber-800"
					>
						Sign up
					</Link>
				</p>
			</output>
		);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-5"
			noValidate
			aria-label="Sign in"
		>
			{error && (
				<div
					className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700"
					role="alert"
					aria-live="assertive"
				>
					{error}
				</div>
			)}
			<div className="space-y-2">
				<Label htmlFor="login-email" className="text-neutral-700 font-medium">
					Email
				</Label>
				<Input
					id="login-email"
					type="email"
					autoComplete="email"
					placeholder="you@example.com"
					aria-invalid={Boolean(errors.email)}
					aria-describedby={errors.email ? "login-email-error" : undefined}
					{...register("email")}
					className="h-12 rounded-xl border border-gray-200 bg-white text-black placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus-visible:outline-none focus-visible:ring-0 [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_white] [&:-webkit-autofill]:[-webkit-text-fill-color:black]"
				/>
				{errors.email && (
					<p
						id="login-email-error"
						className="text-xs text-red-600"
						role="alert"
					>
						{errors.email.message}
					</p>
				)}
			</div>
			<Button
				type="submit"
				className="w-full h-12 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white hover:text-white text-base font-semibold shadow-lg shadow-neutral-900/20"
				disabled={isSubmitting}
				aria-busy={isSubmitting}
			>
				{isSubmitting ? "Signing in…" : "Sign in"}
			</Button>
			<div className="relative py-2">
				<hr
					className="absolute inset-0 border-0 border-t border-neutral-200"
					aria-hidden
				/>
				<p className="relative flex justify-center text-xs font-medium text-neutral-400">
					or continue with
				</p>
			</div>
			<Button
				type="button"
				variant="outline"
				className="w-full h-12 rounded-xl border-2 border-neutral-200 bg-white hover:bg-neutral-50 font-medium text-neutral-800 hover:text-neutral-900 [&_svg]:size-5"
				disabled={isSubmitting}
				aria-label="Sign in with Google"
				onClick={async () => {
					setError(null);
					const supabase = createSupabaseClient();
					const { error: err } = await supabase.auth.signInWithOAuth({
						provider: "google",
						options: { redirectTo: `${window.location.origin}/auth/callback` },
					});
					if (err) setError(getAuthErrorMessage(err.message));
				}}
			>
				<svg className="shrink-0" viewBox="0 0 24 24" aria-hidden role="img">
					<title>Google</title>
					<path
						fill="#4285F4"
						d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
					/>
					<path
						fill="#34A853"
						d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
					/>
					<path
						fill="#FBBC05"
						d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
					/>
					<path
						fill="#EA4335"
						d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
					/>
				</svg>
				<span className="ml-2">Continue with Google</span>
			</Button>
			<p className="text-center text-sm text-neutral-500 pt-1">
				Don’t have an account?{" "}
				<Link
					href={PATH.SIGNUP}
					className="font-semibold text-neutral-900 hover:text-amber-800"
				>
					Sign up
				</Link>
			</p>
		</form>
	);
}

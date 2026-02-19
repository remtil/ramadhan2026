import { AuthCardIcon } from "@/app/(auth)/_components/auth-card-icon";
import { AuthCardStars } from "@/app/(auth)/_components/auth-card-stars";
import { AuthSignUpForm } from "@/app/(auth)/_components/auth-signup-form";

export default function SignUpPage() {
	return (
		<div className="mx-auto w-full max-w-[400px]">
			<div className="relative rounded-3xl border border-neutral-200/80 bg-white/90 shadow-xl shadow-neutral-200/50 backdrop-blur-sm p-8 sm:p-10">
				<AuthCardStars />
				<div className="flex items-center gap-3 mb-8">
					<AuthCardIcon />
					<div>
						<h1 className="text-2xl font-bold tracking-tight text-neutral-900">
							Create account
						</h1>
						<p className="text-sm text-neutral-500 mt-0.5">
							Register with email or Google
						</p>
					</div>
				</div>
				<AuthSignUpForm />
			</div>
			<p className="mt-6 text-center text-xs text-neutral-400">
				By continuing you agree to our terms and privacy policy.
			</p>
		</div>
	);
}

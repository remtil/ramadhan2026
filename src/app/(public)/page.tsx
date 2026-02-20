import { createSupabaseClient } from "@/lib/supabase.server";
import { PATH } from "@/shared/path";
import { redirect } from "next/navigation";

export default async function RootPage() {
	const supabase = await createSupabaseClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	redirect(user ? PATH.PRIVATE : PATH.LOGIN);
}

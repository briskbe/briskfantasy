import { redirect } from "next/navigation";
import { getCmsSession } from "@/lib/cms/auth";
import { LoginScreen } from "@/components/cms/login-screen";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sign in" };

export default async function LoginPage() {
  const session = await getCmsSession().catch(() => null);
  if (session) redirect("/cms");
  return <LoginScreen />;
}

import { Suspense } from "react";
import { ResetPasswordScreen } from "@/components/cms/reset-password-screen";

export const metadata = { title: "Wachtwoord herstellen" };

export default function ResetPasswordPage() {
  return <Suspense fallback={<div className="cms-auth-loading">Laden…</div>}><ResetPasswordScreen /></Suspense>;
}

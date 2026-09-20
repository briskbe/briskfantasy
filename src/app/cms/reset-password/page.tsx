import { Suspense } from "react";
import { ResetPasswordScreen } from "@/components/cms/reset-password-screen";

export const metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return <Suspense fallback={<div className="cms-auth-loading">Loading…</div>}><ResetPasswordScreen /></Suspense>;
}

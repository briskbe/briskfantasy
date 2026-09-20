"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, Card, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { Check, LockKeyhole } from "lucide-react";
import { authClient } from "@/lib/cms/auth-client";

export function ResetPasswordScreen() {
  const search = useSearchParams();
  const token = search.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (password !== confirm) { setError("Your passwords don’t match."); return; }
    setPending(true);
    try {
      const result = await authClient.resetPassword({ token: token || "", newPassword: password });
      if (result.error) throw new Error("This reset link has expired or is invalid. Please request a new link.");
      setDone(true); setPassword(""); setConfirm("");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to reset your password."); }
    finally { setPending(false); }
  }
  return <main className="flex min-h-dvh items-center justify-center px-5 py-12"><Card className="w-full max-w-md p-8"><Card.Header><LockKeyhole className="mb-5" size={28} /><Card.Title className="text-2xl tracking-tight">A fresh start.</Card.Title><Card.Description>Set a new password for your Brisk workspace.</Card.Description></Card.Header><Card.Content>
    {!token || search.has("error") ? <p className="my-5 text-sm text-danger">This link is invalid or has expired. Request a new one from the sign-in page.</p> : done ? <div role="status" className="my-5 flex items-center gap-3 text-sm"><Check className="text-success" />Your password has been updated.</div> : <Form onSubmit={submit} className="mt-5 space-y-5"><TextField name="password" type="password" value={password} onChange={setPassword} isRequired minLength={8} maxLength={128} autoComplete="new-password"><Label>New password</Label><Input /><FieldError /></TextField><TextField name="confirm" type="password" value={confirm} onChange={setConfirm} isRequired minLength={8} maxLength={128} autoComplete="new-password"><Label>Confirm new password</Label><Input /><FieldError /></TextField>{error && <p role="alert" className="text-sm text-danger">{error}</p>}<Button type="submit" isPending={pending} fullWidth>Update password</Button></Form>}
    <Link href="/cms/login" className="mt-6 inline-block text-sm font-medium underline underline-offset-4">Back to sign in</Link>
  </Card.Content></Card></main>;
}

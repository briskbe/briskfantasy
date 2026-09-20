"use client";

import { DutchFieldError } from "./field-error";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, Card, Form, Input, Label, TextField } from "@heroui/react";
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
    if (password !== confirm) { setError("Je wachtwoorden komen niet overeen."); return; }
    setPending(true);
    try {
      const result = await authClient.resetPassword({ token: token || "", newPassword: password });
      if (result.error) throw new Error("Deze herstellink is verlopen of ongeldig. Vraag een nieuwe link aan.");
      setDone(true); setPassword(""); setConfirm("");
    } catch (cause) { setError(cause instanceof Error && !(cause instanceof TypeError) && !(cause instanceof SyntaxError) ? cause.message : "Je wachtwoord kon niet opnieuw worden ingesteld."); }
    finally { setPending(false); }
  }
  return <main className="flex min-h-dvh items-center justify-center px-5 py-12"><Card className="w-full max-w-md p-8"><Card.Header><LockKeyhole className="mb-5" size={28} /><Card.Title className="text-2xl tracking-tight">Nieuw wachtwoord</Card.Title><Card.Description>Stel een nieuw wachtwoord in voor je Brisk-account.</Card.Description></Card.Header><Card.Content>
    {!token || search.has("error") ? <p className="my-5 text-sm text-danger">Deze link is ongeldig of verlopen. Vraag een nieuwe link aan op de inlogpagina.</p> : done ? <div role="status" className="my-5 flex items-center gap-3 text-sm"><Check className="text-success" />Je wachtwoord is gewijzigd.</div> : <Form onSubmit={submit} className="mt-5 space-y-5"><TextField name="password" type="password" value={password} onChange={setPassword} isRequired minLength={8} maxLength={128} autoComplete="new-password"><Label>Nieuw wachtwoord</Label><Input /><DutchFieldError type="password" minLength={8} maxLength={128} /></TextField><TextField name="confirm" type="password" value={confirm} onChange={setConfirm} isRequired minLength={8} maxLength={128} autoComplete="new-password"><Label>Nieuw wachtwoord bevestigen</Label><Input /><DutchFieldError type="password" minLength={8} maxLength={128} /></TextField>{error && <p role="alert" className="text-sm text-danger">{error}</p>}<Button type="submit" isPending={pending} fullWidth>Wachtwoord opslaan</Button></Form>}
    <Link href="/cms/login" className="mt-6 inline-block text-sm font-medium underline underline-offset-4">Terug naar inloggen</Link>
  </Card.Content></Card></main>;
}

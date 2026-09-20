"use client";

import { DutchFieldError } from "./field-error";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button, Card, Form, Input, Label, TextField } from "@heroui/react";
import { ArrowLeft, Check, Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/cms/auth-client";
import { ThemeToggle } from "./appearance";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError("");
    try {
      if (forgot) {
        const result = await authClient.requestPasswordReset({ email: email.trim(), redirectTo: `${window.location.origin}/cms/reset-password` });
        if (result.error) throw new Error("De herstellink kon niet worden aangevraagd. Probeer het straks opnieuw.");
        setSent(true);
      } else {
        const result = await authClient.signIn.email({ email: email.trim(), password, rememberMe: true });
        if (result.error) throw new Error(result.error.status === 429 ? "Te veel pogingen. Wacht enkele minuten en probeer opnieuw." : "Inloggen is niet gelukt. Controleer je e-mailadres en wachtwoord.");
        // Start a fresh authenticated document without cached anonymous state.
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.assign("/cms");
      }
    } catch (cause) { setError(cause instanceof Error && !(cause instanceof TypeError) && !(cause instanceof SyntaxError) ? cause.message : "Verbinding mislukt. Probeer het opnieuw."); }
    finally { setPending(false); }
  }
  return <main className="cms-login">
    <header className="cms-login-header"><Link href="/" aria-label="Brisk website"><Image className="cms-light-logo" src="/logo.svg" alt="Brisk" width={112} height={36} priority /><Image className="cms-dark-logo" src="/logo-light.svg" alt="Brisk" width={112} height={36} priority /></Link><ThemeToggle /></header>
    <section className="cms-login-panel"><div className="w-full max-w-md">
      <Card className="p-6 sm:p-8"><Card.Header><h1 className="text-2xl font-semibold">{forgot ? "Wachtwoord vergeten?" : "Inloggen"}</h1><Card.Description>{forgot ? "Ontvang een link om je wachtwoord opnieuw in te stellen." : "Beheer je klanten, projecten en offertes."}</Card.Description></Card.Header><Card.Content className="mt-6">
        {sent ? <div role="status"><Check className="mb-3 text-success" size={24} /><p className="font-medium">Controleer je inbox</p><p className="mt-2 text-sm text-muted">Als dit e-mailadres bij een account hoort, ontvang je zo meteen een herstellink.</p><Button variant="secondary" className="mt-5" onPress={() => { setForgot(false); setSent(false); }}>Terug naar inloggen</Button></div> : <Form onSubmit={submit} className="flex flex-col gap-5">
          <TextField name="email" type="email" value={email} onChange={setEmail} isRequired autoComplete="username"><Label>E-mailadres</Label><Input placeholder="naam@bedrijf.be" /><DutchFieldError type="email" /></TextField>
          {!forgot && <TextField name="password" type={visible ? "text" : "password"} value={password} onChange={setPassword} isRequired autoComplete="current-password" maxLength={128}><Label>Wachtwoord</Label><div className="relative"><Input className="w-full pr-12" /><Button isIconOnly size="sm" variant="ghost" aria-label={visible ? "Wachtwoord verbergen" : "Wachtwoord tonen"} className="absolute right-1 top-1/2 -translate-y-1/2" onPress={() => setVisible(!visible)}>{visible ? <EyeOff size={17} /> : <Eye size={17} />}</Button></div><DutchFieldError /></TextField>}
          {error && <p role="alert" className="text-sm text-danger">{error}</p>}
          <Button type="submit" fullWidth isPending={pending}>{forgot ? "Herstellink versturen" : "Inloggen"}</Button>
          <Button variant="ghost" onPress={() => { setForgot(!forgot); setError(""); }}>{forgot ? "Terug naar inloggen" : "Wachtwoord vergeten?"}</Button>
        </Form>}
      </Card.Content></Card>
      <div className="mt-6 flex justify-center"><Link href="/" className="inline-flex items-center gap-2 text-sm text-muted"><ArrowLeft size={15} />Terug naar brisk.be</Link></div>
    </div></section>
  </main>;
}

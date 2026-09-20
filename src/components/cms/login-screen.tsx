"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button, FieldError, Form, Input, Label, Spinner, TextField } from "@heroui/react";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Check, ArrowUpRight } from "lucide-react";
import { authClient } from "@/lib/cms/auth-client";

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
        if (result.error) throw new Error("Unable to request a reset right now. Please try again shortly.");
        setSent(true);
      } else {
        const result = await authClient.signIn.email({ email: email.trim(), password, rememberMe: true });
        if (result.error) throw new Error(result.error.status === 429 ? "Too many attempts. Please wait a few minutes and try again." : "Unable to sign in. Check your email and password and try again.");
        // Start a fresh authenticated document with no cached anonymous state.
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.assign("/cms");
      }
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to connect. Please try again."); }
    finally { setPending(false); }
  }

  return <main className="cms-login">
    <section className="cms-login-story" aria-label="Brisk workspace">
      <Link href="/" aria-label="Brisk home"><Image src="/logo-light.svg" alt="Brisk" width={124} height={40} priority /></Link>
      <div className="cms-login-story-content"><p className="cms-login-eyebrow">Your studio, in sync.</p><h1>Good work starts<br />with a clear <em>view.</em></h1><p>A considered space for your clients, projects and the conversations that move them forward.</p>
        <div className="cms-login-illustration" aria-hidden="true"><div className="cms-login-orbit" /><div className="cms-login-mini-card"><span className="cms-mini-icon"><Check size={18} /></span><div><strong>One connected workspace</strong><span>From first hello to final delivery.</span></div><ArrowUpRight size={20} /></div><div className="cms-login-mini-quote"><div><span>Made for meaningful work</span><strong>A next step. A new beginning.</strong></div><div className="cms-mini-lines"><i /><i /><i /></div><span className="cms-mini-quote-footer">Clients · Projects · Proposals <ArrowRight size={17} /></span></div></div>
      </div><p className="cms-login-copyright">Brisk studio · Genk, Belgium</p>
    </section>
    <section className="cms-login-panel"><div className="cms-login-form-wrap"><Link href="/" className="cms-login-back"><ArrowLeft size={15} />Back to brisk.be</Link><div className="cms-login-lock"><LockKeyhole size={21} strokeWidth={1.5} /></div><p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Private workspace</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">{forgot ? "Let’s get you back in." : "Welcome back."}</h2><p className="mb-8 mt-3 text-sm leading-6 text-muted">{forgot ? "We’ll send a secure reset link to your account’s email address." : "Sign in to keep your projects moving and your clients close."}</p>
      {sent ? <div role="status" className="rounded-2xl border border-border bg-surface p-6"><Check className="mb-3 text-success" size={25} /><h3 className="font-semibold">Check your inbox</h3><p className="mt-2 text-sm leading-6 text-muted">If an account matches that email, you’ll receive a password reset link shortly.</p><Button variant="secondary" className="mt-5" onPress={() => { setForgot(false); setSent(false); }}>Back to sign in</Button></div> : <Form onSubmit={submit} className="flex flex-col gap-5">
        <TextField name="email" type="email" value={email} onChange={setEmail} isRequired autoComplete="username"><Label>Email address</Label><Input placeholder="you@company.com" className="w-full" /><FieldError /></TextField>
        {!forgot && <TextField name="password" type={visible ? "text" : "password"} value={password} onChange={setPassword} isRequired autoComplete="current-password" maxLength={128}><div className="flex items-center justify-between gap-3"><Label>Password</Label><Button size="sm" variant="ghost" className="h-auto min-h-0 px-0 text-xs text-muted" onPress={() => { setForgot(true); setError(""); }}>Forgot password?</Button></div><div className="relative"><Input className="w-full pr-12" /><Button isIconOnly size="sm" variant="ghost" aria-label={visible ? "Hide password" : "Show password"} className="absolute right-1 top-1/2 -translate-y-1/2" onPress={() => setVisible(!visible)}>{visible ? <EyeOff size={17} /> : <Eye size={17} />}</Button></div><FieldError /></TextField>}
        {error && <p role="alert" className="rounded-xl bg-danger/7 p-3 text-sm text-danger">{error}</p>}
        <Button type="submit" size="lg" fullWidth isPending={pending} className="mt-1">{pending ? <Spinner color="current" size="sm" /> : null}{forgot ? "Send reset link" : "Sign in to workspace"}{!pending && <ArrowRight size={17} />}</Button>
        {forgot && <Button variant="tertiary" onPress={() => { setForgot(false); setError(""); }}>Back to sign in</Button>}
      </Form>}
      <p className="mt-8 flex items-center justify-center gap-2 text-xs text-muted"><LockKeyhole size={13} />For authorised Brisk team members only</p>
    </div></section>
  </main>;
}

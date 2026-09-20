"use client";

import { useState } from "react";
import { Button, Card, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { Check, LockKeyhole, Building2 } from "lucide-react";
import { authClient } from "@/lib/cms/auth-client";
import { PageHeading, WorkspaceGate, ErrorNotice } from "./ui";
import { useCms } from "./cms-provider";

export function SettingsScreen() {
  const { data } = useCms();
  const [current, setCurrent] = useState(""); const [next, setNext] = useState(""); const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [saved, setSaved] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setSaved(false);
    if (next !== confirm) { setError("Your new passwords don’t match."); return; }
    setBusy(true);
    try {
      const result = await authClient.changePassword({ currentPassword: current, newPassword: next, revokeOtherSessions: true });
      if (result.error) throw new Error("Unable to update your password. Check your current password and try again.");
      setCurrent(""); setNext(""); setConfirm(""); setSaved(true);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to update your password."); }
    finally { setBusy(false); }
  }
  return <><PageHeading eyebrow="Your workspace" title="Settings" description="The details behind your studio. Keep your account secure and ready for work." /><WorkspaceGate><div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"><Card className="self-start p-6 sm:p-8"><Card.Header><Building2 className="mb-4 text-muted" size={25} strokeWidth={1.5} /><Card.Title>Brisk studio</Card.Title><Card.Description>Workspace owner & business details</Card.Description></Card.Header><Card.Content className="mt-5 space-y-6 text-sm"><div><p className="mb-1 text-xs text-muted">Account</p><p>{data?.user.name}</p><p className="mt-1 text-muted">{data?.user.email}</p></div><div><p className="mb-1 text-xs text-muted">Business address</p><p>Herenstraat 15<br />3600 Genk, Belgium</p></div><div><p className="mb-1 text-xs text-muted">Currency</p><p>EUR · Euro</p></div><div className="border-t border-border pt-5 text-xs leading-6 text-muted">This workspace is private. Only the owner account can access client records, projects and follow-ups. Shared quotes are accessible to anyone with their link until you revoke it or it expires.</div></Card.Content></Card><Card className="p-6 sm:p-8"><Card.Header><LockKeyhole className="mb-4 text-muted" size={25} strokeWidth={1.5} /><Card.Title>Change password</Card.Title><Card.Description>Changing your password signs out other active sessions.</Card.Description></Card.Header><Card.Content><Form className="mt-6 space-y-5" onSubmit={submit}><TextField name="currentPassword" type="password" value={current} onChange={setCurrent} isRequired autoComplete="current-password"><Label>Current password</Label><Input className="w-full" /><FieldError /></TextField><div className="grid gap-5 sm:grid-cols-2"><TextField name="newPassword" type="password" value={next} onChange={setNext} minLength={8} maxLength={128} isRequired autoComplete="new-password"><Label>New password</Label><Input className="w-full" /><FieldError /></TextField><TextField name="confirmPassword" type="password" value={confirm} onChange={setConfirm} minLength={8} maxLength={128} isRequired autoComplete="new-password"><Label>Confirm new password</Label><Input className="w-full" /><FieldError /></TextField></div><ErrorNotice message={error} />{saved && <p role="status" className="flex items-center gap-2 text-sm text-success"><Check size={16} />Your password has been updated.</p>}<Button type="submit" isPending={busy}>Update password</Button></Form></Card.Content></Card></div></WorkspaceGate></>;
}

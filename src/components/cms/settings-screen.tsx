"use client";

import { DutchFieldError } from "./field-error";
import { useState } from "react";
import { Button, Card, Form, Input, Label, TextField } from "@heroui/react";
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
    if (next !== confirm) { setError("Je nieuwe wachtwoorden komen niet overeen."); return; }
    setBusy(true);
    try {
      const result = await authClient.changePassword({ currentPassword: current, newPassword: next, revokeOtherSessions: true });
      if (result.error) throw new Error("Je wachtwoord kon niet worden gewijzigd. Controleer je huidige wachtwoord en probeer opnieuw.");
      setCurrent(""); setNext(""); setConfirm(""); setSaved(true);
    } catch (cause) { setError(cause instanceof Error && !(cause instanceof TypeError) && !(cause instanceof SyntaxError) ? cause.message : "Je wachtwoord kon niet worden gewijzigd."); }
    finally { setBusy(false); }
  }
  return <><PageHeading eyebrow="Beheer" title="Instellingen" description="Beheer je account en bedrijfsgegevens." /><WorkspaceGate><div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"><Card className="self-start p-6 sm:p-8"><Card.Header><Building2 className="mb-4 text-muted" size={25} strokeWidth={1.5} /><Card.Title>Brisk studio</Card.Title><Card.Description>Account- en bedrijfsgegevens</Card.Description></Card.Header><Card.Content className="mt-5 space-y-6 text-sm"><div><p className="mb-1 text-xs text-muted">Account</p><p>{data?.user.name}</p><p className="mt-1 text-muted">{data?.user.email}</p></div><div><p className="mb-1 text-xs text-muted">Bedrijfsadres</p><p>Herenstraat 15<br />3600 Genk, België</p></div><div><p className="mb-1 text-xs text-muted">Valuta</p><p>EUR · Euro</p></div><div className="border-t border-border pt-5 text-xs leading-6 text-muted">Dit portaal is privé. Alleen de eigenaar heeft toegang tot klanten, projecten en opvolging. Gedeelde offertes zijn toegankelijk voor iedereen met de link, totdat je de link intrekt of deze verloopt.</div></Card.Content></Card><Card className="p-6 sm:p-8"><Card.Header><LockKeyhole className="mb-4 text-muted" size={25} strokeWidth={1.5} /><Card.Title>Wachtwoord wijzigen</Card.Title><Card.Description>Bij een wachtwoordwijziging worden je andere sessies uitgelogd.</Card.Description></Card.Header><Card.Content><Form className="mt-6 space-y-5" onSubmit={submit}><TextField name="currentPassword" type="password" value={current} onChange={setCurrent} isRequired autoComplete="current-password"><Label>Huidig wachtwoord</Label><Input className="w-full" /><DutchFieldError /></TextField><div className="grid gap-5 sm:grid-cols-2"><TextField name="newPassword" type="password" value={next} onChange={setNext} minLength={8} maxLength={128} isRequired autoComplete="new-password"><Label>Nieuw wachtwoord</Label><Input className="w-full" /><DutchFieldError type="password" minLength={8} maxLength={128} /></TextField><TextField name="confirmPassword" type="password" value={confirm} onChange={setConfirm} minLength={8} maxLength={128} isRequired autoComplete="new-password"><Label>Nieuw wachtwoord bevestigen</Label><Input className="w-full" /><DutchFieldError type="password" minLength={8} maxLength={128} /></TextField></div><ErrorNotice message={error} />{saved && <p role="status" className="flex items-center gap-2 text-sm text-success"><Check size={16} />Je wachtwoord is gewijzigd.</p>}<Button type="submit" isPending={busy}>Wachtwoord opslaan</Button></Form></Card.Content></Card></div></WorkspaceGate></>;
}

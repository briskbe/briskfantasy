"use client";

import Image from "next/image";
import { useState } from "react";
import { Button, Card, Checkbox, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { ArrowUpRight, Check, FileCheck2, Printer, ShieldCheck } from "lucide-react";
import type { PublicQuote } from "@/lib/cms/types";
import { quoteTotals } from "@/lib/cms/quote-math";

const money = (value: number) => new Intl.NumberFormat("en-BE", { style: "currency", currency: "EUR" }).format(value / 100);
const date = (value: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Brussels" }).format(new Date(value.length === 10 ? `${value}T12:00:00Z` : value));

export function PublicQuoteScreen({ initialQuote, token }: { initialQuote: PublicQuote; token: string }) {
  const [quote, setQuote] = useState(initialQuote);
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false); const [decision, setDecision] = useState<"accepted" | "declined">("accepted");
  const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  const client = quote.clientSnapshot;

  async function respond(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (!consent) { setError("Please confirm your response before continuing."); return; }
    setBusy(true);
    try {
      const response = await fetch(`/api/quotes/${encodeURIComponent(token)}/respond`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ decision, name, email, consent: true }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your response could not be recorded. Please try again.");
      setQuote(result); setConsent(false);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to connect. Please try again."); }
    finally { setBusy(false); }
  }

  return <main className="quote-page">
    <div className="quote-toolbar"><p className="flex items-center gap-2 text-xs text-muted"><ShieldCheck size={16} />Prepared by Brisk studio</p><Button variant="outline" size="sm" onPress={() => window.print()}><Printer size={15} />Print / save PDF</Button></div>
    <article className="quote-document" aria-labelledby="quote-title">
      <header className="quote-cover"><div className="flex flex-wrap items-center justify-between gap-4"><Image src="/logo-light.svg" alt="Brisk" width={116} height={36} priority /><a href="mailto:info@brisk.be" className="flex items-center gap-2 text-xs text-[#d7e2ce]">Let’s make it happen <ArrowUpRight size={14} /></a></div><p className="quote-number">Proposal {quote.number}</p><h1 id="quote-title">{quote.title}</h1><div className="quote-cover-meta"><div>Prepared for<strong>{client?.company || client?.name}</strong>{client?.company && client?.name}</div><div>Issued<strong>{date(quote.issueDate)}</strong></div><div>Valid until<strong>{date(quote.validUntil)}</strong></div></div></header>
      <div className="quote-body"><div className="mb-9 flex flex-wrap justify-between gap-7 text-xs leading-6 text-muted"><div><p className="quote-section-title !mb-2">Your details</p><p className="whitespace-pre-line">{client?.address}</p>{client?.vatNumber && <p>VAT {client.vatNumber}</p>}<p>{client?.email}</p></div><div><p className="quote-section-title !mb-2">From our studio</p><p>Brisk<br />Herenstraat 15, 3600 Genk<br />Belgium · info@brisk.be</p></div></div>
        {quote.introduction && <><h2 className="quote-section-title">A shared ambition</h2><p className="quote-introduction">{quote.introduction}</p></>}
        <h2 className="quote-section-title">Scope & investment</h2><div className="overflow-x-auto"><table className="quote-line-table"><thead><tr><th scope="col">Description</th><th scope="col">Qty</th><th scope="col">Rate</th><th scope="col">VAT</th><th scope="col">Amount</th></tr></thead><tbody>{quote.items.map((item) => <tr key={item.id}><td>{item.description}</td><td>{item.quantity}</td><td>{money(item.unitPriceCents)}</td><td>{item.vatRate}%</td><td>{money(quoteTotals([item], 0).subtotalCents)}</td></tr>)}</tbody></table></div>
        <div className="quote-totals"><div><span className="text-muted">Subtotal</span><span>{money(quote.subtotalCents)}</span></div>{quote.discountCents > 0 && <div><span className="text-muted">Discount</span><span>−{money(quote.discountCents)}</span></div>}<div><span className="text-muted">VAT</span><span>{money(quote.vatCents)}</span></div><div className="quote-total"><span>Total</span><span>{money(quote.totalCents)}</span></div></div>
        {quote.terms && <section className="quote-terms"><h2 className="quote-section-title">The details</h2><p>{quote.terms}</p></section>}
      </div><footer className="quote-business-footer"><span>Thoughtfully built. Made for you.</span><span>Brisk · Herenstraat 15, 3600 Genk · info@brisk.be</span></footer>
    </article>
    <section className="quote-response" aria-label="Respond to this proposal"><Card>{quote.status === "accepted" || quote.status === "declined" ? <><Card.Header><FileCheck2 size={26} className="mb-3 text-success" /><Card.Title>{quote.status === "accepted" ? "Here’s to what comes next." : "Thank you for letting us know."}</Card.Title><Card.Description>{quote.status === "accepted" ? `This proposal was approved${quote.acceptedName ? ` by ${quote.acceptedName}` : ""}${quote.acceptedAt ? ` on ${date(quote.acceptedAt)}` : ""}. Brisk will be in touch about the next steps.` : "Your response has been recorded. You can contact Brisk to discuss a revised proposal."}</Card.Description></Card.Header><Card.Content><a href="mailto:info@brisk.be" className="mt-4 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4">Contact Brisk <ArrowUpRight size={14} /></a></Card.Content></> : <><Card.Header><Card.Title className="text-xl tracking-tight">Shall we get started?</Card.Title><Card.Description>Review the scope, price and terms above, then let us know your decision.</Card.Description></Card.Header><Card.Content><Form onSubmit={respond} className="mt-6 space-y-5"><div className="grid gap-5 sm:grid-cols-2"><TextField name="name" value={name} onChange={setName} isRequired maxLength={160} autoComplete="name"><Label>Your full name</Label><Input className="w-full" /><FieldError /></TextField><TextField name="email" value={email} onChange={setEmail} type="email" isRequired maxLength={254} autoComplete="email"><Label>Your email</Label><Input className="w-full" /><FieldError /></TextField></div><div className="flex flex-wrap gap-2"><Button variant={decision === "accepted" ? "primary" : "outline"} aria-pressed={decision === "accepted"} onPress={() => { setDecision("accepted"); setConsent(false); }}>Approve proposal</Button><Button variant={decision === "declined" ? "secondary" : "ghost"} aria-pressed={decision === "declined"} onPress={() => { setDecision("declined"); setConsent(false); }}>Decline proposal</Button></div><Checkbox isSelected={consent} onChange={setConsent} isRequired><Checkbox.Content><Checkbox.Control><Checkbox.Indicator /></Checkbox.Control><span className="text-sm leading-6">{decision === "accepted" ? `I have reviewed this proposal and approve its scope, terms and total of ${money(quote.totalCents)}.` : "I confirm that I would like to decline this proposal."}</span></Checkbox.Content><FieldError /></Checkbox>{error && <p role="alert" className="rounded-lg bg-danger/5 p-3 text-sm text-danger">{error}</p>}<Button type="submit" isPending={busy} isDisabled={!consent} variant={decision === "accepted" ? "primary" : "secondary"}><Check size={16} />{decision === "accepted" ? "Confirm approval" : "Confirm decline"}</Button><p className="text-xs leading-5 text-muted">Your name, email and response are recorded with this proposal. Anyone with this link can view the proposal until it expires or is withdrawn.</p></Form></Card.Content></>}</Card></section>
  </main>;
}

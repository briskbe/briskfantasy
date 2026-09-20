"use client";

import { DutchFieldError } from "./field-error";
import Image from "next/image";
import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { ArrowUpRight, Check, FileCheck2, Printer, ShieldCheck } from "lucide-react";
import type { PublicQuote } from "@/lib/cms/types";
import { quoteTotals } from "@/lib/cms/quote-math";

const money = (value: number) =>
  new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR" }).format(value / 100);
const number = (value: number) =>
  new Intl.NumberFormat("nl-BE", { maximumFractionDigits: 3 }).format(value);
const date = (value: string) =>
  new Intl.DateTimeFormat("nl-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Brussels",
  }).format(new Date(value.length === 10 ? `${value}T12:00:00Z` : value));

export function PublicQuoteScreen({
  initialQuote,
  token,
}: {
  initialQuote: PublicQuote;
  token: string;
}) {
  const [quote, setQuote] = useState(initialQuote);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [decision, setDecision] = useState<"accepted" | "declined">("accepted");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const client = quote.clientSnapshot;

  async function respond(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!consent) {
      setError("Bevestig je keuze voordat je doorgaat.");
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(`/api/quotes/${encodeURIComponent(token)}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision, name, email, consent: true }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Je reactie kon niet worden opgeslagen. Probeer het opnieuw.");
      }
      setQuote(result);
      setConsent(false);
    } catch (cause) {
      setError(cause instanceof Error && !(cause instanceof TypeError) && !(cause instanceof SyntaxError) ? cause.message : "Geen verbinding. Probeer het opnieuw.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="quote-page">
      <div className="quote-toolbar">
        <p className="flex items-center gap-2 text-xs text-muted">
          <ShieldCheck size={16} />Offerte van Brisk
        </p>
        <Button variant="secondary" size="sm" onPress={() => window.print()}>
          <Printer size={15} />Afdrukken / opslaan als PDF
        </Button>
      </div>
      <article className="quote-document" aria-labelledby="quote-title">
        <header className="quote-cover">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Image src="/logo.svg" alt="Brisk" width={116} height={36} priority className="cms-light-logo" />
            <Image src="/logo-light.svg" alt="Brisk" width={116} height={36} priority className="cms-dark-logo" />
            <a href="mailto:info@brisk.be" className="flex items-center gap-2 text-xs text-muted">
              Neem contact op <ArrowUpRight size={14} />
            </a>
          </div>
          <p className="quote-number">Offerte {quote.number}</p>
          <h1 id="quote-title">{quote.title}</h1>
          <div className="quote-cover-meta">
            <div>Voor<strong>{client?.company || client?.name}</strong>{client?.company && client?.name}</div>
            <div>Offertedatum<strong>{date(quote.issueDate)}</strong></div>
            <div>Geldig tot<strong>{date(quote.validUntil)}</strong></div>
          </div>
        </header>
        <div className="quote-body">
          <div className="mb-9 flex flex-wrap justify-between gap-7 text-xs leading-6 text-muted">
            <div>
              <p className="quote-section-title !mb-2">Jouw gegevens</p>
              <p className="whitespace-pre-line">{client?.address}</p>
              {client?.vatNumber && <p>Btw {client.vatNumber}</p>}
              <p>{client?.email}</p>
            </div>
            <div>
              <p className="quote-section-title !mb-2">Onze gegevens</p>
              <p>Brisk<br />Herenstraat 15, 3600 Genk<br />België · info@brisk.be</p>
            </div>
          </div>
          {quote.introduction && (
            <>
              <h2 className="quote-section-title">Ons voorstel</h2>
              <p className="quote-introduction">{quote.introduction}</p>
            </>
          )}
          <h2 className="quote-section-title">Diensten en prijzen</h2>
          <div className="overflow-x-auto">
            <table className="quote-line-table">
              <thead>
                <tr>
                  <th scope="col">Omschrijving</th>
                  <th scope="col">Aantal</th>
                  <th scope="col">Eenheidsprijs</th>
                  <th scope="col">Btw</th>
                  <th scope="col">Bedrag</th>
                </tr>
              </thead>
              <tbody>
                {quote.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.description}</td>
                    <td>{number(item.quantity)}</td>
                    <td>{money(item.unitPriceCents)}</td>
                    <td>{number(item.vatRate)}%</td>
                    <td>{money(quoteTotals([item], 0).subtotalCents)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="quote-totals">
            <div><span className="text-muted">Subtotaal</span><span>{money(quote.subtotalCents)}</span></div>
            {quote.discountCents > 0 && (
              <div><span className="text-muted">Korting</span><span>−{money(quote.discountCents)}</span></div>
            )}
            <div><span className="text-muted">Btw</span><span>{money(quote.vatCents)}</span></div>
            <div className="quote-total"><span>Totaal</span><span>{money(quote.totalCents)}</span></div>
          </div>
          {quote.terms && (
            <section className="quote-terms">
              <h2 className="quote-section-title">Voorwaarden</h2>
              <p>{quote.terms}</p>
            </section>
          )}
        </div>
        <footer className="quote-business-footer">
          <span>Vragen over deze offerte? Neem gerust contact op.</span>
          <span>Brisk · Herenstraat 15, 3600 Genk · info@brisk.be</span>
        </footer>
      </article>
      <section className="quote-response" aria-label="Reageren op deze offerte">
        <Card>
          {quote.status === "accepted" || quote.status === "declined" ? (
            <>
              <Card.Header>
                <FileCheck2 size={26} className="mb-3 text-success" />
                <Card.Title>
                  {quote.status === "accepted" ? "Offerte goedgekeurd" : "Offerte afgewezen"}
                </Card.Title>
                <Card.Description>
                  {quote.status === "accepted"
                    ? `Deze offerte is goedgekeurd${quote.acceptedName ? ` door ${quote.acceptedName}` : ""}${quote.acceptedAt ? ` op ${date(quote.acceptedAt)}` : ""}. Brisk neemt contact op over de volgende stappen.`
                    : "Je reactie is opgeslagen. Neem contact op met Brisk als je een aangepast voorstel wilt bespreken."}
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <a href="mailto:info@brisk.be" className="mt-4 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4">
                  Neem contact op met Brisk <ArrowUpRight size={14} />
                </a>
              </Card.Content>
            </>
          ) : (
            <>
              <Card.Header>
                <Card.Title>Jouw reactie</Card.Title>
                <Card.Description>Bekijk de diensten, prijzen en voorwaarden hierboven en laat weten of je akkoord gaat.</Card.Description>
              </Card.Header>
              <Card.Content>
                <Form onSubmit={respond} className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField name="name" value={name} onChange={setName} isRequired maxLength={160} autoComplete="name">
                      <Label>Je volledige naam</Label><Input className="w-full" /><DutchFieldError maxLength={160} />
                    </TextField>
                    <TextField name="email" value={email} onChange={setEmail} type="email" isRequired maxLength={254} autoComplete="email">
                      <Label>Je e-mailadres</Label><Input className="w-full" /><DutchFieldError type="email" maxLength={254} />
                    </TextField>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant={decision === "accepted" ? "primary" : "secondary"} aria-pressed={decision === "accepted"} onPress={() => { setDecision("accepted"); setConsent(false); }}>
                      Offerte goedkeuren
                    </Button>
                    <Button variant={decision === "declined" ? "primary" : "secondary"} aria-pressed={decision === "declined"} onPress={() => { setDecision("declined"); setConsent(false); }}>
                      Offerte afwijzen
                    </Button>
                  </div>
                  <Checkbox isSelected={consent} onChange={setConsent} isRequired>
                    <Checkbox.Content>
                      <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
                      <span className="text-sm leading-6">
                        {decision === "accepted"
                          ? `Ik heb deze offerte gelezen en ga akkoord met de diensten, voorwaarden en het totaalbedrag van ${money(quote.totalCents)}.`
                          : "Ik bevestig dat ik deze offerte wil afwijzen."}
                      </span>
                    </Checkbox.Content>
                    <DutchFieldError type="checkbox" />
                  </Checkbox>
                  {error && <p role="alert" className="rounded-lg bg-danger/5 p-3 text-sm text-danger">{error}</p>}
                  <Button type="submit" isPending={busy} isDisabled={!consent} variant={decision === "accepted" ? "primary" : "secondary"}>
                    <Check size={16} />{decision === "accepted" ? "Goedkeuring bevestigen" : "Afwijzing bevestigen"}
                  </Button>
                  <p className="text-xs leading-5 text-muted">
                    Je naam, e-mailadres en reactie worden bij deze offerte opgeslagen. Iedereen met deze link kan de offerte bekijken totdat deze verloopt of wordt ingetrokken.
                  </p>
                </Form>
              </Card.Content>
            </>
          )}
        </Card>
      </section>
    </main>
  );
}

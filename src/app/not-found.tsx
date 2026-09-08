import Link from "next/link";
import "./globals.css";

export default function RootNotFound() {
  return (
    <html lang="nl" className="theme-dark">
      <body className="min-h-dvh flex items-center justify-center bg-ink text-paper font-sans">
        <div className="text-center px-6">
          <p className="eyebrow text-amber mb-6">404</p>
          <h1 className="text-h2">Pagina niet gevonden.</h1>
          <Link href="/" className="mt-8 inline-block underline underline-offset-8">
            Terug naar Brisk
          </Link>
        </div>
      </body>
    </html>
  );
}

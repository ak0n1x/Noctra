import type { ReactNode } from "react";
import Link from "next/link";
import { NoctraLogo } from "../brand/noctra-logo";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <main className="auth-page grid-backdrop">
      <div className="auth-wrap">
        <Link aria-label="Noctra home" className="auth-brand" href="/">
          <NoctraLogo />
        </Link>
        <header className="auth-heading">
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
        <section aria-label={title} className="auth-card">
          {children}
        </section>
        <p className="auth-footer">{footer}</p>
        <p className="auth-legal">Open source by nature. Yours to host.</p>
      </div>
    </main>
  );
}

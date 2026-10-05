import Link from "next/link";
import { NoctraLogo } from "../components/brand/noctra-logo";
import { SpaceCard } from "../components/app/space-card";
import { Icon } from "../components/ui/icon";
import { spaces } from "../lib/mock-data";

export default function Home() {
  return (
    <main className="landing-page grid-backdrop">
      <nav aria-label="Main navigation" className="landing-nav">
        <Link aria-label="Noctra home" className="landing-brand" href="/">
          <NoctraLogo />
        </Link>
        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#security">Security</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#contribute">Contribute</a>
        </div>
        <div className="landing-nav-actions">
          <Link className="nav-signin" href="/login">
            Sign in
          </Link>
          <Link className="button button-primary button-small" href="/register">
            Get started <Icon name="arrow-right" />
          </Link>
        </div>
      </nav>

      <section aria-labelledby="hero-title" className="hero-section">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="hero-content">
          <span className="hero-badge">
            <i />
            Open source <b>·</b> Security-first <b>·</b> Realtime
          </span>
          <h1 id="hero-title">
            Where communities
            <br />
            <span>communicate openly</span>
          </h1>
          <p className="hero-description">
            Noctra is a free, open source platform for building thriving communities. Create spaces,
            organize channels, and chat in realtime — on infrastructure you can read, audit, and
            self-host.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/register">
              Get started <Icon name="arrow-right" />
            </Link>
            <a
              className="button button-secondary"
              href="https://github.com"
              rel="noreferrer"
              target="_blank"
            >
              <Icon name="github" />
              View on GitHub
            </a>
          </div>
          <div className="hero-trust">
            <span>
              <Icon name="shield" /> Open source
            </span>
            <i />
            <span>Built for communities</span>
            <i />
            <span>Self-hosted by design</span>
          </div>
        </div>
        <a aria-label="Explore communities" className="hero-scroll" href="#spaces">
          <span />
          Scroll to explore
        </a>
      </section>

      <section aria-labelledby="spaces-title" className="spaces-section" id="spaces">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A PLACE TO BEGIN</span>
            <h2 id="spaces-title">Find your people.</h2>
          </div>
          <Link className="text-link" href="/app">
            Explore spaces <Icon name="arrow-right" />
          </Link>
        </div>
        <div className="space-card-grid landing-space-grid">
          {spaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      </section>

      <section aria-labelledby="features-title" className="values-section" id="features">
        <div className="values-intro">
          <span className="eyebrow">COMMUNITY, ON YOUR TERMS</span>
          <h2 id="features-title">
            Open by design.
            <br />
            <span>Made to belong.</span>
          </h2>
          <p>
            Tools for meaningful communities, built on foundations everyone can inspect and improve.
          </p>
        </div>
        <div className="value-list">
          <article className="value-item" id="security">
            <span className="value-icon value-icon-mint">
              <Icon name="shield" />
            </span>
            <div>
              <h3>Security you can see</h3>
              <p>
                Transparent infrastructure and security-first decisions, documented in the open.
              </p>
            </div>
            <span className="value-index">01</span>
          </article>
          <article className="value-item" id="roadmap">
            <span className="value-icon value-icon-blue">
              <Icon name="compass" />
            </span>
            <div>
              <h3>Built in the open</h3>
              <p>Follow the roadmap, shape what comes next, and contribute at your own pace.</p>
            </div>
            <span className="value-index">02</span>
          </article>
          <article className="value-item" id="contribute">
            <span className="value-icon value-icon-violet">
              <Icon name="users" />
            </span>
            <div>
              <h3>Your space, your rules</h3>
              <p>Self-host Noctra and build a space that reflects the people in it.</p>
            </div>
            <span className="value-index">03</span>
          </article>
        </div>
      </section>

      <footer className="landing-footer">
        <NoctraLogo />
        <span>Where communities communicate openly.</span>
        <span>AGPL-3.0 · Open source, always.</span>
      </footer>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { NoctraLogo } from "../../../components/brand/noctra-logo";
import { Icon } from "../../../components/ui/icon";

export default function ProfileSettingsPage() {
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <main className="settings-page">
      <header className="settings-topbar">
        <Link aria-label="Noctra home" href="/">
          <NoctraLogo />
        </Link>
        <Link className="settings-back-link" href="/app">
          <Icon name="arrow-right" />
          Back to Noctra
        </Link>
      </header>
      <div className="settings-layout">
        <aside className="settings-nav">
          <span className="eyebrow">ACCOUNT</span>
          <a className="settings-nav-active" href="#profile">
            <Icon name="user" />
            Profile
          </a>
          <a href="#security">
            <Icon name="lock" />
            Security
          </a>
          <a href="#notifications">
            <Icon name="bell" />
            Notifications
          </a>
        </aside>
        <section className="settings-content" id="profile">
          <div className="settings-heading">
            <span className="eyebrow">YOUR ACCOUNT</span>
            <h1>Profile</h1>
            <p>Manage how you appear across Noctra.</p>
          </div>
          <form className="profile-form" onSubmit={submit}>
            <div className="profile-avatar-row">
              <div className="profile-avatar">
                V<span />
              </div>
              <div>
                <strong>Avatar</strong>
                <p>PNG or JPG. 2 MB max.</p>
              </div>
              <button className="button button-secondary button-small" type="button">
                Change avatar
              </button>
            </div>
            <label className="field">
              <span className="field-label">Username</span>
              <input
                autoComplete="username"
                className="text-input settings-input"
                defaultValue="visitor"
                maxLength={32}
                minLength={3}
                required
              />
            </label>
            <label className="field">
              <span className="field-label">Display name</span>
              <input className="text-input settings-input" defaultValue="Visitor" maxLength={48} />
            </label>
            <label className="field">
              <span className="field-label">
                Bio <span className="optional-label">Optional</span>
              </span>
              <textarea
                className="text-input settings-textarea"
                defaultValue=""
                maxLength={160}
                placeholder="A little about you..."
                rows={4}
              />
            </label>
            <div className="settings-save-row">
              <span aria-live="polite" className="save-status">
                {saved ? (
                  <>
                    <Icon name="check" />
                    Changes saved locally
                  </>
                ) : (
                  "Changes stay in this prototype."
                )}
              </span>
              <button className="button button-primary" type="submit">
                Save changes
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

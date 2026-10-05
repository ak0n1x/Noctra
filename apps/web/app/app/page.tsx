import Link from "next/link";
import { AppShell } from "../../components/app/app-shell";
import { SpaceCard } from "../../components/app/space-card";
import { Icon } from "../../components/ui/icon";
import { spaces } from "../../lib/mock-data";

export default function DashboardPage() {
  return (
    <AppShell>
      <section className="dashboard-page">
        <div className="dashboard-welcome">
          <div className="dashboard-orbit">
            <span>
              <Icon name="sparkle" />
            </span>
            <i />
          </div>
          <span className="eyebrow">YOUR COMMUNITY STARTS HERE</span>
          <h1>
            Welcome to <span>Noctra</span>
          </h1>
          <p>
            Pick a space to jump into the conversation, or start your own community. Everything
            below is mock data — the real backend comes next.
          </p>
          <button className="button button-primary" type="button">
            Create a space <Icon name="plus" />
          </button>
        </div>
        <div className="dashboard-spaces-heading">
          <div>
            <span className="eyebrow">YOUR SPACES</span>
            <h2>Spaces to explore</h2>
          </div>
          <Link className="text-link" href="/app/spaces/noctra-core">
            Open Noctra Core <Icon name="arrow-right" />
          </Link>
        </div>
        <div className="space-card-grid dashboard-space-grid">
          {spaces.map((space) => (
            <SpaceCard dashboard key={space.id} space={space} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}

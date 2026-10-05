import { notFound } from "next/navigation";
import Link from "next/link";
import { AppShell } from "../../../../components/app/app-shell";
import { SpaceAvatar } from "../../../../components/app/space-avatar";
import { CreateChannelTrigger } from "../../../../components/app/create-channel-trigger";
import { Icon } from "../../../../components/ui/icon";
import { channels, spaces } from "../../../../lib/mock-data";

export function generateStaticParams() {
  return spaces.map(({ id }) => ({ spaceId: id }));
}

export default async function SpacePage({ params }: { params: Promise<{ spaceId: string }> }) {
  const { spaceId } = await params;
  const space = spaces.find((item) => item.id === spaceId);
  if (!space) notFound();

  return (
    <AppShell selectedSpaceId={space.id}>
      <section className="space-home-page">
        <div className="space-home-intro">
          <SpaceAvatar space={space} size="large" />
          <div>
            <span className="eyebrow">COMMUNITY SPACE</span>
            <h1>{space.name}</h1>
            <p>
              <span className="online-dot" />
              {space.online} online <i>·</i> {space.members.toLocaleString()} members
            </p>
          </div>
        </div>
        <p className="space-description">{space.description}</p>
        <div className="space-channels-heading">
          <div>
            <span className="eyebrow">START A CONVERSATION</span>
            <h2>Channels</h2>
          </div>
          <CreateChannelTrigger />
        </div>
        <div className="space-channel-list">
          {channels.map((channel, index) => (
            <Link
              className="space-channel-card"
              href={`/app/spaces/${space.id}/channels/${channel.id}`}
              key={channel.id}
            >
              <span
                className={`space-channel-icon ${channel.type === "voice" ? "space-channel-voice" : ""}`}
              >
                {channel.type === "text" ? <Icon name="hash" /> : <Icon name="volume" />}
              </span>
              <span className="space-channel-copy">
                <strong>{channel.name}</strong>
                <span>{channel.description}</span>
              </span>
              <span className="space-channel-index">{String(index + 1).padStart(2, "0")}</span>
              <Icon className="space-channel-arrow" name="arrow-right" />
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

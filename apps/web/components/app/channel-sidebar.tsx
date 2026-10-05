import Link from "next/link";
import type { Channel, Space } from "../../types";
import { Icon } from "../ui/icon";
import { SpaceAvatar } from "./space-avatar";
import { UserPanel } from "./user-panel";

type ChannelSidebarProps = {
  space?: Space;
  channels: Channel[];
  activeChannelId?: string;
  mobileOpen: boolean;
  onClose: () => void;
};

export function ChannelSidebar({
  space,
  channels,
  activeChannelId,
  mobileOpen,
  onClose,
}: ChannelSidebarProps) {
  const textChannels = channels.filter((channel) => channel.type === "text");
  const voiceChannels = channels.filter((channel) => channel.type === "voice");

  return (
    <aside className={`channel-sidebar ${mobileOpen ? "channel-sidebar-open" : ""}`}>
      <div className="channel-sidebar-header">
        {space ? (
          <SpaceAvatar space={space} />
        ) : (
          <span className="empty-space-mark">
            <Icon name="compass" />
          </span>
        )}
        <span className="channel-space-name">{space?.name ?? "No space selected"}</span>
        <button
          aria-label="Close navigation"
          className="mobile-sidebar-close"
          onClick={onClose}
          type="button"
        >
          <Icon name="close" />
        </button>
        {space && (
          <button
            aria-label="Space options"
            className="sidebar-menu"
            title="Space options"
            type="button"
          >
            <Icon name="more" />
          </button>
        )}
      </div>
      {space ? (
        <div className="channel-nav">
          <Link
            className={`channel-home-link ${!activeChannelId ? "channel-home-active" : ""}`}
            href={`/app/spaces/${space.id}`}
            onClick={onClose}
          >
            <Icon name="home" />
            <span>Home</span>
          </Link>
          <div className="channel-group">
            <div className="channel-group-heading">
              <span>Text channels</span>
              <button
                aria-label="Create a channel"
                onClick={() => window.dispatchEvent(new Event("noctra:create-channel"))}
                type="button"
              >
                <Icon name="plus" />
              </button>
            </div>
            {textChannels.map((channel) => (
              <Link
                className={`channel-link ${activeChannelId === channel.id ? "channel-link-active" : ""}`}
                href={`/app/spaces/${space.id}/channels/${channel.id}`}
                key={channel.id}
                onClick={onClose}
              >
                <Icon name="hash" />
                <span>{channel.name}</span>
              </Link>
            ))}
          </div>
          <div className="channel-group">
            <div className="channel-group-heading">
              <span>Voice channels</span>
              <button
                aria-label="Create a channel"
                onClick={() => window.dispatchEvent(new Event("noctra:create-channel"))}
                type="button"
              >
                <Icon name="plus" />
              </button>
            </div>
            {voiceChannels.map((channel) => (
              <Link
                className="channel-link"
                href={`/app/spaces/${space.id}/channels/${channel.id}`}
                key={channel.id}
                onClick={onClose}
              >
                <Icon name="volume" />
                <span>{channel.name}</span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="channel-empty-hint">Select a space from the rail to see its channels.</div>
      )}
      <UserPanel />
    </aside>
  );
}

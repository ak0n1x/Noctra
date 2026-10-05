"use client";

import { useEffect, useState, type ReactNode } from "react";
import { channels as baseChannels, spaces } from "../../lib/mock-data";
import type { Channel, Space } from "../../types";
import { CreateChannelModal } from "./create-channel-modal";
import { ChannelSidebar } from "./channel-sidebar";
import { MemberSidebar } from "./member-sidebar";
import { SpaceRail } from "./space-rail";
import { Topbar } from "./topbar";

type AppShellProps = {
  children: ReactNode;
  selectedSpaceId?: string;
  activeChannelId?: string;
};

export function AppShell({ children, selectedSpaceId, activeChannelId }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [extraChannels, setExtraChannels] = useState<Channel[]>([]);
  const space: Space | undefined = spaces.find((item) => item.id === selectedSpaceId);
  const allChannels = [...baseChannels, ...extraChannels];
  const activeChannel = allChannels.find((channel) => channel.id === activeChannelId);

  useEffect(() => {
    const openModal = () => setModalOpen(true);
    window.addEventListener("noctra:create-channel", openModal);
    return () => window.removeEventListener("noctra:create-channel", openModal);
  }, []);

  function createChannel(name: string, type: "text" | "voice") {
    setExtraChannels((current) => [
      ...current,
      {
        id: name,
        name,
        type,
        description: type === "text" ? "A new conversation space." : "A new voice room.",
      },
    ]);
    setModalOpen(false);
  }

  const headerTitle = activeChannel
    ? `# ${activeChannel.name}`
    : (space?.name ?? "No space selected");
  const headerDescription =
    activeChannel?.description ??
    (space ? `${space.online} online · ${space.members.toLocaleString()} members` : undefined);

  return (
    <div className="app-frame">
      <SpaceRail activeSpaceId={space?.id} />
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="mobile-scrim"
          onClick={() => setMobileOpen(false)}
          type="button"
        />
      )}
      <ChannelSidebar
        activeChannelId={activeChannelId}
        channels={allChannels}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        space={space}
      />
      <div className="app-main-column">
        <Topbar
          description={headerDescription}
          onCreateChannel={space ? () => setModalOpen(true) : undefined}
          onMenuClick={() => setMobileOpen(true)}
          title={headerTitle}
        />
        <div
          className={`app-content-grid ${space && !activeChannelId ? "app-content-space-home" : ""}`}
        >
          <main className="app-main-content">{children}</main>
          {space && activeChannelId && <MemberSidebar />}
        </div>
      </div>
      <CreateChannelModal
        onClose={() => setModalOpen(false)}
        onCreate={createChannel}
        open={modalOpen}
      />
    </div>
  );
}

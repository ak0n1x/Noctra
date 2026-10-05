import { notFound } from "next/navigation";
import { AppShell } from "../../../../../../components/app/app-shell";
import { MessageChat } from "../../../../../../components/app/message-chat";
import { VoiceRoom } from "../../../../../../components/app/voice-room";
import { channels, spaces } from "../../../../../../lib/mock-data";

export default async function ChannelPage({
  params,
}: {
  params: Promise<{ spaceId: string; channelId: string }>;
}) {
  const { spaceId, channelId } = await params;
  const space = spaces.find((item) => item.id === spaceId);
  const channel = channels.find((item) => item.id === channelId);
  if (!space || !channel) notFound();

  return (
    <AppShell activeChannelId={channel.id} selectedSpaceId={space.id}>
      {channel.type === "text" ? <MessageChat /> : <VoiceRoom />}
    </AppShell>
  );
}

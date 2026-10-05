import Link from "next/link";
import type { Space } from "../../types";
import { Icon } from "../ui/icon";
import { SpaceAvatar } from "./space-avatar";

type SpaceCardProps = {
  space: Space;
  dashboard?: boolean;
};

export function SpaceCard({ space, dashboard = false }: SpaceCardProps) {
  return (
    <Link className="space-card" href={`/app/spaces/${space.id}`}>
      <span className="space-card-top">
        <SpaceAvatar space={space} size="large" />
        <span aria-hidden="true" className="space-card-arrow">
          <Icon name="arrow-right" />
        </span>
      </span>
      <strong>{space.name}</strong>
      {dashboard ? (
        <span className="space-card-meta">
          <span className="online-dot" />
          {space.online} online <span className="meta-divider">·</span>{" "}
          {space.members.toLocaleString()} members
        </span>
      ) : (
        <span className="space-card-meta">{space.members.toLocaleString()} members</span>
      )}
    </Link>
  );
}

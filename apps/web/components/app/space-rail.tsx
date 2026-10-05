import Link from "next/link";
import { spaces } from "../../lib/mock-data";
import { Icon } from "../ui/icon";
import { SpaceAvatar } from "./space-avatar";

export function SpaceRail({ activeSpaceId }: { activeSpaceId?: string }) {
  return (
    <nav aria-label="Spaces" className="space-rail">
      <Link aria-label="Noctra home" className="rail-home" href="/app">
        <Icon name="home" />
      </Link>
      <span aria-hidden="true" className="rail-separator" />
      {spaces.map((space) => (
        <Link
          aria-label={space.name}
          aria-current={activeSpaceId === space.id ? "page" : undefined}
          className={`rail-space ${activeSpaceId === space.id ? "rail-space-active" : ""}`}
          href={`/app/spaces/${space.id}`}
          key={space.id}
          title={space.name}
        >
          <SpaceAvatar space={space} />
        </Link>
      ))}
      <button aria-label="Create a space" className="rail-add" title="Create a space" type="button">
        <Icon name="plus" />
      </button>
      <span className="rail-spacer" />
      <Link
        aria-label="Profile settings"
        className="rail-settings"
        href="/settings/profile"
        title="Profile settings"
      >
        <Icon name="settings" />
      </Link>
    </nav>
  );
}

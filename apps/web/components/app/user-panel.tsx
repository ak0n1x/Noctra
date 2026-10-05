import Link from "next/link";
import { Icon } from "../ui/icon";

export function UserPanel() {
  return (
    <footer className="user-panel">
      <span className="visitor-avatar">V</span>
      <span className="visitor-details">
        <strong>Visitor</strong>
        <span>
          <i />
          Online
        </span>
      </span>
      <Link
        aria-label="Profile settings"
        className="user-panel-action"
        href="/settings/profile"
        title="Settings"
      >
        <Icon name="settings" />
      </Link>
      <button
        aria-label="Notifications"
        className="user-panel-action"
        title="Notifications"
        type="button"
      >
        <Icon name="bell" />
      </button>
    </footer>
  );
}

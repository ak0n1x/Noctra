import { Icon } from "../ui/icon";

type TopbarProps = {
  title: string;
  description?: string;
  onMenuClick: () => void;
  onCreateChannel?: () => void;
};

export function Topbar({ title, description, onMenuClick, onCreateChannel }: TopbarProps) {
  return (
    <header className="app-topbar">
      <button
        aria-label="Open channel navigation"
        className="topbar-menu"
        onClick={onMenuClick}
        type="button"
      >
        <Icon name="menu" />
      </button>
      <span className="topbar-title-wrap">
        <strong>{title}</strong>
        {description && <span>{description}</span>}
      </span>
      <span className="topbar-spacer" />
      {onCreateChannel && (
        <button
          className="button button-secondary button-small topbar-create"
          onClick={onCreateChannel}
          type="button"
        >
          <Icon name="plus" />
          New channel
        </button>
      )}
      <button
        aria-label="Notifications"
        className="topbar-icon-button"
        title="Notifications"
        type="button"
      >
        <Icon name="bell" />
      </button>
    </header>
  );
}

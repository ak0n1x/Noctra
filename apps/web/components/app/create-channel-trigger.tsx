"use client";

import { Icon } from "../ui/icon";

export function CreateChannelTrigger() {
  return (
    <button
      className="button button-secondary button-small"
      onClick={() => window.dispatchEvent(new Event("noctra:create-channel"))}
      type="button"
    >
      <Icon name="plus" />
      New channel
    </button>
  );
}

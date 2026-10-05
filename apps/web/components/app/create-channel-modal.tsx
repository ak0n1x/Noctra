"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "../ui/icon";
import { Button } from "../ui/button";

type CreateChannelModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, type: "text" | "voice") => void;
};

export function CreateChannelModal({ open, onClose, onCreate }: CreateChannelModalProps) {
  const [channelType, setChannelType] = useState<"text" | "voice">("text");
  const [name, setName] = useState("");

  if (!open) return null;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedName = name.trim().toLowerCase().replace(/\s+/g, "-");
    if (!normalizedName) return;
    onCreate(normalizedName, channelType);
    setName("");
    setChannelType("text");
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="create-channel-title"
        aria-modal="true"
        className="create-channel-modal"
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose();
        }}
        role="dialog"
      >
        <button aria-label="Close dialog" className="modal-close" onClick={onClose} type="button">
          <Icon name="close" />
        </button>
        <span className="modal-kicker">NOCTRA CORE</span>
        <h2 id="create-channel-title">Create a channel</h2>
        <p>Channels keep conversations organized inside a space.</p>
        <form onSubmit={submit}>
          <fieldset className="channel-type-fieldset">
            <legend>Channel type</legend>
            <div className="channel-type-options">
              <button
                aria-pressed={channelType === "text"}
                className={`channel-type-option ${channelType === "text" ? "channel-type-selected" : ""}`}
                onClick={() => setChannelType("text")}
                type="button"
              >
                <Icon name="hash" />
                Text
              </button>
              <button
                aria-pressed={channelType === "voice"}
                className={`channel-type-option ${channelType === "voice" ? "channel-type-selected" : ""}`}
                onClick={() => setChannelType("voice")}
                type="button"
              >
                <Icon name="volume" />
                Voice
              </button>
            </div>
          </fieldset>
          <label className="field-label" htmlFor="channel-name">
            Channel name
          </label>
          <div className="channel-name-input">
            <Icon name={channelType === "text" ? "hash" : "volume"} />
            <input
              autoFocus
              id="channel-name"
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. design-discussion"
              value={name}
            />
          </div>
          <div className="modal-actions">
            <Button onClick={onClose} type="button">
              Cancel
            </Button>
            <Button disabled={!name.trim()} type="submit" variant="primary">
              Create channel
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

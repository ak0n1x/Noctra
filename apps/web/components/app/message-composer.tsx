import type { FormEventHandler } from "react";
import { Icon } from "../ui/icon";

type MessageComposerProps = {
  draft: string;
  channelName: string;
  onDraftChange: (value: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export function MessageComposer({ draft, channelName, onDraftChange, onSubmit }: MessageComposerProps) {
  return (
    <form className="message-composer" onSubmit={onSubmit}>
      <button
        aria-label="Add attachment"
        className="composer-action composer-add"
        title="Add attachment"
        type="button"
      >
        <Icon name="plus" />
      </button>
      <input
        aria-label={`Message #${channelName}`}
        onChange={(event) => onDraftChange(event.target.value)}
        placeholder={`Message #${channelName}`}
        value={draft}
      />
      <div className="composer-actions">
        <button
          aria-label="Attach a file"
          className="composer-action"
          title="Attach a file"
          type="button"
        >
          <Icon name="paperclip" />
        </button>
        <button
          aria-label="Choose emoji"
          className="composer-action"
          title="Choose emoji"
          type="button"
        >
          <Icon name="smile" />
        </button>
        <button
          aria-label="Send message"
          className="composer-send"
          disabled={!draft.trim()}
          title="Send message"
          type="submit"
        >
          <Icon name="send" />
        </button>
      </div>
    </form>
  );
}
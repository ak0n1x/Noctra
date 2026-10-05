"use client";

import { useState, type FormEvent } from "react";
import { messages as initialMessages, members } from "../../lib/mock-data";
import type { Message } from "../../types";
import { Icon } from "../ui/icon";
import { MessageComposer } from "./message-composer";
import { MessageItem } from "./message-item";

export function MessageChat() {
  const [chatMessages, setChatMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = draft.trim();
    if (!body) return;
    const nextMessage: Message = {
      id: `visitor-${Date.now()}`,
      authorId: "visitor",
      body,
      time: "now",
    };
    setChatMessages((current) => [...current, nextMessage]);
    setDraft("");
  }

  return (
    <section aria-label="Messages in general" className="chat-view">
      <div className="chat-history" aria-live="polite">
        <div className="channel-welcome">
          <span className="channel-welcome-icon">
            <Icon name="hash" />
          </span>
          <h1>Welcome to #general</h1>
          <p>
            This is the beginning of the <strong>#general</strong> channel.
          </p>
        </div>
        {chatMessages.map((message) => (
          <MessageItem
            author={members.find((member) => member.id === message.authorId)}
            key={message.id}
            message={message}
          />
        ))}
      </div>
      <MessageComposer
        channelName="general"
        draft={draft}
        onDraftChange={setDraft}
        onSubmit={submitMessage}
      />
    </section>
  );
}

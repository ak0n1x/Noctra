"use client";

import { useState } from "react";
import { members } from "../../lib/mock-data";
import { Icon } from "../ui/icon";

export function VoiceRoom() {
  const [joined, setJoined] = useState(false);
  const presentMembers = members.filter((member) => member.online).slice(0, 2);

  return (
    <section aria-label="Voice lobby" className="voice-room">
      <div className="voice-room-orbit"><span><Icon name="volume" /></span><i /></div>
      <span className="eyebrow">VOICE CHANNEL</span>
      <h1>voice-lobby</h1>
      <p>{joined ? "You joined this mock voice room. Audio is not connected." : "Drop in and talk with the team."}</p>
      <div className="voice-room-members">
        {presentMembers.map((member) => (
          <span className="voice-room-person" key={member.id}>
            <span className="voice-room-avatar" style={{ backgroundColor: member.color }}>{member.initials}</span>
            <span>{member.name}</span>
          </span>
        ))}
        {joined && <span className="voice-room-person"><span className="voice-room-avatar voice-room-visitor">V</span><span>You</span></span>}
      </div>
      <button className={`button ${joined ? "button-secondary" : "button-primary"}`} onClick={() => setJoined((current) => !current)} type="button">
        <Icon name={joined ? "close" : "volume"} />{joined ? "Leave voice" : "Join voice"}
      </button>
      <span className="voice-room-note">Prototype only · no microphone or audio connection</span>
    </section>
  );
}
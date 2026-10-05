import { members } from "../../lib/mock-data";
import type { Member } from "../../types";

function MemberItem({ member }: { member: Member }) {
  return (
    <div className="member-item">
      <span className="member-avatar" style={{ backgroundColor: member.color }}>
        {member.initials}
      </span>
      <span className="member-name-wrap">
        <span className="member-name">{member.name}</span>
        {member.role !== "MEMBER" && (
          <span className={`member-role member-role-${member.role.toLowerCase()}`}>
            {member.role}
          </span>
        )}
      </span>
      {member.online && <span aria-label="Online" className="member-presence" />}
    </div>
  );
}

export function MemberSidebar() {
  const onlineMembers = members.filter((member) => member.online);
  const offlineMembers = members.filter((member) => !member.online);

  return (
    <aside aria-label="Space members" className="member-sidebar">
      <div className="member-group">
        <h2 className="member-group-title">
          Online <span>{onlineMembers.length}</span>
        </h2>
        {onlineMembers.map((member) => (
          <MemberItem key={member.id} member={member} />
        ))}
      </div>
      <div className="member-group">
        <h2 className="member-group-title">Offline</h2>
        {offlineMembers.map((member) => (
          <MemberItem key={member.id} member={member} />
        ))}
      </div>
      <div className="member-note">
        <span className="online-dot" />
        {onlineMembers.length} members online
      </div>
    </aside>
  );
}

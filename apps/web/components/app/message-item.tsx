import type { Member, Message } from "../../types";

type MessageItemProps = {
  message: Message;
  author?: Member;
};

export function MessageItem({ message, author }: MessageItemProps) {
  const name = author?.name ?? "Visitor";
  const initials = author?.initials ?? "V";
  const color = author?.color ?? "#31d6b5";

  return (
    <article className="message-item">
      <span className="message-avatar" style={{ backgroundColor: color }}>
        {initials}
      </span>
      <div className="message-content">
        <div className="message-meta">
          <strong>{name}</strong>
          {author && author.role !== "MEMBER" && (
            <span className={`message-role message-role-${author.role.toLowerCase()}`}>
              {author.role}
            </span>
          )}
          <time>{message.time}</time>
        </div>
        <p>{message.body}</p>
      </div>
    </article>
  );
}
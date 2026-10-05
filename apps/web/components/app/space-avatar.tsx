import type { Space } from "../../types";

type SpaceAvatarProps = {
  space: Pick<Space, "initials" | "gradient">;
  size?: "small" | "normal" | "large";
};

export function SpaceAvatar({ space, size = "normal" }: SpaceAvatarProps) {
  return (
    <span className={`space-avatar space-avatar-${size}`} style={{ background: space.gradient }}>
      {space.initials}
    </span>
  );
}

export type Space = {
  id: string;
  initials: string;
  name: string;
  members: number;
  online: number;
  gradient: string;
  description: string;
};

export type Channel = {
  id: string;
  name: string;
  description: string;
  type: "text" | "voice";
};

export type Member = {
  id: string;
  name: string;
  role: "ADMIN" | "MODERATOR" | "MEMBER";
  initials: string;
  color: string;
  online: boolean;
};

export type Message = {
  id: string;
  authorId: string;
  body: string;
  time: string;
};

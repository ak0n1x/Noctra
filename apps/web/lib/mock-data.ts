import type { Channel, Member, Message, Space } from "../types";

export const spaces: Space[] = [
  {
    id: "noctra-core",
    initials: "NC",
    name: "Noctra Core",
    members: 1284,
    online: 342,
    gradient: "linear-gradient(135deg, #31d6b5, #3387ca 58%, #7667f2)",
    description: "The open source home of the Noctra project. Core discussions, roadmap and RFCs.",
  },
  {
    id: "dev-circle",
    initials: "DC",
    name: "Dev Circle",
    members: 876,
    online: 198,
    gradient: "linear-gradient(135deg, #5aa9e6, #7667f2)",
    description: "A thoughtful corner for builders, makers and open-source contributors.",
  },
  {
    id: "security-lab",
    initials: "SL",
    name: "Security Lab",
    members: 512,
    online: 97,
    gradient: "linear-gradient(135deg, #31d6b5, #4b9c9c)",
    description: "Share research, harden systems and learn security together.",
  },
  {
    id: "gaming-lounge",
    initials: "GL",
    name: "Gaming Lounge",
    members: 2041,
    online: 431,
    gradient: "linear-gradient(135deg, #7667f2, #d36b9b)",
    description: "Good games, better company, and a place to find your next party.",
  },
];

export const channels: Channel[] = [
  {
    id: "general",
    name: "general",
    description: "Welcome to Noctra Core — say hi, ask anything.",
    type: "text",
  },
  {
    id: "announcements",
    name: "announcements",
    description: "Official product and community announcements.",
    type: "text",
  },
  {
    id: "help",
    name: "help",
    description: "Get help setting up Noctra or self-hosting.",
    type: "text",
  },
  {
    id: "roadmap",
    name: "roadmap",
    description: "What we are building next, and how to influence it.",
    type: "text",
  },
  { id: "random", name: "random", description: "Off-topic chat and memes.", type: "text" },
  {
    id: "voice-lobby",
    name: "voice-lobby",
    description: "Drop in and talk with the team.",
    type: "voice",
  },
];

export const members: Member[] = [
  {
    id: "abdoulaye",
    name: "Abdoulaye",
    role: "ADMIN",
    initials: "A",
    color: "#31d6b5",
    online: true,
  },
  { id: "sarah", name: "Sarah", role: "MODERATOR", initials: "S", color: "#e6a866", online: true },
  { id: "malik", name: "Malik", role: "MEMBER", initials: "M", color: "#6ea4ed", online: true },
  { id: "lina", name: "Lina", role: "MEMBER", initials: "L", color: "#e17fa7", online: false },
  { id: "emma", name: "Emma", role: "MEMBER", initials: "E", color: "#b291ee", online: false },
];

export const messages: Message[] = [
  {
    id: "welcome",
    authorId: "abdoulaye",
    body: "Welcome to Noctra Core! This is the official home of the Noctra project. Pull up a chair, introduce yourself, and make yourself at home.",
    time: "9:41 AM",
  },
  {
    id: "readme",
    authorId: "sarah",
    body: "If you are new here, check the #announcements channel and the README on GitHub. We keep the setup guide pretty fresh.",
    time: "9:46 AM",
  },
  {
    id: "self-hosted",
    authorId: "malik",
    body: "Just self-hosted an instance on my home server over the weekend. The setup was surprisingly smooth. Happy to share my notes!",
    time: "10:02 AM",
  },
  {
    id: "contribution",
    authorId: "lina",
    body: "I would love to help with the onboarding docs. Is there a contribution guide or an issue label for first-timers?",
    time: "10:18 AM",
  },
  {
    id: "css",
    authorId: "abdoulaye",
    body: "Great question! We're standardizing on CSS variables mapped through Tailwind, so themes stay easy to audit and customize.",
    time: "10:26 AM",
  },
  {
    id: "ci",
    authorId: "emma",
    body: "+1 to CSS variables. I can draft the CI check for the theme tokens if that's useful.",
    time: "10:31 AM",
  },
];

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Noctra — Where communities communicate openly",
    template: "%s | Noctra",
  },
  description:
    "An open-source platform for building thriving communities. Create spaces, organize channels, and chat in realtime on infrastructure you can audit and self-host.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body>{children}</body>
    </html>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { VoltRobotLogin } from "@/components/VoltRobotLogin";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Meet Volt · Animated Robot Login" },
      {
        name: "description",
        content:
          "An animated robot guards this login form: Volt follows your cursor, turns around for passwords, and rates their strength on the back of its head.",
      },
      { property: "og:title", content: "Meet Volt · Animated Robot Login" },
      {
        property: "og:description",
        content:
          "A playful animated character login: eye tracking, head tilt, password meter, and confetti on access granted.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  component: VoltRobotLogin,
});

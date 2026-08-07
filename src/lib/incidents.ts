export type IncidentCategory = "distraction" | "blocker" | "failure";

export interface Incident {
  id: number;
  title: string;
  category: IncidentCategory;
  categoryLabel: string;
  duration: string;
  severity: string;
  summary: string;
  issue: string;
  action: string;
  system: string;
  icon: string;
  color: string;
}

export const incidents: Incident[] = [
  {
    id: 1,
    title: "The Lotus-Eaters",
    category: "distraction",
    categoryLabel: "Distraction",
    duration: "Several avoidable days",
    severity: "High severity",
    summary: "The team forgot the primary objective after encountering lotus.",
    issue:
      "The crew entered an environment designed to eliminate urgency and temporarily abandoned the journey home.",
    action:
      "Establish milestones, maintain crew accountability, and enforce a strict departure deadline before exploring.",
    system: "Automated deadline alerts",
    icon: "⏱",
    color: "var(--brut-yellow)",
  },
  {
    id: 2,
    title: "The Cyclops",
    category: "blocker",
    categoryLabel: "Risk-management failure",
    duration: "One cave incident",
    severity: "Critical severity",
    summary: "An unvetted cave became a hostage situation.",
    issue:
      "Odysseus entered an unknown location without conducting reconnaissance, preparing an exit strategy, or respecting obvious risk signals.",
    action:
      "Send a scouting team first, document the entrance, retain an escape route, and avoid announcing your legal name to the threat.",
    system: "Pre-entry risk checklist",
    icon: "⚠",
    color: "var(--brut-orange)",
  },
  {
    id: 3,
    title: "The Bag of Winds",
    category: "failure",
    categoryLabel: "Communication failure",
    duration: "Destination nearly reached",
    severity: "Critical severity",
    summary: "The crew opened a critical asset because nobody explained it.",
    issue:
      "A sealed navigational resource was left beside an uninformed and suspicious crew with no ownership protocol.",
    action:
      "Identify the asset, explain its purpose, assign a trusted owner, and implement access controls before going to sleep.",
    system: "Role-based access control",
    icon: "🔐",
    color: "var(--brut-blue)",
  },
  {
    id: 4,
    title: "Circe's Island",
    category: "distraction",
    categoryLabel: "Scope creep",
    duration: "Approximately one year",
    severity: "High severity",
    summary: "A rescue operation turned into a year-long residency.",
    issue:
      "After resolving the initial crisis, the project lead remained at a comfortable detour without a defined departure date.",
    action:
      "Close the incident, restore the team, record lessons learned, and immediately return to the original project roadmap.",
    system: "Calendar-based escalation",
    icon: "📆",
    color: "var(--brut-pink)",
  },
  {
    id: 5,
    title: "The Sirens",
    category: "distraction",
    categoryLabel: "Known distraction",
    duration: "Brief but dramatic",
    severity: "Medium severity",
    summary: "A predictable temptation required a mast-based workaround.",
    issue:
      "Odysseus knew the distraction was dangerous but still designed a process that required the entire crew to restrain him manually.",
    action:
      "Block exposure completely, document the procedure, and remove the project lead as a single point of failure.",
    system: "Automated content restriction",
    icon: "🔇",
    color: "var(--brut-purple)",
  },
  {
    id: 6,
    title: "Scylla and Charybdis",
    category: "blocker",
    categoryLabel: "Forced trade-off",
    duration: "One catastrophic passage",
    severity: "Unavoidable severity",
    summary: "The route offered two bad options and no perfect outcome.",
    issue:
      "This was a genuine strategic constraint rather than a simple distraction. Every route involved measurable loss.",
    action:
      "Evaluate both risks, choose the least destructive option, communicate the decision, and document why the loss was accepted.",
    system: "Decision-impact matrix",
    icon: "⚖",
    color: "var(--brut-green)",
  },
  {
    id: 7,
    title: "Calypso",
    category: "blocker",
    categoryLabel: "Executive-level blocker",
    duration: "Seven years",
    severity: "Maximum severity",
    summary: "The project remained blocked for seven years before escalation.",
    issue:
      "Odysseus was unable to leave, yet the issue remained unresolved until divine leadership finally intervened.",
    action:
      "Escalate captivity to Athena immediately, request executive sponsorship, and do not allow a blocker to age into an epic subplot.",
    system: "Automatic blocker escalation",
    icon: "📣",
    color: "var(--brut-pink)",
  },
];

export const filters: { key: "all" | IncidentCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "distraction", label: "Distractions" },
  { key: "blocker", label: "Blockers" },
  { key: "failure", label: "Team failures" },
];

export const stats = [
  { label: "Total absence", value: 20, caption: "years away from Ithaca", bg: "bg-brut-yellow" },
  {
    label: "Actual journey home",
    value: 10,
    caption: "years of preventable detours",
    bg: "bg-brut-blue",
  },
  { label: "Longest blocker", value: 7, caption: "years with Calypso", bg: "bg-brut-pink" },
  { label: "Automation deployed", value: 1, caption: "hero tied to a mast", bg: "bg-brut-green" },
];

export const remediations = [
  {
    number: "01",
    eyebrow: "Delegate",
    title: "Stop personally investigating every mysterious island.",
    body: "Assign scouting, navigation, provisions, and risk assessment to qualified crew members.",
    bg: "bg-brut-blue",
  },
  {
    number: "02",
    eyebrow: "Automate",
    title: "Replace mast-based workflows with repeatable systems.",
    body: "Use alerts, access restrictions, documented procedures, and automatic escalation rules.",
    bg: "bg-brut-yellow",
  },
  {
    number: "03",
    eyebrow: "Escalate",
    title: "Do not wait seven years before reporting a blocker.",
    body: "Contact Athena, Zeus, or another executive sponsor before the delay becomes an epic poem.",
    bg: "bg-brut-pink",
  },
];

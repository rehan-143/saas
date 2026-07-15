const FEATURES = [
  {
    icon: "📊",
    title: "Visual Pipelines",
    description: "Drag-and-drop deal stages so your team always knows what's next and what's stuck.",
  },
  {
    icon: "🤝",
    title: "Unified Contacts",
    description: "Every email, call, and note about a customer lives in a single timeline.",
  },
  {
    icon: "⚡",
    title: "Automations",
    description: "Trigger follow-ups, reminders, and notifications without writing a single line of code.",
  },
  {
    icon: "📈",
    title: "Real-time Analytics",
    description: "Forecast revenue and track team performance with live, shareable dashboards.",
  },
  {
    icon: "🔌",
    title: "50+ Integrations",
    description: "Connect email, calendar, Slack, and the tools your team already relies on.",
  },
  {
    icon: "🔒",
    title: "Enterprise-grade Security",
    description: "SOC 2 Type II compliant with granular role-based access controls.",
  },
];

export default function Features() {
  return (
    <section id="features" className="section container-px mx-auto max-w-7xl">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Everything your sales team needs</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Built to replace the spreadsheets, sticky notes, and disconnected tools slowing your team down.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-card hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/40 text-xl">
              {feature.icon}
            </div>
            <h3 className="mt-4 font-semibold text-lg">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

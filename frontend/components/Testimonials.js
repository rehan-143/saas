const TESTIMONIALS = [
  {
    quote:
      "PulseCRM cut our sales admin work in half. Our reps finally spend their time selling instead of updating spreadsheets.",
    name: "Ananya Kapoor",
    role: "VP of Sales, Nimbus Retail",
  },
  {
    quote:
      "The automations alone paid for the subscription within the first month. Follow-ups never slip through the cracks now.",
    name: "Ravi Menon",
    role: "Founder, Kestrel Logistics",
  },
  {
    quote:
      "Onboarding took less than a day. The dashboards give leadership exactly the visibility they were asking for.",
    name: "Sophia Turner",
    role: "Head of RevOps, Brightloop",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section container-px mx-auto max-w-7xl">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Loved by revenue teams everywhere</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Don't just take our word for it — here's what our customers say.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-card flex flex-col justify-between"
          >
            <blockquote className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center font-semibold text-brand-700 dark:text-brand-300">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

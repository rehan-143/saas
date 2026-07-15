const PLANS = [
  {
    name: "Starter",
    price: "$19",
    period: "/user/month",
    description: "For small teams getting organized.",
    features: ["Up to 5 users", "Basic pipelines", "Email support", "1,000 contacts"],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$49",
    period: "/user/month",
    description: "For growing teams that need automation.",
    features: [
      "Up to 50 users",
      "Advanced pipelines & automations",
      "Priority support",
      "50,000 contacts",
      "Custom dashboards",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with complex needs.",
    features: [
      "Unlimited users",
      "Dedicated success manager",
      "SSO & advanced permissions",
      "Unlimited contacts",
      "Custom SLAs",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section bg-slate-50 dark:bg-slate-900/40">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Simple, transparent pricing</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Choose a plan that scales with your team. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? "bg-brand-600 text-white shadow-2xl scale-[1.02] border border-brand-600"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {plan.highlighted && (
                <span className="mb-4 self-start rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className={`mt-1 text-sm ${plan.highlighted ? "text-brand-100" : "text-slate-500 dark:text-slate-400"}`}>
                {plan.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className={plan.highlighted ? "text-brand-100" : "text-slate-500 dark:text-slate-400"}>
                  {plan.period}
                </span>
              </div>
              <ul className="mt-6 space-y-3 text-sm flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#inquiry"
                className={`mt-8 text-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-white text-brand-700 hover:bg-brand-50"
                    : "bg-brand-600 text-white hover:bg-brand-700"
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

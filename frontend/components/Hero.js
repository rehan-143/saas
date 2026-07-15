export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950"
        aria-hidden="true"
      />
      <div className="container-px mx-auto max-w-7xl section grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center rounded-full bg-brand-100 dark:bg-brand-900/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300">
            New — AI-powered lead scoring
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
            The CRM your sales team will actually enjoy using.
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-xl">
            PulseCRM brings pipelines, contacts, and conversations into one clean workspace —
            so your team can spend less time updating spreadsheets and more time closing deals.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#inquiry" className="btn-primary">
              Talk to Sales
            </a>
            <a href="#features" className="btn-secondary">
              Explore Features
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">12,000+</p>
              <p>Teams onboarded</p>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">98%</p>
              <p>Customer satisfaction</p>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">4.8/5</p>
              <p>Average rating</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-slate-400">Pipeline — This Quarter</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
              {["New", "In Progress", "Won"].map((col, i) => (
                <div key={col} className="rounded-lg bg-slate-50 dark:bg-slate-800 p-3">
                  <p className="font-semibold text-slate-500 dark:text-slate-400 mb-2">{col}</p>
                  {Array.from({ length: 3 - i === 0 ? 1 : 3 - i }).map((_, idx) => (
                    <div
                      key={idx}
                      className="mb-2 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-2 shadow-sm"
                    >
                      <div className="h-2 w-3/4 rounded bg-slate-200 dark:bg-slate-700 mb-1" />
                      <div className="h-2 w-1/2 rounded bg-slate-100 dark:bg-slate-800" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-brand-200 dark:bg-brand-900/50 blur-2xl -z-10" />
          <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-brand-300 dark:bg-brand-800/50 blur-2xl -z-10" />
        </div>
      </div>
    </section>
  );
}

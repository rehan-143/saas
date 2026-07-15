"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Can I try PulseCRM before purchasing?",
    a: "Yes, every plan includes a 14-day free trial with full access to all features. No credit card required.",
  },
  {
    q: "Can I import data from my existing CRM?",
    a: "Absolutely. We support CSV imports and provide guided migration tools for Salesforce, HubSpot, and Zoho.",
  },
  {
    q: "Is my data secure?",
    a: "PulseCRM is SOC 2 Type II compliant, encrypts data in transit and at rest, and supports SSO for enterprise customers.",
  },
  {
    q: "Do you offer discounts for annual billing?",
    a: "Yes, annual billing saves you 20% compared to monthly billing across all plans.",
  },
  {
    q: "What kind of support is included?",
    a: "All plans include email support. Growth and Enterprise plans include priority support with faster response times.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section bg-slate-50 dark:bg-slate-900/40">
      <div className="container-px mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Frequently asked questions</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Everything you need to know about PulseCRM.</p>
        </div>

        <div className="mt-10 divide-y divide-slate-200 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.q}>
                <button
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-sm sm:text-base">{item.q}</span>
                  <span className={`ml-4 transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-300">{item.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { createInquiry } from "../lib/api";

const INDUSTRIES = [
  "Software / SaaS",
  "E-commerce & Retail",
  "Finance & Banking",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Real Estate",
  "Other",
];

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];

const INITIAL_STATE = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  industry: "",
  companySize: "",
  message: "",
};

function validate(values) {
  const errors = {};

  if (!values.fullName.trim()) errors.fullName = "Full name is required.";
  else if (values.fullName.trim().length < 2) errors.fullName = "Full name looks too short.";

  if (!values.companyName.trim()) errors.companyName = "Company name is required.";

  if (!values.email.trim()) errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";

  if (!values.phone.trim()) errors.phone = "Phone number is required.";
  else if (!/^[+]?[\d\s()-]{7,15}$/.test(values.phone)) errors.phone = "Enter a valid phone number.";

  if (!values.country.trim()) errors.country = "Country is required.";

  if (!values.industry) errors.industry = "Please select an industry.";

  if (!values.companySize) errors.companySize = "Please select a company size.";

  if (!values.message.trim()) errors.message = "Please tell us a bit about your needs.";
  else if (values.message.trim().length < 10) errors.message = "Message should be at least 10 characters.";

  return errors;
}

export default function InquiryForm() {
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...validate({ ...values, [name]: value }) }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched(
      Object.keys(INITIAL_STATE).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setServerError("");
    try {
      await createInquiry(values);
      setStatus("success");
      setValues(INITIAL_STATE);
      setTouched({});
      setErrors({});
    } catch (err) {
      setStatus("error");
      setServerError(err.message || "Something went wrong. Please try again.");
    }
  };

  const fieldClass = (name) => `input-field ${touched[name] && errors[name] ? "input-error" : ""}`;

  return (
    <section id="inquiry" className="section container-px mx-auto max-w-3xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Talk to our sales team</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Tell us a bit about your business and we'll get back to you within one business day.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-card space-y-5"
      >
        {status === "success" && (
          <div className="rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 px-4 py-3 text-sm text-green-700 dark:text-green-300">
            Thanks! Your inquiry has been submitted. Our team will reach out shortly.
          </div>
        )}
        {status === "error" && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
            {serverError}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Full Name"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.fullName && errors.fullName}
            className={fieldClass("fullName")}
            placeholder="Jane Doe"
          />
          <Field
            label="Company Name"
            name="companyName"
            value={values.companyName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.companyName && errors.companyName}
            className={fieldClass("companyName")}
            placeholder="Acme Inc."
          />
          <Field
            label="Email Address"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            className={fieldClass("email")}
            placeholder="jane@acme.com"
          />
          <Field
            label="Phone Number"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone && errors.phone}
            className={fieldClass("phone")}
            placeholder="+91 98765 43210"
          />
          <Field
            label="Country"
            name="country"
            value={values.country}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.country && errors.country}
            className={fieldClass("country")}
            placeholder="India"
          />

          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="industry">
              Industry
            </label>
            <select
              id="industry"
              name="industry"
              value={values.industry}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass("industry")}
            >
              <option value="">Select industry</option>
              {INDUSTRIES.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            {touched.industry && errors.industry && <p className="mt-1 text-xs text-red-500">{errors.industry}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="companySize">
              Company Size
            </label>
            <select
              id="companySize"
              name="companySize"
              value={values.companySize}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass("companySize")}
            >
              <option value="">Select company size</option>
              {COMPANY_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s} employees
                </option>
              ))}
            </select>
            {touched.companySize && errors.companySize && (
              <p className="mt-1 text-xs text-red-500">{errors.companySize}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClass("message")}
            placeholder="Tell us about your team size and what you're looking to solve..."
          />
          {touched.message && errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
        </div>

        <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto disabled:opacity-60">
          {status === "submitting" ? "Submitting..." : "Submit Inquiry"}
        </button>
      </form>
    </section>
  );
}

function Field({ label, name, error, className, ...rest }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" htmlFor={name}>
        {label}
      </label>
      <input id={name} name={name} className={className} {...rest} />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

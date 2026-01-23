"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContactForm, ContactFormState } from "@/app/contact/actions";
import { Button } from "./Button";

const initialState: ContactFormState = { success: false, error: undefined };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);

  if (state.success) {
    return (
      <div className="p-6 bg-t2 rounded-lg">
        <p className="text-t11 font-medium">Message sent!</p>
        <p className="text-t8 mt-2">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state.error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{state.error}</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-t8">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="px-4 py-3 bg-t2 border border-t3 rounded-lg text-t11 placeholder:text-t6 focus:outline-none focus:border-t6 transition-colors"
          placeholder="Your name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-t8">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="px-4 py-3 bg-t2 border border-t3 rounded-lg text-t11 placeholder:text-t6 focus:outline-none focus:border-t6 transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-t8">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="px-4 py-3 bg-t2 border border-t3 rounded-lg text-t11 placeholder:text-t6 focus:outline-none focus:border-t6 transition-colors resize-none"
          placeholder="What's on your mind?"
        />
      </div>

      <SubmitButton />
    </form>
  );
}

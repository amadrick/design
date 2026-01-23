import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Andy Madrick",
  description: "Get in touch with Andy Madrick.",
};

export default function ContactPage() {
  return (
    <main className="px-6 pb-16 pt-12 max-w-lg">
      <h1 className="text-4xl font-medium text-t11 leading-[1.2] tracking-[0.2px] mb-4">
        Contact
      </h1>

      <p className="text-t8 text-lg leading-[1.5] mb-12">
        Have a question or want to work together? Send me a message.
      </p>

      <ContactForm />
    </main>
  );
}

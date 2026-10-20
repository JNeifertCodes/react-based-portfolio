import contactList from "@/app/contact-list.json";

import { ContactCard, type ContactAction } from "./contact-card";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto flex max-w-5xl flex-col gap-4 px-6 pt-10 pb-16 text-foreground md:px-11"
    >
      <h2 id="contact-title" className="text-heading-md">
        Contact
      </h2>

      <p className="max-w-3xl text-lg leading-relaxed">
        I’m looking for front-end or full-stack roles where I can keep building
        accessible interfaces and grow my back-end skills. If you’re working on
        something in education, finance, or anywhere trust and usability matter,
        I’d love to hear about it.
      </p>

      <ul className="flex flex-col gap-6">
        {contactList.map((item) => (
          <li key={item.id}>
            <ContactCard
              label={item.label}
              value={item.value}
              href={item.href ?? undefined}
              actions={item.actions as ContactAction[]}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

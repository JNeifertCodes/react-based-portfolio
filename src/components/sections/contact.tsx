import contactList from "@/app/contact-list.json";

import { ContactCard, type ContactAction } from "./contact-card";
import { Section } from "./section";
import { SectionText } from "./section-text";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <SectionText>
        I’m looking for front-end or full-stack roles where I can keep building
        accessible interfaces and grow my back-end skills. If you’re working on
        something in education, finance, or anywhere trust and usability matter,
        I’d love to hear about it.
      </SectionText>

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
    </Section>
  );
}

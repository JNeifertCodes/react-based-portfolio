import { Section } from "@/components/home-page/section";

export function About() {
  return (
    <Section id="about" title="About">
      <p className="max-w-3xl text-lg leading-relaxed">
        I’m a front-end developer with six years of experience building web
        applications that help people feel confident and in control, whether
        they’re managing their finances or learning on the go.
      </p>
      <p className="max-w-3xl text-lg leading-relaxed">
        Accessibility isn’t an add-on for me: I build for it from the start,
        applying web accessibility best practices and auditing with tools like
        axe, so people who rely on screen readers, keyboards, or strong color
        contrast can use my work as easily as anyone else.
      </p>
      <p className="max-w-3xl text-lg leading-relaxed">
        My background is in Vue 3, TypeScript, and Vuetify, and I’m adding
        React, building this site with Shadcn UI and Storybook to put it into
        practice. I’m looking for a front-end role close to UI/UX design, where
        I can strengthen my back-end skills, grow on a collaborative team, and
        work toward senior and team lead responsibilities.
      </p>
      <p className="max-w-3xl text-lg leading-relaxed">
        <b>Availability:</b> Open to roles: remote anywhere USA / hybrid /
        on-site in Mechanicsburg/Harrisburg PA area. Work in ET time zone.
      </p>
    </Section>
  );
}

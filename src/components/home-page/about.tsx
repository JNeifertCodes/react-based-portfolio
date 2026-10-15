export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto flex max-w-5xl flex-col gap-4 px-6 pt-10 pb-16 text-foreground md:px-11"
    >
      <h2 id="about-title" className="text-heading-md leading-tight">
        About
      </h2>

      <p className="max-w-3xl text-body-lg leading-relaxed">
        I’m a front-end developer with six years of experience building web
        applications that help people feel confident and in control, whether
        they’re managing their finances or learning on the go.
      </p>
      <p className="max-w-3xl text-body-lg leading-relaxed">
        Accessibility isn’t an add-on for me: I build for it from the start,
        applying web accessibility best practices and auditing with tools like
        axe, so people who rely on screen readers, keyboards, or strong color
        contrast can use my work as easily as anyone else.
      </p>
      <p className="max-w-3xl text-body-lg leading-relaxed">
        My background is in Vue 3, TypeScript, and Vuetify, and I’m adding
        React, building this site with Shadcn UI and Storybook to put it into
        practice. I’m looking for a front-end role close to UI/UX design, where
        I can strengthen my back-end skills, grow on a collaborative team, and
        work toward senior and team lead responsibilities.
      </p>
      <p className="max-w-3xl text-body-lg leading-relaxed">
        <b>Availability:</b> Open to roles: remote anywhere USA / hybrid /
        on-site in Mechanicsburg/Harrisburg PA area. Work in EST time zone.
      </p>
    </section>
  );
}

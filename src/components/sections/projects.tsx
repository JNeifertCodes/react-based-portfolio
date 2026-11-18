import { ProjectCard } from "./project-card";
import { Section } from "./section";

export function Projects() {
  return (
    <Section id="projects" title="Projects" className="gap-6 pt-0">
      <ul className="flex flex-row flex-wrap gap-6">
        <li className="flex basis-full md:basis-[calc((100%-3rem)/3)]">
          <ProjectCard
            title="Coming soon"
            description="Projects are on the way."
          />
        </li>
      </ul>
    </Section>
  );
}

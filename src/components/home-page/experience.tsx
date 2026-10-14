import workExperience from "@/app/work-experience.json";

import { ExperienceCard } from "./experience-card";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-16 md:px-11"
    >
      <h2
        id="experience-title"
        className="text-heading-md leading-tight text-primary-foreground"
      >
        Experience
      </h2>

      <ul className="flex flex-col gap-6">
        {workExperience.map((job) => {
          const [startLabel, endLabel] = job.dateLabel.split(" – ");

          return (
            <li key={job.id}>
              <ExperienceCard
                role={job.title}
                company={job.company}
                companyHref={job.companyUrl ?? undefined}
                location={`${job.location} (${job.workArrangement.toLowerCase()})`}
                startDate={{ label: startLabel, dateTime: job.startDate }}
                endDate={
                  job.endDate
                    ? { label: endLabel, dateTime: job.endDate }
                    : undefined
                }
                description={job.context}
                technologies={job.tags}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

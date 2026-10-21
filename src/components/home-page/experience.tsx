import workExperience from "@/app/work-experience.json";

import { ExperienceCard } from "./experience-card";

const formatMonth = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(`${dateString}-02`);
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
};

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-16 text-foreground md:px-11"
    >
      <h2 id="experience-title" className="text-heading-md">
        Experience
      </h2>

      <ul className="flex flex-col gap-6">
        {workExperience.map((job) => {
          const startLabel = formatMonth(job.startDate);
          // "Present" is not a date; ExperienceCard renders it as plain text.
          const isCurrent =
            !job.endDate || job.endDate.toLowerCase() === "present";

          return (
            <li key={job.id}>
              <ExperienceCard
                role={job.title}
                company={job.company}
                companyHref={job.companyUrl ?? undefined}
                location={`${job.location} (${job.workArrangement.toLowerCase()})`}
                startDate={{ label: startLabel, dateTime: job.startDate }}
                endDate={
                  isCurrent
                    ? undefined
                    : { label: formatMonth(job.endDate), dateTime: job.endDate }
                }
                description={job.context}
                highlights={job.highlights}
                technologies={job.tags}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

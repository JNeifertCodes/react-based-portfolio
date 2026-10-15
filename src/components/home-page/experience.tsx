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
      <h2 id="experience-title" className="text-heading-md leading-tight">
        Experience
      </h2>

      <ul className="flex flex-col gap-6">
        {workExperience.map((job) => {
          const startLabel = formatMonth(job.startDate);
          const endLabel = formatMonth(job.endDate);

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

import { workExperience } from "@/content/work-experience";

import { ExperienceCard } from "./experience-card";
import { Section } from "./section";

const formatMonth = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(`${dateString}-02`);
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
};

export function Experience() {
  return (
    <Section id="experience" title="Experience" className="gap-6 pt-0">
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
                companyHref={job.companyUrl}
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
    </Section>
  );
}

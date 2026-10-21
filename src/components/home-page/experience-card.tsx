import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { useId } from "react";

type DateValue = {
  label: string;
  dateTime: string;
};

type ExperienceCardProps = {
  role: string;
  company: string;
  companyHref?: string;
  location?: string;
  startDate: DateValue;
  endDate?: DateValue;
  description: string;
  highlights?: string[];
  technologies: string[];
  headingLevel?: "h2" | "h3" | "h4";
  className?: string;
};

function ExperienceCard({
  role,
  company,
  companyHref,
  location,
  startDate,
  endDate,
  description,
  highlights = [],
  technologies,
  headingLevel: Heading = "h3",
  className,
}: ExperienceCardProps) {
  const headingId = useId();
  const title = `${role} · ${company}`;

  return (
    <article aria-labelledby={headingId}>
      <Card size="lg" className={className}>
        <CardContent className="grid gap-4 sm:grid-cols-[12rem_1fr] sm:gap-8">
          <p className="text-sm sm:pt-1.5">
            <time dateTime={startDate.dateTime}>{startDate.label}</time>
            <span aria-hidden="true"> – </span>
            <span className="sr-only"> to </span>
            {endDate ? (
              <time dateTime={endDate.dateTime}>{endDate.label}</time>
            ) : (
              "Present"
            )}
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Heading id={headingId} className="text-heading-sm">
                {companyHref ? (
                  <a
                    href={companyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm group/underline focus-ring"
                  >
                    <span>
                      <span className="link-underline">{title}</span>
                    </span>
                    <ExternalLink
                      aria-hidden="true"
                      className="size-5 shrink-0"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : (
                  title
                )}
              </Heading>

              {location && <CardDescription>{location}</CardDescription>}
            </div>

            <p className="text-lg">{description}</p>

            {highlights.length > 0 && (
              <ul
                aria-label="Highlights"
                className="flex list-disc flex-col gap-2 pl-5 text-base"
              >
                {highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}

            {technologies.length > 0 && (
              <ul
                aria-label="Technologies used"
                className="flex flex-wrap gap-2"
              >
                {technologies.map((tech) => (
                  <Badge key={tech} variant="tag" render={<li />}>
                    {tech}
                  </Badge>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </article>
  );
}

export { ExperienceCard };
export type { ExperienceCardProps };

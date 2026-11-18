import { ExternalLink } from "lucide-react";
import { useId } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  title: string;
  href?: string;
  subtitle?: string;
  description: string;
  technologies?: string[];
  headingLevel?: "h2" | "h3" | "h4";
  className?: string;
};

function ProjectCard({
  title,
  href,
  subtitle,
  description,
  technologies = [],
  headingLevel: Heading = "h3",
  className,
}: ProjectCardProps) {
  const headingId = useId();

  return (
    <article aria-labelledby={headingId} className="flex flex-1">
      <Card size="lg" className={cn("flex-1", className)}>
        <CardContent className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Heading id={headingId} className="text-heading-sm">
              {href ? (
                <a
                  href={href}
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

            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </div>

          <p className="text-base">{description}</p>

          {technologies.length > 0 && (
            <ul
              aria-label="Technologies used"
              className="mt-auto flex flex-wrap gap-2"
            >
              {technologies.map((tech) => (
                <Badge key={tech} variant="tag" render={<li />}>
                  {tech}
                </Badge>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </article>
  );
}

export { ProjectCard };
export type { ProjectCardProps };

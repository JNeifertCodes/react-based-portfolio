type ExperienceItem = {
  id: string;
  company: string;
  companyUrl?: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  workArrangement: string;
  context: string;
  highlights: string[];
  tags: string[];
};

export const workExperience = [
  {
    id: "fleetfeet",
    company: "Fleet Feet",
    companyUrl: "https://www.fleetfeet.com/",
    title: "Part-time Outfitter",
    startDate: "2026-05",
    endDate: "Present",
    location: "Mechanicsburg, PA",
    workArrangement: "In-office",
    context: "Specialty running retailer where outfitters work one-on-one with customers to find footwear that fits their feet and goals.",
    highlights: [
      "Greet customers and guide them through fittings, listening to how they run and what they need before recommending footwear.",
      "Handle register and guest transactions accurately.",
      "Organize, review, and add incoming merchandise to inventory so the floor stays stocked and easy to shop.",
      "Help fulfill online orders so in-store and online customers get the same level of care.",
    ],
    tags: [],
  },
  {
    id: "eduplanet21",
    company: "Eduplanet21",
    companyUrl: "https://eduplanet21.com/",
    title: "Frontend Engineer",
    startDate: "2024-10",
    endDate: "2025-07",
    location: "Mechanicsburg, PA",
    workArrangement: "Hybrid",
    context: "Ed-tech platform where educators build curriculum aligned to state and federal standards. Two-person engineering team.",
    highlights: [
      "Improved the collaborative experience in the WYSIWYG editor by rebuilding its front-end locking: clicking a text block checks availability, locked blocks show the editor's name and keep other users out, and status updates on release, reducing support tickets about missing or unsaved content.",
      "Added AI-assisted content generation to the editor, with configurable access levels so it's available only to schools that pay for it.",
      "Contributed to the piece-by-piece Vue 2 to Vue 3 migration of a large application, and started an internal library of reusable components and composables that gave the product a consistent look instead of feeling like four different sites.",
      "Built a course-content print sidebar end to end, including a syllabus breakdown, so users can print selected sections instead of everything.",
    ],
    tags: ["Vue 3", "TypeScript", "Vuetify", "Vitest", "i18n", "PostgreSQL"],
  },
  {
    id: "lumen-learning",
    company: "Lumen Learning",
    companyUrl: "https://lumenlearning.com/",
    title: "Software Engineer",
    startDate: "2022-01",
    endDate: "2024-07",
    location: "Mechanicsburg, PA",
    workArrangement: "Remote",
    context: "Online learning platform for colleges and universities, where students and faculty complete homework, quizzes, tests, and assessments and study. 6-person front-end engineering team.",
    highlights: [
      "Helped build the student assessment and learning platforms (Vue 3, TypeScript), used by about 40,000 students, including an outreach page that lets faculty email lower-scoring students resources and office-hours invitations.",
      "Implemented the UI team's designs for immediate answer feedback: students instantly see what's correct or incorrect, plus links to review sources and alternative explanations.",
      "Advocated for and started Storybook, which became the team's shared component library, with tests that guard how components look.",
      "Ensured color contrast and keyboard navigation across the site, and made the learning pages screen reader friendly.",
      "Led a four-day hackathon team of five that built an internal web tool letting QA reproduce any question by ID and seed, cutting question testing time from 10 to 15 minutes to under 2 minutes.",
    ],
    tags: [
      "Vue 3",
      "TypeScript",
      "JavaScript",
      "Storybook",
      "Swagger",
      "Postman",
      "REST APIs",
    ],
  },
  {
    id: "vanguard",
    company: "Vanguard",
    companyUrl: "https://investor.vanguard.com/",
    title: "Software Engineer",
    startDate: "2019-07",
    endDate: "2022-01",
    location: "Malvern, PA",
    workArrangement: "Hybrid/Remote",
    context: "Investment management company specializing in retirement and wealth planning. Part of an 8-person agile team building portfolio summary and allocation tools used by financial advisors and visible in investor account pages.",
    highlights: [
      "Maintained a legacy Angular application: version updates, a few new features released behind feature flags, and added and updated tests at the component, page, and end-to-end levels.",
      "Championed test-driven development on newer features.",
      "Led presentations on the importance of web accessibility.",
      "Participated in Vanguard's Technology Leadership Program and mentored two interns.",
    ],
    tags: [
      "Angular",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Unit & E2E Testing",
      "Feature flags",
    ],
  },
] satisfies ExperienceItem[];

export type { ExperienceItem };

import type { Preview } from "@storybook/nextjs-vite";
import { ThemeProvider } from "@wrksz/themes/next";
import { MotionProvider } from "../src/components/providers/motion-provider";
import "../src/app/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
      >
        <MotionProvider>
          <div className="bg-background text-foreground">
            <Story />
          </div>
        </MotionProvider>
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "error",
    },
  },
  tags: ["autodocs"],
};

export default preview;

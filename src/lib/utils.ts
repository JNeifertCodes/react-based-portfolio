import { createCn } from "cn/config";

// Registers the custom type scale from globals.css as font sizes, so merging
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: ["heading-lg", "heading-md"] }],
    },
  },
});

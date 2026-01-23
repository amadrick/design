import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        hero: "var(--font-hero)",
      },
      colors: {
        // Z scale (solid colors)
        z0: "var(--z0)",
        z1: "var(--z1)",
        z2: "var(--z2)",
        z3: "var(--z3)",
        z4: "var(--z4)",
        z5: "var(--z5)",
        z6: "var(--z6)",
        z7: "var(--z7)",
        // T scale (alpha colors)
        t1: "var(--t1)",
        t2: "var(--t2)",
        t3: "var(--t3)",
        t4: "var(--t4)",
        t5: "var(--t5)",
        t6: "var(--t6)",
        t7: "var(--t7)",
        t8: "var(--t8)",
        t9: "var(--t9)",
        t10: "var(--t10)",
        t11: "var(--t11)",
        t12: "var(--t12)",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'parrot-color': '#56F884',
        'parrot-color-dark': '#48d56f',
        'parrot-color-saturated': '#3cc562',
        'light-blue': '#F3F9FC',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        cardForeground: 'var(--card-foreground)',
        popover: 'var(--popover)',
        popoverForeground: 'var(--popover-foreground)',
        primary: 'var(--primary)',
        primaryForeground: 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        secondaryForeground: 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        mutedForeground: 'var(--muted-foreground)',
        accent: 'var(--accent)',
        accentForeground: 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        destructiveForeground: 'var(--destructive-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        radius: 'var(--radius)',
      },
    },
  },
  fontSize: {
    // [fontSize, lineHeight]
    sm: ['14px', '20px'],
    base: ['16px', '24px'],
    lg: ['20px', '28px'],
    xl: ['24px', '32px'],
  },
  plugins: [],
};
export default config;


// --background	0 0% 100%	#FFFFFF
// --foreground	240 10% 3.9%	#2E2E2E
// --card	0 0% 100%	#FFFFFF
// --card-foreground	240 10% 3.9%	#2E2E2E
// --popover	0 0% 100%	#FFFFFF
// --popover-foreground	240 10% 3.9%	#2E2E2E
// --primary	142 86% 28%	#8BCA47
// --primary-foreground	356 29% 98%	#F8F8F8
// --secondary	240 4.8% 95.9%	#E5E5E5
// --secondary-foreground	240 5.9% 10%	#1E1E1E
// --muted	240 4.8% 95.9%	#E5E5E5
// --muted-foreground	240 3.8% 45%	#737373
// --accent	240 4.8% 95.9%	#E5E5E5
// --accent-foreground	240 5.9% 10%	#1E1E1E
// --destructive	0 72% 51%	#FF3D00
// --destructive-foreground	0 0% 98%	#F2F2F2
// --border	240 5.9% 90%	#D9D9D9
// --input	240 5.9% 90%	#D9D9D9
// --ring	142 86% 28%	#8BCA47

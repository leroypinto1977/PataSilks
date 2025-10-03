import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-inter)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        body: [
          "var(--font-inter)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        // Customer Website - Premium Beige Theme
        "primary-pink": {
          50: "#FDFCFA", // Ultra light beige
          100: "#F9F7F4", // Very light beige background
          200: "#F2EDE6", // Medium beige for accents
          300: "#E8DCCF", // Darker beige for hover states
          400: "#D4C4B0", // Deep beige for emphasis
          500: "#C4B299", // Main brand beige
          600: "#B8A085", // Darker brand beige
          700: "#A68F73", // Deep brand beige
          800: "#8B7A61", // Very deep beige
          900: "#6B5D4A", // Darkest beige
        },
        "premium-beige": "#EDE6D9", // Main premium color
        "warm-beige": "#F5F0E8", // Light warm beige
        "rich-beige": "#D4C4B0", // Rich beige accent

        // Admin Panel - Dark Monochromatic Theme
        admin: {
          black: "#000000",
          dark: "#1A1A1A",
          medium: "#2D2D2D",
          light: "#404040",
          lighter: "#595959",
          white: "#FFFFFF",
          "off-white": "#F5F5F5",
          accent: "#E8B4B8",
          success: "#28A745",
          warning: "#FFC107",
          danger: "#DC3545",
          info: "#17A2B8",
        },

        // Legacy colors (deprecated - keeping for compatibility)
        cream: {
          50: "#FAF7F0",
          100: "#F5F3EE",
          200: "#F0EDE6",
        },
        brown: {
          700: "#5C4033",
          900: "#2D1B15",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

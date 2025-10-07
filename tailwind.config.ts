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
        // Customer Website - Premium Brown Theme
        "primary-brown": {
          50: "#FAF8F5", // Ultra light cream
          100: "#F5F1EA", // Very light cream background
          200: "#E8DED0", // Light warm cream
          300: "#D4C4B0", // Warm tan for accents
          400: "#A68B6E", // Medium brown
          500: "#4B381E", // Main brand brown
          600: "#3D2F19", // Darker brown
          700: "#2F2514", // Deep brown
          800: "#211B0F", // Very deep brown
          900: "#13110A", // Darkest brown
        },
        "premium-brown": "#4B381E", // Main premium color
        "warm-cream": "#F5F1EA", // Light warm cream
        "rich-brown": "#4B381E", // Rich brown accent
        "golden-tan": "#C9A870", // Golden tan complement
        terracotta: "#B85C38", // Terracotta accent

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

        // Legacy colors (updated for brown theme)
        cream: {
          50: "#FAF8F5",
          100: "#F5F1EA",
          200: "#E8DED0",
        },
        brown: {
          500: "#4B381E",
          600: "#3D2F19",
          700: "#2F2514",
          800: "#211B0F",
          900: "#13110A",
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

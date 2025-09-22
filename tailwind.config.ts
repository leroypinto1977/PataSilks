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
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: [
          "var(--font-inter)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        accent: ["var(--font-crimson)", "Crimson Text", "Georgia", "serif"],
      },
      colors: {
        // Customer Website - Light Pink & White Theme
        "primary-pink": {
          50: "#FDF5F6", // Ultra light pink
          100: "#F8E8E9", // Very light pink background
          200: "#F5D0D3", // Medium pink for accents
          300: "#E8B4B8", // Darker pink for hover states
          400: "#D4949A", // Deep pink for emphasis
          500: "#C07982", // Main brand pink
          600: "#A85D68", // Darker brand pink
          700: "#8B4A54", // Deep brand pink
          800: "#6E3A42", // Very deep pink
          900: "#4A252A", // Darkest pink
        },
        "rose-gold": "#E8B4B8",
        blush: "#F5C2C7",
        champagne: "#F7E7CE",

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

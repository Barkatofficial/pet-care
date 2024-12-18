/** @type {import('tailwindcss').Config} */
module.exports = {
	// Enable dark mode with class-based toggling
	darkMode: ["class"],
  
	// Specify the paths to all files where Tailwind classes are used
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
  
	theme: {
	  extend: {
		// Custom Colors
		colors: {
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
			DEFAULT: "#0D7DFF",
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
  
		// Custom Border Radius
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
  
		// Custom Typography Styles
		typography: {
		  DEFAULT: {
			css: {
			  color: "theme('colors.foreground')",
			  a: {
				color: "theme('colors.primary.DEFAULT')",
				"&:hover": {
				  color: "theme('colors.primary.foreground')",
				},
			  },
			  h1: { color: "theme('colors.foreground')" },
			  h2: { color: "theme('colors.foreground')" },
			  h3: { color: "theme('colors.foreground')" },
			},
		  },
		  dark: {
			css: {
			  color: "theme('colors.muted.foreground')",
			  a: {
				color: "theme('colors.primary.DEFAULT')",
				"&:hover": {
				  color: "theme('colors.primary.foreground')",
				},
			  },
			},
		  },
		},
  
		// Custom Keyframes for Animations
		keyframes: {
		  marquee: {
			from: { transform: "translateX(0)" },
			to: { transform: "translateX(calc(-100% - var(--gap)))" },
		  },
		  "marquee-vertical": {
			from: { transform: "translateY(0)" },
			to: { transform: "translateY(calc(-100% - var(--gap)))" },
		  },
		  gradientHover: {
			"0%, 100%": { backgroundPosition: "0% 50%" },
			"50%": { backgroundPosition: "100% 50%" },
		  },
		},
  
		// Custom Animations
		animation: {
		  marquee: "marquee var(--duration) infinite linear",
		  "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
		  gradientHover: "gradientHover 3s ease infinite",
		},
  
		// Custom Spacing
		spacing: {
		  18: "4.5rem",
		  22: "5.5rem",
		},
  
		// Custom Screens for Responsiveness
		screens: {
		  xs: "480px",
		  sm: "640px",
		  md: "768px",
		  lg: "1024px",
		  xl: "1280px",
		},
	  },
	},
  
	// Include Necessary Tailwind Plugins
	plugins: [
	  require("tailwindcss-animate"),
	  require("@tailwindcss/typography"),
	  require("@tailwindcss/forms"),
	],
  };
  
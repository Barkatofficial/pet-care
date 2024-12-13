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
		// Define custom color palette with CSS variables
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
			DEFAULT: "#0D7DFF", // Main primary color
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
  
		// Define custom border radius values
		borderRadius: {
		  lg: "var(--radius)", // Large radius based on custom variable
		  md: "calc(var(--radius) - 2px)", // Medium radius
		  sm: "calc(var(--radius) - 4px)", // Small radius
		},
  
		// Add custom typography styles for better text appearance
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
  
		// Define keyframes for animations
		keyframes: {
		  marquee: {
			from: { transform: "translateX(0)" },
			to: { transform: "translateX(calc(-100% - var(--gap)))" },
		  },
		  "marquee-vertical": {
			from: { transform: "translateY(0)" },
			to: { transform: "translateY(calc(-100% - var(--gap)))" },
		  },
		  // Custom gradient animations for the testimonials section
		  gradientHover: {
			"0%, 100%": { backgroundPosition: "0% 50%" },
			"50%": { backgroundPosition: "100% 50%" },
		  },
		},
  
		// Add custom animation utilities
		animation: {
		  marquee: "marquee var(--duration) infinite linear",
		  "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
		  gradientHover: "gradientHover 3s ease infinite",
		},
  
		// Adding more spacing and padding options
		spacing: {
		  18: "4.5rem", // Adds custom spacing if needed (like for testimonial gaps)
		  22: "5.5rem",
		},
  
		// Increase responsiveness with custom breakpoints
		screens: {
		  xs: "480px", // Adding extra small breakpoint for better mobile responsiveness
		  sm: "640px", // Small breakpoint
		  md: "768px", // Medium breakpoint
		  lg: "1024px", // Large breakpoint
		  xl: "1280px", // Extra-large breakpoint
		},
  
	  },
	},
  
	// Include necessary Tailwind plugins
	plugins: [
	  require("tailwindcss-animate"), // For animation utilities
	  require("@tailwindcss/typography"), // For rich text styling
	  require("@tailwindcss/forms"), // For styling form elements
	],
  };
  
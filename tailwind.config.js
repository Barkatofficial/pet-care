/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"], // enables dark mode class-based toggling
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: '#0D7Dff', // hardcoded primary color (consider making it dynamic with CSS variables)
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)', // large border-radius
                md: 'calc(var(--radius) - 2px)', // medium border-radius
                sm: 'calc(var(--radius) - 4px)', // small border-radius
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.foreground'),
                        a: {
                            color: theme('colors.primary.DEFAULT'),
                            '&:hover': {
                                color: theme('colors.primary.foreground'),
                            },
                        },
                        h1: {
                            color: theme('colors.foreground'),
                        },
                        h2: {
                            color: theme('colors.foreground'),
                        },
                        h3: {
                            color: theme('colors.foreground'),
                        },
                    },
                },
                dark: {
                    css: {
                        color: theme('colors.muted.foreground'),
                        a: {
                            color: theme('colors.primary.DEFAULT'),
                            '&:hover': {
                                color: theme('colors.primary.foreground'),
                            },
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        require('@tailwindcss/typography'), // Added typography plugin for better text styling
    ],
};

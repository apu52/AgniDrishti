
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				fire: {
					DEFAULT: '#ff4d4d',
					dark: '#cc0000',
					light: '#ff8080',
					amber: '#ffaa00',
					glow: '#ff7b5c'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fire-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 10px #ff4d4d, 0 0 20px #ff7b5c',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 15px #ff4d4d, 0 0 30px #ff7b5c',
						transform: 'scale(1.05)'
					}
				},
				'fire-glow': {
					'0%, 100%': { 
						textShadow: '0 0 5px #ff4d4d, 0 0 10px #ff7b5c'
					},
					'50%': { 
						textShadow: '0 0 10px #ff4d4d, 0 0 20px #ff7b5c'
					}
				},
				'notification-pulse': {
					'0%': { transform: 'scale(0.95)', opacity: '0.8' },
					'50%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(0.95)', opacity: '0.8' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fire-pulse': 'fire-pulse 2s infinite',
				'fire-glow': 'fire-glow 2s infinite',
				'notification-pulse': 'notification-pulse 2s infinite'
			},
			backgroundImage: {
				'gradient-fire': 'linear-gradient(225deg, #1a1a1a 0%, #2d1a1a 50%, #331111 100%)',
				'gradient-fire-radial': 'radial-gradient(circle, #331111 0%, #1a1a1a 100%)',
				'gradient-fire-sidebar': 'linear-gradient(180deg, #1a1a1a 0%, #331111 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

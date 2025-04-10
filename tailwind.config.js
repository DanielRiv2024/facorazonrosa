// tailwind.config.js
module.exports = {
    darkMode: 'class', // Esto habilita el modo oscuro utilizando clases
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
        },
      },
    },
    plugins: [],
  }
  
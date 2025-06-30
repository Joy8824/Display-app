export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './**/*.{js,ts,jsx,tsx}', // <-- catches anything else
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

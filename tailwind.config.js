/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
import flowbite from "flowbite-react/tailwind";

module.exports = withMT({
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
        fontFamily:{
            "playwrite": ["Playwrite CU", "cursive"],
        }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
});

** Issues Faced & Fixes **
While building this React + Vite + Tailwind chat project, I ran into a few problems during setup:
-Tailwind classes like bg-red-500 were not showing any styling at all
-Got error: Failed to resolve import "./index.css" inside ChatWidget.jsx
-npx tailwindcss init -p was failing with “could not determine executable to run”
-Tailwind config files (tailwind.config.js, postcss.config.js) were missing
-Initially used the wrong Tailwind Vite plugin which broke the setup


** Fixes I made **


-Removed the wrong Vite Tailwind plugin and switched to stable Tailwind CSS v3
-Reinstalled dependencies (tailwindcss, postcss, autoprefixer)
-Generated config files using npx tailwindcss init -p
-Fixed CSS setup by adding Tailwind directives in index.css
-Moved index.css import to main.jsx (removed it from components)


** Restarted the dev server **


** Result **
Everything started working properly after the fixes — Tailwind styles are now applying correctly and the chat UI is working as expected.
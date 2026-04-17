While building this React + Vite + Tailwind chat project, I ran into a few problems during setup:
** Issues Faced & Fixes **

**** Issues Faced- Tailwind classes like bg-red-500 were not showing any styling at all. **Fix -Removed the wrong Vite Tailwind plugin and switched to stable Tailwind CSS v3

**** Issues Faced- Got error: Failed to resolve import "./index.css" inside ChatWidget.jsx.**Fix -Reinstalled dependencies (tailwindcss, postcss, autoprefixer)

**** Issues Faced-  npx tailwindcss init -p was failing with “could not determine executable to run”. **Fix -Generated config files using npx tailwindcss init -p

**** Issues Faced- Tailwind config files (tailwind.config.js, postcss.config.js) were missing.**Fix -Fixed CSS setup by adding Tailwind directives in index.css

**** Issues Faced- Initially used the wrong Tailwind Vite plugin which broke the setup.**Fix -Moved index.css import to main.jsx (removed it from components)

** Issues Faced -Messages were disappearing whenever the chat window was closed. ** Fix
-State was moved up from ChatWindow to ChatWidget so it persists even when the chat UI is closed.
*****New Structure
ChatWidget (state holder / memory)
  ├── messages
  ├── input
  ├── isLoading
  └── isOpen
        ↓ props
ChatWindow (UI layer)
  ├── displays messages
  ├── handles sendMessage()
  └── renders input + loading UI

** Restarted the dev server **

** Result **
Everything started working properly after the fixes — Tailwind styles are now applying correctly and the chat UI is working as expected.













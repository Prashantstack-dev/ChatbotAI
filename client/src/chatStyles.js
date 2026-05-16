export const chatStyles = {
  // Chat Widget
  chatWidget: "fixed inset-0 pointer-events-none",

  // Floating Button (Glassmorphism)
  chatButton:
    "fixed bottom-4 sm:bottom-7 right-4 sm:right-6 w-14 h-14 rounded-full bg-white/30 backdrop-blur-xl border border-white/50 text-[#7F77DD] flex items-center justify-center shadow-[0_8px_32px_rgba(31,38,135,0.15)] hover:scale-110 hover:bg-white/40 transition-all cursor-pointer z-50",

  // Chat Panel (Premium Glassmorphism)
  // CSS COMPOSITING: This glass effect relies on `backdrop-blur-2xl` and a semi-transparent 
  // background (`bg-white/40`). For this to work, the parent iframe in `widget.js` MUST be 
  // set to `background: transparent`, otherwise the blur has nothing to filter!
  chatPanel:
    "fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[360px] h-[600px] max-h-[80vh] z-50 backdrop-blur-2xl bg-white/40 border border-white/60 rounded-[2rem] shadow-[0_8px_32px_rgba(31,38,135,0.1)] flex flex-col overflow-hidden p-5",

  // Header — justify-between so the language dropdown sits flush right
  header:
    "flex items-center justify-between pb-4 mb-2 border-b border-white/40",

  // Message area
  messages:
    "flex-1 overflow-y-auto space-y-4 py-2 pr-2",

  // User bubble 
  userBubble:
    "bg-gradient-to-br from-[#7F77DD] to-[#534AB7] text-white px-5 py-3 rounded-2xl rounded-br-sm text-sm leading-relaxed shadow-[0_4px_15px_rgba(127,119,221,0.3)]",

  // Assistant bubble (glass)
  assistantBubble:
    "bg-white/60 backdrop-blur-md text-[#1a1a1a] px-5 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed border border-white/50 shadow-sm",

  // Chips
  chip:
    "px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/60 text-[#534AB7] text-xs cursor-pointer hover:bg-white/70 transition-all shadow-sm",

  // Bot name
  bot:
    "text-[#2c2a4a] font-semibold text-lg tracking-tight",

  // Status indicators
  circleOn: "w-2.5 h-2.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]",
  circleOff: "w-2.5 h-2.5 bg-gray-400 rounded-full",

  // Input container (normal typing state)
  // [CHANGE] items-center → items-end so mic + send buttons stay pinned to the
  // bottom of the container as the textarea grows vertically.
  inputContainer:
    "flex items-end gap-2 w-full px-4 py-2 mt-2 bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl shadow-sm focus-within:shadow-md focus-within:bg-white/70 transition-all",

  // [CHANGE] Speaking/listening state container — replaces inputContainer while mic is active.
  // Red glow border + warm tinted background signals the "listening" theme clearly.
  speakingContainer:
    "flex items-end gap-2 w-full px-4 py-2 mt-2 bg-red-50/40 backdrop-blur-xl border border-red-400/50 rounded-2xl shadow-[0_0_18px_rgba(239,68,68,0.18)] transition-all",

  // Input field
  input:
    "flex-1 bg-transparent px-2 py-2 text-sm text-[#2c2a4a] placeholder:text-gray-500 focus:outline-none",

  // Send button 
  sendButton:
    "flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-[#7F77DD] to-[#534AB7] text-white hover:opacity-90 active:scale-95 transition-all shrink-0 shadow-md",

  // Language dropdown — compact glassmorphism style, sits in the header top-right.
  // Shows native script labels (English, 中文, 한국어, नेपाली) without needing external fonts.
  langDropdown:
    "text-xs px-2 py-1.5 rounded-lg bg-white/40 backdrop-blur-md border border-white/50 text-[#2c2a4a] focus:outline-none focus:ring-1 focus:ring-[#7F77DD]/40 cursor-pointer hover:bg-white/60 transition-all shadow-sm shrink-0",
};
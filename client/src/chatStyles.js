// export const chatStyles = {

//   //Chat Widget
//   chatWidget: "fixed inset-0 pointer-events-none",
//   // Chat button (floating)
//   chatButton:
//     "fixed bottom-7 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[#7F77DD] to-[#534AB7] flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer border-0",

//   // Chat panel
//   chatPanel:
//     "fixed bottom-24 right-6 w-[360px] h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden gap-3 p-4 ",

//     header:"flex-1 overflow-y-auto p-4 space-y-4",

//   // Message bubbles
//   userBubble:
//     "bg-gradient-to-br from-[#7F77DD] to-[#534AB7] text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm leading-relaxed gap-4  flex shadow-xl",
//   assistantBubble:
//     "bg-white border border-[#e8e6f8] text-[#2c2a4a] px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm leading-relaxed gap-4",

//   // Quick reply chips
//   chip: "px-3 py-1.5 rounded-full border border-[#AFA9EC] text-[#534AB7] bg-[#EEEDFE] text-xs cursor-pointer hover:bg-[#CECBF6] transition-colors",

//   //bot style 
//   bot: "text-[#7F77DD] shadow-[0_0_6px_rgba(127,119,221,0.6)]   rounded-full",

//   //circle on/off for bot
//   circleOn: " w-3 h-3 bg-green-500 rounded-full",
//   circleOff: " w-3 h-3 bg-gray-500 rounded-full",

//   //input wrapper
//    inputContainer:
//     "flex w-full gap-2 p-3 bg-white border border-[#ecebff] rounded-2xl shadow-sm focus-within:shadow-md transition outline-none",

//   // input field
//     input:
//     "flex bg-secondary px-4 py-2.5 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 transition-all",

//   // send button
//   sendButton:
//     "w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity",
// };

export const chatStyles = {

  // Chat Widget
  chatWidget: "fixed inset-0 pointer-events-none",

  // Floating Button (more aesthetic)
  chatButton:
    "fixed bottom-7 right-6 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-all cursor-pointer",

  // Chat Panel (glass effect)
  chatPanel:
    "fixed bottom-24 right-6 w-[360px] h-[520px] backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden p-4",

  // Header (MAKE THIS ACTUALLY A HEADER, not scroll area)
  header:
    "flex items-center justify-between pb-3 border-b border-black/10",

  // Message area
  messages:
    "flex-1 overflow-y-auto space-y-4 py-2 pr-1",

  // User bubble (clean + premium)
  userBubble:
    "bg-black text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed shadow-md",

  // Assistant bubble (soft luxury)
  assistantBubble:
    "bg-[#f7f6f3] text-[#1a1a1a] px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed border border-black/5",

  // Chips (more minimal)
  chip:
    "px-3 py-1.5 rounded-full bg-black/5 text-black text-xs cursor-pointer hover:bg-black/10 transition",

  // Bot name / badge
  bot:
    "text-black font-medium tracking-wide",

  // Status indicators (more subtle)
  circleOn: "w-2.5 h-2.5 bg-green-400 rounded-full shadow-[0_0_6px_rgba(74,222,128,0.8)]",
  circleOff: "w-2.5 h-2.5 bg-gray-400 rounded-full",

  // Input container (glass feel)
  inputContainer:
  "flex items-center gap-2 w-full px-3 py-2 bg-white/80 backdrop-blur-xl border border-black/10 rounded-2xl ",


  // Input field
  input:
  "flex-1 bg-transparent px-3 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none",


  // Send button (minimal luxury)
  sendButton:
  "flex items-center justify-center h-9 w-9 rounded-xl bg-black text-white hover:bg-black/80 active:scale-95 transition-all shrink-0 my-5 py-5 hover:scale-260",
};
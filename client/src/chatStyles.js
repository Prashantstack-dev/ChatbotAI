// export const chatStyles = {

//   //Chat Widget
//   chatWidget: "fixed inset-0 pointer-events-none",
//   // Chat button (floating)
//   chatButton:
//     "fixed bottom-7 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[#7F77DD] to-[]#534AB7 flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer border-0",

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

  // Floating Button (Glassmorphism)
  chatButton:
    "fixed bottom-4 sm:bottom-7 right-4 sm:right-6 w-14 h-14 rounded-full bg-white/30 backdrop-blur-xl border border-white/50 text-[#7F77DD] flex items-center justify-center shadow-[0_8px_32px_rgba(31,38,135,0.15)] hover:scale-110 hover:bg-white/40 transition-all cursor-pointer z-50",

  // Chat Panel (Premium Glassmorphism)
  // CSS COMPOSITING: This glass effect relies on `backdrop-blur-2xl` and a semi-transparent 
  // background (`bg-white/40`). For this to work, the parent iframe in `widget.js` MUST be 
  // set to `background: transparent`, otherwise the blur has nothing to filter!
  chatPanel:
    "fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[360px] h-[600px] max-h-[80vh] z-50 backdrop-blur-2xl bg-white/40 border border-white/60 rounded-[2rem] shadow-[0_8px_32px_rgba(31,38,135,0.1)] flex flex-col overflow-hidden p-5",

  // Header 
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

  // Input container 
  inputContainer:
    "flex items-center gap-2 w-full px-4 py-2 mt-2 bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl shadow-sm focus-within:shadow-md focus-within:bg-white/70 transition-all",

  // Input field
  input:
    "flex-1 bg-transparent px-2 py-2 text-sm text-[#2c2a4a] placeholder:text-gray-500 focus:outline-none",

  // Send button 
  sendButton:
    "flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-[#7F77DD] to-[#534AB7] text-white hover:opacity-90 active:scale-95 transition-all shrink-0 shadow-md",
};
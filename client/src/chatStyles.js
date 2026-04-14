export const chatStyles = {
  // Chat button (floating)
  chatButton:
    "fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[#7F77DD] to-[#534AB7] flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer border-0",

  // Chat panel
  chatPanel:
    "fixed bottom-24 right-6 w-[360px] h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden",

  // Message bubbles
  userBubble:
    "bg-gradient-to-br from-[#7F77DD] to-[#534AB7] text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm leading-relaxed",
  assistantBubble:
    "bg-white border border-[#e8e6f8] text-[#2c2a4a] px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm leading-relaxed",

  // Quick reply chips
  chip: "px-3 py-1.5 rounded-full border border-[#AFA9EC] text-[#534AB7] bg-[#EEEDFE] text-xs cursor-pointer hover:bg-[#CECBF6] transition-colors"
};

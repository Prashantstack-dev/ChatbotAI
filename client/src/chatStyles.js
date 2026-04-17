export const chatStyles = {
  // Chat button (floating)
  chatButton:
    "fixed bottom-7 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[#7F77DD] to-[#534AB7] flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer border-0",

  // Chat panel
  chatPanel:
    "fixed bottom-24 right-6 w-[360px] h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden gap-3 p-4 ",

  // Message bubbles
  userBubble:
    "bg-gradient-to-br from-[#7F77DD] to-[#534AB7] text-black px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm leading-relaxed gap-4  flex shadow-xl",
  assistantBubble:
    "bg-white border border-[#e8e6f8] text-[#2c2a4a] px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm leading-relaxed gap-4",

  // Quick reply chips
  chip: "px-3 py-1.5 rounded-full border border-[#AFA9EC] text-[#534AB7] bg-[#EEEDFE] text-xs cursor-pointer hover:bg-[#CECBF6] transition-colors",

  //bot style 
  bot: "text-[#7F77DD] shadow-[0_0_6px_rgba(127,119,221,0.6)]   rounded-full",

  //circle for bot
  circle: "absolute right-0 w-3 h-3 text-green-500 fill-green-500",

  //input wrapper
   inputContainer:
    "flex w-full gap-2 p-3 bg-white border border-[#ecebff] rounded-2xl shadow-sm focus-within:shadow-md transition",

  // input field
    input:
    "flex-1 bg-transparent outline-none text-sm text-[#2c2a4a] placeholder:text-gray-400",

  // send button
  sendButton:
    "w-10 h-10 flex items-center justify-center rounded-xl bg-[#7F77DD] text-white hover:scale-105 active:scale-95 transition",
};
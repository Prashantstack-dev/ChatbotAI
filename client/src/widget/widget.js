// Replaced Lucide unpkg import with raw SVG strings to avoid CORS issues
const messageCircleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`;
const xSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

// document.currentScript is null inside type="module" scripts.
// We must find the script tag manually to read its dataset attributes.
const scriptTag = document.querySelector('script[src*="widget.js"]');

// Wait until the HTML document is fully loaded and the DOM is ready.
// This ensures that elements like document.body exist before we try to
// append the widget (button + iframe), preventing null errors or missing UI.


document.addEventListener("DOMContentLoaded", () => {
  addWidget(scriptTag);
});

function addWidget(scriptTag) {
   //Script reads that config 
   // optional chaining acts like safety net so code doesn't crash if something doesn't exist(like null or undefined)
    const id = scriptTag?.dataset?.businessId; 

    if(!id){
      return;
    }
  // CREATE BUTTON

  const button = document.createElement("button");

  button.innerHTML = messageCircleSvg;

  button.style.position = "fixed";
  button.style.right = "24px";
  button.style.bottom = "24px";
  button.style.width = "56px";
  button.style.height = "56px";
  button.style.borderRadius = "50%";
  button.style.border = "none";
  button.style.background = "#111";
  button.style.color = "white";
  button.style.fontSize = "22px";
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 6px 20px #7F77DD";
  button.style.zIndex = '999999';
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";

  button.style.transformOrigin = "70% 70%";
  button.style.animation = "wave 2s infinite";

  // Hover effect
  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.08)";
    button.style.boxShadow = "0 10px 30px #7F77DD";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
    button.style.boxShadow = "0 6px 20px #7F77DD";
  });

  // Script creates an iframe
  const iframe = document.createElement("iframe");

  const baseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:5173' 
    : 'https://chatbot-ai-git-main-prashantstack-devs-projects.vercel.app';
    
  // 1. IFRAME CONTEXT AWARENESS: 
  // We append `&embedded=true` to the URL. This tells the React app (App.jsx) that it is 
  // running inside the widget iframe. The React app reads this and hides its own internal 
  // chat button to prevent the "double chat button" bug.
  iframe.src = `${baseUrl}?businessId=${id}&embedded=true`;

  iframe.style.position = "fixed";
  iframe.style.right = "24px";
  iframe.style.bottom = "90px";
  iframe.style.width = "380px";
  iframe.style.height = "600px";
  iframe.style.border = "1px solid rgba(255, 255, 255, 0.4)";
  iframe.style.borderRadius = "32px";
  iframe.style.boxShadow = "0 8px 32px rgba(31,38,135,0.15)";
  
  // 2. CSS COMPOSITING FOR GLASSMORPHISM:
  // Iframes have a solid white background by default. To make the glassmorphism blur effect 
  // work (backdrop-filter: blur) in the React app, the parent iframe MUST be transparent 
  // so the host website behind the iframe can bleed through.
  iframe.style.background = "transparent";
  iframe.style.zIndex='999999';
  // hidden initially
  iframe.style.opacity = "0";
  iframe.style.transform = "translateY(20px) scale(0.95)";
  iframe.style.pointerEvents = "none";
  iframe.style.transition = "all 0.3s ease";

  let isOpen = false;

  // toggle
  button.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
      button.innerHTML = xSvg;
      iframe.style.opacity = "1";
      iframe.style.transform = "translateY(0) scale(1)";
      iframe.style.pointerEvents = "auto";
    } else {
      button.innerHTML = messageCircleSvg;
      iframe.style.opacity = "0";
      iframe.style.transform = "translateY(20px) scale(0.95)";
      iframe.style.pointerEvents = "none";
    }
  });


  // ADD KEYFRAMES ONCE
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes wave {
      0% { transform: rotate(0deg); }
      15% { transform: rotate(14deg); }
      30% { transform: rotate(-8deg); }
      45% { transform: rotate(14deg); }
      60% { transform: rotate(-4deg); }
      75% { transform: rotate(10deg); }
      100% { transform: rotate(0deg); }
    }
  `;
  document.head.appendChild(style);


  // ATTACH TO PAGE

  document.body.appendChild(iframe); // widget.js creates iframe
  document.body.appendChild(button);
}
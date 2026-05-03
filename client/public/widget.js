// function addWidget() {
//   const button = document.createElement("button");

//   button.textContent = "CHATBOT"

//   const container = document.getElementById("iframe") || document.body;

//   const iframe = document.createElement("iframe");
//    //assigning values to created iframe element
//    iframe.src =
//     "https://chatbot-ai-git-main-prashantstack-devs-projects.vercel.app";

//   iframe.width = "400px";
//   iframe.height = "600px";

//   iframe.style.border = "0";
//   iframe.style.position = "fixed";
//   iframe.style.right = "24px";
//   iframe.style.bottom = "80px";
//   iframe.style.boxShadow = "0 8px 40px rgba(0,0,0,0.15)";
//   iframe.style.color = "white";
//   iframe.style.borderRadius = "16px";

//    // start hidden
//   iframe.style.display = "none";

//   // put iframe in container (not body)
//   container.appendChild(iframe);
  
  
//   //When click happens → call function → and give it the iframe
//   button.addEventListener("click", () => {
//       iframe.style.display =
//       iframe.style.display === "none" ? "block" : "none";
//     });

//     document.body.appendChild(button);
// }

// addWidget();

//document.body is built in properties where document is predefined object representing page
//appendChild is like lego putting real block to structure 
//innerHTML is erase and redraw everything from text description

// document.addEventListener("DOMContentLoaded", () => {
//   addWidget();
// });

// function addWidget() {
//   // Create button
//   const button = document.createElement("button");



// button.innerHTML = `
//   <span style="
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 22px;
//     animation: wave 1.8s infinite;
//     transform-origin: 70% 70%;
//   ">👋</span>

//   <style>
//     @keyframes wave {
//       0% { transform: rotate(0deg); }
//       15% { transform: rotate(14deg); }
//       30% { transform: rotate(-8deg); }
//       45% { transform: rotate(14deg); }
//       60% { transform: rotate(-4deg); }
//       75% { transform: rotate(10deg); }
//       100% { transform: rotate(0deg); }
//     }
//   </style>
// `;

//   // Button styles (modern floating button)
//    button.style.color = "white";
//   button.style.position = "fixed";
//   button.style.right = "24px";
//   button.style.bottom = "24px";
//   button.style.width = "56px";
//   button.style.height = "56px";
//   button.style.borderRadius = "50%";
//   button.style.border = "none";
//   button.style.background = "#111"; // sleek dark
//   button.style.cursor = "pointer";
//   button.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
//   button.style.display = "flex";
//   button.style.alignItems = "center";
//   button.style.justifyContent = "center";
//   button.style.transition = "all 0.2s ease";


//   // Hover effect
//   button.addEventListener("mouseenter", () => {
//     button.style.transform = "scale(1.08)";
//   });

//   button.addEventListener("mouseleave", () => {
//     button.style.transform = "scale(1)";
//   });

//   //  Create iframe
//   const iframe = document.createElement("iframe");

//   iframe.src =
//     "https://chatbot-ai-git-main-prashantstack-devs-projects.vercel.app";

//   iframe.style.position = "fixed";
//   iframe.style.right = "24px";
//   iframe.style.bottom = "90px";
//   iframe.style.width = "380px";
//   iframe.style.height = "600px";
//   iframe.style.border = "none";
//   iframe.style.borderRadius = "16px";
//   iframe.style.boxShadow = "0 12px 40px rgba(0,0,0,0.2)";
//   iframe.style.background = "white";

//   //  Animation initial state
//   iframe.style.opacity = "0";
//   iframe.style.transform = "translateY(20px) scale(0.95)";
//   iframe.style.pointerEvents = "none";
//   iframe.style.transition = "all 0.3s ease";

//   let isOpen = false;

//   // Toggle logic
//   button.addEventListener("click", () => {
//     isOpen = !isOpen;

//     if (isOpen) {
//       iframe.style.opacity = "1";
//       iframe.style.transform = "translateY(0) scale(1)";
//       iframe.style.pointerEvents = "auto";
//     } else {
//       iframe.style.opacity = "0";
//       iframe.style.transform = "translateY(20px) scale(0.95)";
//       iframe.style.pointerEvents = "none";
//     }
//   });

//   // Attaching to page
//   document.body.appendChild(iframe);
//   document.body.appendChild(button);
// }

// // Run it
// addWidget();


//Capture script befire async boundary
const scriptTag = document.currentScript;

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
      console.log('Missing business ID')
      return;
    }
    console.log(id);
  // CREATE BUTTON

  const button = document.createElement("button");

  button.innerHTML = "👋Widget";

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

  iframe.src =
    `https://chatbot-ai-git-main-prashantstack-devs-projects.vercel.app?businessId=${id}`;

  iframe.style.position = "fixed";
  iframe.style.right = "24px";
  iframe.style.bottom = "90px";
  iframe.style.width = "380px";
  iframe.style.height = "600px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "16px";
  iframe.style.boxShadow = "0 12px 40px #7F77DD";
  iframe.style.background = "white";
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
      iframe.style.opacity = "1";
      iframe.style.transform = "translateY(0) scale(1)";
      iframe.style.pointerEvents = "auto";
    } else {
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
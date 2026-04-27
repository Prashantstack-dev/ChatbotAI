function addWidget() {
     const button = document.getElementById("toggleBtn");
  const container = document.getElementById("iframe");

  const iframe = document.createElement("iframe");
   //assigning values to created iframe element
   iframe.src =
    "https://chatbot-ai-git-main-prashantstack-devs-projects.vercel.app";

  iframe.width = "300";
  iframe.height = "200";

  iframe.style.border = "0";
  iframe.style.position = "fixed";
  iframe.style.right = "24px";
  iframe.style.bottom = "24px";
  iframe.style.background = "purple";
  iframe.style.color = "white";
  iframe.style.borderRadius = "10px";

   // start hidden
  iframe.style.display = "none";

  // put iframe in container (not body)
  container.appendChild(iframe);
  
  
  //When click happens → call function → and give it the iframe
  button.addEventListener("click", () => {
      iframe.style.display =
      iframe.style.display === "none" ? "block" : "none";
    });
}

addWidget();

//document.body is built in properties where document is predefined object representing page
//appendChild is like lego putting real block to structure 
//innerHTML is erase and redraw everything from text description
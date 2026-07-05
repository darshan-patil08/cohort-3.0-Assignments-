let triggerButton = document.getElementById("button");
let bulb = document.querySelector(".bulb");



triggerButton.addEventListener("click", function() {


   bulb.classList.toggle("lightUp");
triggerButton.textContent = bulb.classList.contains("lightUp") ? "Turn Off" : "Turn On";
 

  
});

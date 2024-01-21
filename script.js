window.onload = function() { // Werkt niet met viewport meta tag op mobiel
    // Get the dimensions of the image and the viewport
    var image = document.getElementById('buitenkant'); // Replace 'yourImageId' with the actual ID of your image
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // Calculate the scroll position to center the image
    var scrollX = (image.width - viewportWidth) / 2;
    var scrollY = (image.height - viewportHeight) / 2;

    // Scroll to the calculated position, considering the mobile browser quirks
    window.scrollTo({
      top: scrollY,
      left: scrollX,
      behavior: 'smooth' // You can adjust this to 'auto' or 'instant' based on your preference
    });
  };

// https://github.com/anvaka/panzoom

var zoomer = panzoom(document.querySelector("#image-container"), {
  maxZoom: 20,
  minZoom: 1,
});

zoomer.on("zoom", event =>   document.querySelectorAll('.marker[data-visible]').forEach(checkIfZoomed));

function checkIfZoomed(marker) {
  let treshold = 0.08; //op desktop emulatie werkt 0.3 goed maar op echte mobiel werkt 0.08 goed??
  let markerSize = marker.getBoundingClientRect();
  if (markerSize.width / self.innerWidth > treshold) {
      if (!marker.hasAttribute("data-active")) {

      // Checks
      marker.toggleAttribute("data-active");
      console.log("Activated", marker.id);

      // Triggers
      document.querySelectorAll(".textbox").forEach(function(textbox) { textbox.style.opacity = 1; });

    }
  } 
  // ---
  else {
    if (marker.hasAttribute("data-active")) {

      // Checks
      marker.toggleAttribute("data-active");
      console.log("De-activated", marker.id);

      // Triggers
      document.querySelectorAll(".textbox").forEach(function(textbox) { textbox.style.opacity = 0; });
      
    }
  }
}

let observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.toggleAttribute("data-visible", entry.isIntersecting);
  });
});

document.querySelectorAll(".marker").forEach(element => observer.observe(element));

document.getElementById("entrance").addEventListener("click", function() {
  window.location.href = "binnenkant.html";
});

// code om mobile klikbaar te maken

// panzoom(document.getElementById('entrance-info'), {
//   onTouch: function(e) {
//     // `e` - is current touch event.

//     return false; // tells the library to not preventDefault.
//   }
// });

// document.getElementById("entrance-info").addEventListener("click", function() {
//   window.location.href = "binnenkant.html";
// });
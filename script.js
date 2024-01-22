// https://github.com/anvaka/panzoom

window.onload = function() { 
  zoomer.smoothMoveTo(-800, -200); // smooth scroll naar midden
  fadeIn(zoomer, 900);
};

var zoomer = panzoom(document.querySelector("#image-container"), {
  maxZoom: 20,
  minZoom: 1,
  onTouch: event => event.target.classList.contains("textbox") ? false : true,
  // onTouch: event => event.target.classList.contains("marker") ? false : true,
});

zoomer.on("zoom", event =>   document.querySelectorAll('.marker[data-visible]').forEach(checkIfZoomed));

function checkIfZoomed(marker) {
  let treshold = 0.08;
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

let observer = new IntersectionObserver(entries => { // keeps track of every movement
  entries.forEach(entry => {
    entry.target.toggleAttribute("data-visible", entry.isIntersecting);
  });
});

document.querySelectorAll(".marker").forEach(element => observer.observe(element));

document.getElementById("entrance-info").addEventListener("click", function() {
  window.location.href = "binnenkant.html";
});

function playVideo() {
  var video = document.getElementById("introvideo");
  video.play();
  document.getElementById('video-overlay').style.opacity = '0';
  document.getElementById('skipvideo').style.display = 'block';
}

// Fade Out Function
function fadeOutAndRedirect(element, duration = 1000, redirectTimeout = 1000, newPage = "your-new-page.html") {
  element.style.transition = `opacity ${duration}ms ease-in-out`;
  element.style.opacity = 0;

  // Set a timeout for redirecting after the fade-out
  setTimeout(function() {
      window.location.href = newPage;
  }, redirectTimeout);
}

function fadeIn(element, duration = 1000) {
  element.style.transition = `opacity ${duration}ms ease-in-out`;
  element.style.opacity = 1;
}

function fadeOut(element, duration = 1000) {
  element.style.transition = `opacity ${duration}ms ease-in-out`;
  element.style.opacity = 0;
}

function videoEnd() { 
  var video = document.getElementById("introvideo");
  document.getElementById('video-overlay').style.opacity = '0';
  fadeOutAndRedirect(video, 900, 1000, "buitenkant.html");
}

function updateProgressBar() { // Video progressbar
  var video = document.getElementById("introvideo");
  var progressBar = document.getElementById("progress-bar");

  var progress = (video.currentTime / video.duration) * 100;
  progressBar.style.width = progress + "%";
}




// https://github.com/anvaka/panzoom

window.onload = function() { 
  zoomer.smoothMoveTo(-900, -350); // smooth scroll naar midden
};

// ===-TYPEWRITER EFFECT FOR INTRO VIDEO -===

// code gebruikt van timdotcoce https://codepen.io/timdotcode/pen/bOejXp
var typeWriterElement = document.getElementById('typewriter');

var textArray = [
  "Colombia is known for it’s rich & diverse culture and for their lively society.",
  "Bakeries play a big part in the lives of these Colombian citizens. As they don’t just use it to get bread.", 
  "Let's explore!"
];

// function to generate the backspace effect 
function delWriter(text, i, cb) {
	if (i >= 0 ) {
		typeWriterElement.innerHTML = text.substring(0, i--);
		// generate a random Number to emulate backspace hitting.
 		var rndBack = 10 + Math.random() * 100;
		setTimeout(function() {
			delWriter(text, i, cb);
		},rndBack); 
	} else if (typeof cb == 'function') {
		setTimeout(cb,1000);
	}
};

// function to generate the keyhitting effect
function typeWriter(text, i, cb) {
	if ( i < text.length+1 ) {
		typeWriterElement.innerHTML = text.substring(0, i++);
		// generate a random Number to emulate Typing on the Keyboard.
		var rndTyping = 165 - Math.random() * 100;
		setTimeout( function () { 
			typeWriter(text, i++, cb)
		},rndTyping);
	} else if (i === text.length+1) {
		setTimeout( function () {
			delWriter(text, i, cb)
		},1000);
	}
};

// the main writer function
function StartWriter(i) {
	if (typeof textArray[i] == "undefined") {
		setTimeout( function () {
			StartWriter(0)
		},1000);
	} else if(i < textArray[i].length+1) {
		typeWriter(textArray[i], 0, function () {
			StartWriter(i+1);
		});
	}  
};



// ===- END OF TYPEWRITER -===

var zoomer = panzoom(document.querySelector("#image-container"), {
  maxZoom: 20,
  minZoom: 0.7,
  initialZoom: 0.75,
  onTouch: event => {
    const popupsElement = event.target.closest("popups");
    
    if (popupsElement) {
      console.log("popups or its child touched. Returning false.");
      return false;
    }

    if (event.target.classList.contains("marker")) {
      console.log("Marker touched. Returning false.");
      return false;
    }

    console.log("Neither marker nor popups touched. Returning true.");
    return true;
  },
});


zoomer.on("zoom", event =>   document.querySelectorAll('.marker[data-visible]').forEach(checkIfZoomed));

function checkIfZoomed(marker) {
  let treshold = 0.1;
  let markerSize = marker.getBoundingClientRect();

  if (markerSize.width / self.innerWidth > treshold) {
    if (!marker.hasAttribute("data-active")) {
      // Activate marker
      marker.toggleAttribute("data-active");
      console.log("Activated", marker.id);

      // Activate associated popups
      for (let i = 1; i <= 2; i++) {
        const popupsId = marker.id + "-popup" + i; // Assuming you have -popup1, -popup2, etc.
        const associatedpopups = document.getElementById(popupsId);
        if (associatedpopups) {
          associatedpopups.style.opacity = 0.9;
        }
      }
    }
  } 
  // ---
  else {
    if (marker.hasAttribute("data-active")) {
      // Deactivate marker
      marker.toggleAttribute("data-active");
      console.log("De-activated", marker.id);

      // Deactivate associated popups
      for (let i = 1; i <= 2; i++) {
        const popupsId = marker.id + "-popup" + i; // Assuming you have -popup1, -popup2, etc.
        const associatedpopups = document.getElementById(popupsId);
        if (associatedpopups) {
          associatedpopups.style.opacity = 0;
        }
      }
    }
  }
}

let observer = new IntersectionObserver(entries => { // keeps track of every movement
  entries.forEach(entry => {
    entry.target.toggleAttribute("data-visible", entry.isIntersecting);
  });
});

document.querySelectorAll(".marker").forEach(element => observer.observe(element));

function goInside() {
  var buitenkant = document.getElementById('buitenkant');
  fadeOutAndRedirect(buitenkant, 900, 1000, "binnenkant.html");
}
function goOutside() {
  var binnenkant = document.getElementById('binnenkant');
  fadeOutAndRedirect(binnenkant, 900, 1000, "buitenkant.html");
}

function playVideo() {
  var video = document.getElementById("introvideo");
  video.play();
  document.getElementById('video-overlay').style.opacity = '0';
  document.getElementById('typewriter-container').style.opacity = '1';
  document.getElementById('skipvideo').style.display = 'block';

  // wait one second then start the typewriter
  setTimeout( function () {
	  StartWriter(0);
  },1000);
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

function videoEnd() {  // redirect en fade naar buitekant schets
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

function playRadio() {
  // Get the audio element
  var radioAudio = document.getElementById('radioplayer');

  if (radioAudio.paused) { // Check if the radioAudio is currently paused or playing
    radioAudio.play();
  } else {
    radioAudio.pause();
  }
  // Ik doe het niet uit als opacity 0 is voor achterground muziek
}

function playBalie() {
  // Get the video element
  var balieVideo = document.getElementById('balieplayer');

  if (balieVideo.paused) { // Check if the balieVideo is currently paused or playing
    balieVideo.play();
  } else {
    balieVideo.pause();
  }
  // Ik zou hier kunnen toevoegen om video te pauzeren als de opacity weer 0 wordt
  // Maar aanhouden kan ook leuk zijn als achtergrond geluid, zolang er geen conflict is
}




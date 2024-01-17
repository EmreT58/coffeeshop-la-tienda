window.onload = function() {
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
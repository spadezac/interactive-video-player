document.querySelectorAll(".video-card").forEach((card, index, cards) => {
  card.addEventListener("mouseover", () => {
    cards.forEach((otherCard, otherIndex) => {
      // Default styles for all cards
      let zIndex = 1;
      let scale = 0.6;
      let translateX = (otherIndex - index) * 20; // Default translation based on relative position

      if (otherIndex === index) {
        // Style for the hovered card
        zIndex = 10;
        scale = 1;
        translateX = 0;
      } else if (Math.abs(otherIndex - index) === 1) {
        // Style for the card directly to the left or right of the hovered card
        zIndex = 5;
        scale = 0.9;
        translateX = otherIndex < index ? -20 : 20;
      } else if (Math.abs(otherIndex - index) === 2) {
        // Style for the card two positions away
        zIndex = 3;
        scale = 0.8;
        translateX = otherIndex < index ? -40 : 40;
      } else if (Math.abs(otherIndex - index) === 3) {
        // Style for the card three positions away
        zIndex = 2;
        scale = 0.7;
        translateX = otherIndex < index ? -60 : 60;
      } else if (Math.abs(otherIndex - index) === 4) {
        // Style for the card four positions away
        zIndex = 1;
        scale = 0.6;
        translateX = otherIndex < index ? -60 : 60;
      }

      // Apply calculated styles to the card
      otherCard.style.transform = `translateX(${translateX}px) scale(${scale})`;
      otherCard.style.zIndex = zIndex;
    });
  });

  // Handle click event to open the modal and play the video
  card.addEventListener("click", () => {
    const modal = document.getElementById("videoModal"); 
    const videoElement = modal.querySelector("video"); 

    const videoSrc = `${card.id}.mp4`; // Generate the video source URL based on card ID
    videoElement.querySelector("source").src = videoSrc;
    videoElement.load(); 
    modal.classList.add("active"); // Show the modal
    modal.style.zIndex = "999"; // Ensure the modal is on top

    videoElement.controls = true;
    videoElement.play(); // Automatically play the video when the modal opens
  });
});

// Handle play/pause toggle when the video itself is clicked
document.querySelector("#videoModal video").addEventListener("click", (e) => {
  const videoElement = e.target;
  if (videoElement.paused) {
    videoElement.play(); // Play the video if it's paused
  } else {
    videoElement.pause(); // Pause the video if it's playing
  }
});

// Handle closing the modal when clicking outside the video
document.getElementById("videoModal").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    // Ensure the click is outside the video element
    const modal = document.getElementById("videoModal");
    const videoElement = modal.querySelector("video");

    videoElement.pause(); // Pause the video when closing the modal
    modal.classList.remove("active"); // Hide the modal
    modal.style.zIndex = ""; // Reset z-index after closing
  }
});

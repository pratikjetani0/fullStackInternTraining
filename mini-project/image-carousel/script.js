let images = [
  "https://images.unsplash.com/photo-1777131263706-d6c57f590a7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1761839259488-2bdeeae794f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1774095120121-e2fcb529cc2b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1770027218173-45e512200cd0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1776965767257-6b07d891a0a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1769745918779-f255f567664c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

let currentIndex = 0;

let img = document.getElementById("carousel-image");
let next = document.getElementById("next-button");
let prev = document.getElementById("prev-button");

let incrementIndex = function () {
  //copy your incrementIndex() code
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
};

// copy your event listener code for the #next-button click here

next.addEventListener("click", (e) => {
  incrementIndex();
  img.src = images[currentIndex];
});

// create an event listener for a #prev-button click
// decrement the index
// set the img src to the previous URL in the images array
prev.addEventListener("click", function (e) {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }

  img.src = images[currentIndex];
});

// Render Feather icons
feather.replace();

// Toggle sidebar visibility on mobile
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("hidden"); // Toggle 'hidden' class to show/hide sidebar
});

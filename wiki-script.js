// Acordeón interactivo
document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".accordion-toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const content = toggle.nextElementSibling;
      const isOpen = content.style.display === "block";

      // Cerrar todos los contenidos primero
      document.querySelectorAll(".accordion-content").forEach(c => {
        c.style.display = "none";
      });

      // Abrir el actual si estaba cerrado
      if (!isOpen) {
        content.style.display = "block";
      }
    });
  });

  // Partículas mágicas (brasas animadas)
  const embersContainer = document.getElementById("embers");

  if (embersContainer) {
    for (let i = 0; i < 120; i++) {
      const ember = document.createElement("div");
      ember.style.position = "absolute";
      ember.style.width = "2px";
      ember.style.height = "2px";
      ember.style.background = "#ffb347";
      ember.style.borderRadius = "50%";
      ember.style.opacity = Math.random();
      ember.style.left = `${Math.random() * 100}%`;
      ember.style.top = `${Math.random() * 100}%`;
      ember.style.animation = `flicker ${1 + Math.random() * 2}s infinite ease-in-out`;
      embersContainer.appendChild(ember);
    }
  }
});

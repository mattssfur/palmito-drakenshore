const embersContainer = document.getElementById("embers");

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

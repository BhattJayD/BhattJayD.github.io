document.addEventListener("DOMContentLoaded", function () {
  fetch("projects.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("projects-container");
      const modal = document.getElementById("projectModal");
      const modalTitle = document.getElementById("modal-title");
      const modalDescription = document.getElementById("modal-description");
      const modalButtons = document.getElementById("modal-buttons");
      const closeModal = document.querySelector(".close");

      // Hide modal initially (for safety)
      modal.classList.remove("show");

      // Create grid container
      const projectsGrid = document.createElement("div");
      projectsGrid.classList.add("projects-grid");
      container.appendChild(projectsGrid);

      data.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card", "glass-effect");

        projectCard.innerHTML = `
              <h3>${project.name}</h3>
              <p class="short-description">${project.description.substring(
                0,
                120
              )}...</p>
              <span class="read-more" data-name="${
                project.name
              }">Read More</span>
            `;

        // Handle modal opening
        projectCard
          .querySelector(".read-more")
          .addEventListener("click", function () {
            modalTitle.textContent = project.name;
            modalDescription.textContent = project.description;
            modalButtons.innerHTML = "";

            if (project.github) {
              modalButtons.innerHTML += `<a class="cta-button github" href="${project.github}" target="_blank">
                <i class="fab fa-github"></i> GitHub
              </a>`;
            }
            if (project.playstore) {
              modalButtons.innerHTML += `<a class="cta-button playstore" href="${project.playstore}" target="_blank">
                <i class="fab fa-google-play"></i> Play Store
              </a>`;
            }
            if (project.appstore) {
              modalButtons.innerHTML += `<a class="cta-button appstore" href="${project.appstore}" target="_blank">
                <i class="fab fa-app-store-ios"></i> App Store
              </a>`;
            }

            modal.classList.add("show"); // Show modal smoothly
          });

        // Append project card to grid
        projectsGrid.appendChild(projectCard);
      });

      // Close modal event
      closeModal.addEventListener("click", function () {
        modal.classList.remove("show"); // Hide modal smoothly
      });

      // Close modal when clicking outside content
      window.addEventListener("click", function (event) {
        if (event.target === modal) {
          modal.classList.remove("show"); // Hide modal smoothly
        }
      });
    })
    .catch((error) => console.error("Error loading projects:", error));
});

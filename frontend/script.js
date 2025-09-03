

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar = document.getElementById("sidebar");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }

  document.addEventListener("click", function (e) {
    if (
      sidebar.classList.contains("active") && 
      !sidebar.contains(e.target) && 
      e.target !== toggleBtn
    ) {
      sidebar.classList.remove("active");
    }
  })

  // Show new category input
    const categorySelect = document.getElementById("category");
    const newCategoryInput = document.getElementById("newCategory");

    categorySelect.addEventListener("change", () => {
      if (categorySelect.value === "add-new") {
        newCategoryInput.classList.remove("d-none");
        newCategoryInput.required = true;
      } else {
        newCategoryInput.classList.add("d-none");
        newCategoryInput.required = false;
      }
    });

    // Tags input logic
    const tagsContainer = document.getElementById("tagsContainer");
    const tagInput = document.getElementById("tagInput");

    tagInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && tagInput.value.trim() !== "") {
        e.preventDefault();
        const tagText = tagInput.value.trim();

        const tag = document.createElement("div");
        tag.classList.add("tag");
        tag.innerHTML = `${tagText} <span>&times;</span>`;

        tag.querySelector("span").addEventListener("click", () => {
          tagsContainer.removeChild(tag);
        });

        tagsContainer.insertBefore(tag, tagInput);
        tagInput.value = "";
      }
    });
  
});


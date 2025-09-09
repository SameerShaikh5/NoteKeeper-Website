

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
    
  
});


document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch login status
    const res = await fetch(`${CONFIG.BACKEND_URL}/users/verifyLogin`, {
      method: "GET",
      credentials: "include" // important to send cookies
    });

    const data = await res.json();
    console.log(data)

    const navUl = document.querySelector(".navbar-nav");

    if (data.loggedIn) {
      // Remove Signup and Login links
      navUl.querySelectorAll("a.nav-link").forEach(link => {
        if (link.textContent === "Signup" || link.textContent === "Login") {
          link.closest("li").remove();
        }
      });

      // Insert Logout link
      const li = document.createElement("li");
      li.className = "nav-item";
      li.innerHTML = `<a class="nav-link" href="#" id="logoutLink">Logout</a>`;
      navUl.appendChild(li);

      // Logout functionality
      document.getElementById("logoutLink").addEventListener("click", async (e) => {
        e.preventDefault();
        try {
          const logoutRes = await fetch(`${CONFIG.BACKEND_URL}/users/logout`, {
            method: "GET",
            credentials: "include"
          });
          const logoutData = await logoutRes.json();
          if (logoutData.success) {
            alert("Logged out successfully!");
            window.location.reload(); // refresh page to update navbar
          }
        } catch (err) {
          console.error("Logout failed:", err);
        }
      });
    }
  } catch (err) {
    console.error("Error checking login status:", err);
  }
});

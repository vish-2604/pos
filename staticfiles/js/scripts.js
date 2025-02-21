document.addEventListener("DOMContentLoaded", function () {
    function loadContent(url, clickedLink = null) {
        fetch(url, { headers: { "X-Requested-With": "XMLHttpRequest" } })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById("content-area").innerHTML = html;
                window.history.pushState({ path: url }, "", url);

                // Update active link
                updateActiveLink(url);
            })
            .catch(error => console.error("Error loading content:", error));
    }

    function updateActiveLink(url = null) {
        document.querySelectorAll(".sidebar a").forEach(link => link.classList.remove("active"));

        if (url) {
            let activeElement = document.querySelector(`.sidebar a[href="${url}"]`);
            if (activeElement) {
                activeElement.classList.add("active");
                localStorage.setItem("activeLink", url);
            }
        } else {
            let storedPath = localStorage.getItem("activeLink") || document.getElementById("default-active").getAttribute("href");
            let defaultActive = document.querySelector(`.sidebar a[href="${storedPath}"]`);
            if (defaultActive) {
                defaultActive.classList.add("active");
            }
        }
    }

    // Attach event listeners to sidebar links
    document.querySelectorAll(".sidebar a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let url = this.getAttribute("href");
            loadContent(url);
        });
    });

    // Handle back/forward navigation
    window.onpopstate = function (event) {
        if (event.state && event.state.path) {
            loadContent(event.state.path);
        }
    };

    // Set the active link on page load
    updateActiveLink();

    // Load correct content on refresh
    if (window.location.pathname !== "/") {
        loadContent(window.location.pathname);
    }
});

// Sidebar toggle function
function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.style.width = sidebar.style.width === "250px" ? "70px" : "250px";
}

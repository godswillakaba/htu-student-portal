const sidebarToggle = document.querySelector("#sidebarToggle");
const sidebar = document.querySelector(".sidebar");

if (sidebarToggle && sidebar) {
    const menuIcon = sidebarToggle.querySelector("i");

    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("show");

        const isOpen = sidebar.classList.contains("show");

        sidebarToggle.setAttribute("aria-expanded", isOpen);

        if (isOpen) {
            menuIcon.className = "bx bx-x";
            sidebarToggle.setAttribute("aria-label", "Close navigation menu");
        } else {
            menuIcon.className = "bx bx-menu";
            sidebarToggle.setAttribute("aria-label", "Open navigation menu");
        }
    });
}

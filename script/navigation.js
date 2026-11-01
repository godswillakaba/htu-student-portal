 //const navButton = document.querySelector(".nav-button");
 //const navMenu = document.querySelector(".nav-menu");
 //const navIcon = navButton.querySelector("i");

 //navButton.addEventListener("click", function(){
   // navMenu.classList.toggle("show");
   // navIcon.classList.toggle("bx-menu");
   // navIcon.classList.toggle("bx-x");
 //});

// const navButton = document.querySelector(".nav-button");
// const navMenu = document.querySelector(".nav-menu");

// if (navButton && navMenu) {
//     const navIcon = navButton.querySelector("i");

//     navButton.addEventListener("click", function () {
//         navMenu.classList.toggle("show");

//         if (navIcon) {
//             navIcon.classList.toggle("bx-menu");
//             navIcon.classList.toggle("bx-x");
//         }
//     });
// }




const sidebarToggle = document.querySelector("#sidebarToggle");
const sidebar = document.querySelector(".sidebar");
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

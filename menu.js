const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.querySelector("#menu-panel");
const menuScrim = document.querySelector(".menu-scrim");
const closeTargets = document.querySelectorAll("[data-menu-close]");

const setMenuState = (isOpen) => {
    menuPanel.classList.toggle("is-open", isOpen);
    menuScrim.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuPanel.setAttribute("aria-hidden", !isOpen);
};

if (menuToggle && menuPanel && menuScrim) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        setMenuState(!isOpen);
    });

    closeTargets.forEach((target) => {
        target.addEventListener("click", () => setMenuState(false));
    });

    menuPanel.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuState(false);
        }
    });
}

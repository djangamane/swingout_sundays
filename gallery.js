const galleryTriggers = document.querySelectorAll("[data-lightbox]");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const lightboxVideo = document.querySelector(".lightbox__video");
const lightboxCloseTargets = document.querySelectorAll("[data-lightbox-close]");

const closeLightbox = () => {
    if (!lightbox) {
        return;
    }
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");

    if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.removeAttribute("src");
        lightboxVideo.load();
    }

    if (lightboxImage) {
        lightboxImage.removeAttribute("src");
        lightboxImage.setAttribute("alt", "");
    }
};

const openLightbox = (trigger) => {
    if (!lightbox || !lightboxImage || !lightboxVideo) {
        return;
    }

    const type = trigger.dataset.type;
    const src = trigger.dataset.src;
    const alt = trigger.dataset.alt || "";

    if (type === "video") {
        lightboxImage.style.display = "none";
        lightboxVideo.style.display = "block";
        lightboxVideo.src = src;
        lightboxVideo.load();
    } else {
        lightboxVideo.pause();
        lightboxVideo.style.display = "none";
        lightboxVideo.removeAttribute("src");
        lightboxVideo.load();
        lightboxImage.style.display = "block";
        lightboxImage.src = src;
        lightboxImage.alt = alt;
    }

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
};

galleryTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openLightbox(trigger));
});

lightboxCloseTargets.forEach((target) => {
    target.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightbox();
    }
});

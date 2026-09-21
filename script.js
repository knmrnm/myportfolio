/* =========================================================
   WEBWISE. — INTERACTIONS & MOTION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const header = document.querySelector(".site-header");
    const loader = document.querySelector(".page-loader");
    const menuButton = document.querySelector(".menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");
    const revealElements = document.querySelectorAll(".reveal");
    const yearElement = document.querySelector("#year");

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const hideLoader = () => {
        if (!loader) return;

        loader.classList.add("loaded");

        setTimeout(() => {
            loader.remove();
        }, 900);
    };

    if (reduceMotion) {
        hideLoader();
    } else {
        window.addEventListener("load", () => {
            setTimeout(hideLoader, 450);
        });
    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    if (reduceMotion) {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }


    /* =====================================================
       NAVIGATION ON SCROLL
    ===================================================== */

    const updateHeader = () => {
        if (!header) return;

        if (window.scrollY > 35) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const closeMenu = () => {
        body.classList.remove("menu-open");

        if (menuButton) {
            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open menu"
            );
        }
    };

    const openMenu = () => {
        body.classList.add("menu-open");

        if (menuButton) {
            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

            menuButton.setAttribute(
                "aria-label",
                "Close menu"
            );
        }
    };

    if (menuButton) {
        menuButton.addEventListener("click", () => {
            if (body.classList.contains("menu-open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    if (mobileMenu) {
        mobileMenu.addEventListener("click", (event) => {
            if (event.target === mobileMenu) {
                closeMenu();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });


    /* =====================================================
       SMOOTH ANCHOR NAVIGATION
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: reduceMotion
                    ? "auto"
                    : "smooth"
            });
        });
    });


    /* =====================================================
       DESKTOP PROJECT TILT
    ===================================================== */

    const projectCards = document.querySelectorAll(
        ".project-card"
    );

    const supportsHover =
        window.matchMedia("(hover: hover)").matches;

    if (supportsHover && !reduceMotion) {
        projectCards.forEach((card) => {
            card.addEventListener("mousemove", (event) => {
                const rect = card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -1.5;

                const rotateY =
                    ((x - centerX) / centerX) * 1.5;

                card.style.transform =
                    `perspective(1200px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }


    /* =====================================================
       SUBTLE HERO PARALLAX
    ===================================================== */

    const hero = document.querySelector(".hero");
    const orbOne = document.querySelector(".hero-orb-one");
    const orbTwo = document.querySelector(".hero-orb-two");

    if (
        supportsHover &&
        !reduceMotion &&
        hero &&
        orbOne &&
        orbTwo
    ) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        window.addEventListener("mousemove", (event) => {
            mouseX =
                (event.clientX / window.innerWidth - 0.5) *
                2;

            mouseY =
                (event.clientY / window.innerHeight - 0.5) *
                2;
        });

        const animateOrbs = () => {
            currentX +=
                (mouseX - currentX) * 0.035;

            currentY +=
                (mouseY - currentY) * 0.035;

            orbOne.style.transform =
                `translate3d(
                    ${currentX * 18}px,
                    ${currentY * 18}px,
                    0
                )`;

            orbTwo.style.transform =
                `translate3d(
                    ${currentX * -12}px,
                    ${currentY * -12}px,
                    0
                )`;

            requestAnimationFrame(animateOrbs);
        };

        animateOrbs();
    }


    /* =====================================================
       BUTTON MAGNETIC EFFECT
       ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".button, .nav-cta"
        );

    if (supportsHover && !reduceMotion) {
        magneticButtons.forEach((button) => {
            button.addEventListener("mousemove", (event) => {
                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(
                        ${x * 0.08}px,
                        ${y * 0.12}px
                    )`;
            });

            button.addEventListener("mouseleave", () => {
                button.style.transform = "";
            });
        });
    }


    /* =====================================================
       PROJECT IMAGE PARALLAX
    ===================================================== */

    if (supportsHover && !reduceMotion) {
        const projectVisuals =
            document.querySelectorAll(
                ".project-visual"
            );

        projectVisuals.forEach((visual) => {
            visual.addEventListener("mousemove", (event) => {
                const rect =
                    visual.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;

                const windowElement =
                    visual.querySelector(
                        ".project-window"
                    );

                const propertyCard =
                    visual.querySelector(
                        ".property-card"
                    );

                const cafeCard =
                    visual.querySelector(
                        ".cafe-card"
                    );

                const target =
                    windowElement ||
                    propertyCard ||
                    cafeCard;

                if (!target) return;

                target.style.transform =
                    `translate(
                        ${x * 8}px,
                        ${y * 8}px
                    )`;
            });

            visual.addEventListener("mouseleave", () => {
                const windowElement =
                    visual.querySelector(
                        ".project-window"
                    );

                const propertyCard =
                    visual.querySelector(
                        ".property-card"
                    );

                const cafeCard =
                    visual.querySelector(
                        ".cafe-card"
                    );

                const target =
                    windowElement ||
                    propertyCard ||
                    cafeCard;

                if (!target) return;

                target.style.transform = "";
            });
        });
    }


    /* =====================================================
       RESIZE SAFETY
    ===================================================== */

    window.addEventListener("resize", () => {
        if (
            window.innerWidth > 900 &&
            body.classList.contains("menu-open")
        ) {
            closeMenu();
        }
    });


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.documentElement.classList.add(
        "js-ready"
    );
});

/*=========================================
  AOS INITIALIZATION
=========================================*/

console.log("JavaScript is working!");

if (typeof AOS !== "undefined") {
    AOS.init({
        duration: 1000,
        once: true,
        easing: "ease-in-out"
    });
}


/*=========================================
  MOBILE MENU TOGGLE
=========================================*/

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

}


/*=========================================
  CLOSE MENU WHEN CLICKING LINKS
=========================================*/

// const navLinks = document.querySelectorAll(".nav-links a");

// navLinks.forEach(link => {

//     link.addEventListener("click", () => {

//         if (navbar) {
//             navbar.classList.remove("active");
//         }

//         if (menuToggle) {
//             menuToggle.classList.remove("active");
//         }

//     });

// });

/*=========================================
  MOBILE MENU + DROPDOWN
=========================================*/

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", function(e) {

        const dropdown = this.parentElement;

        /* Services dropdown */
        if (dropdown.classList.contains("dropdown")) {

            e.preventDefault();

            dropdown.classList.toggle("active");

            return;
        }

        /* Normal links */
        if (navbar) {
            navbar.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");
        }

    });

});


/*=========================================
  HEADER + ACTIVE MENU
  OPTIMIZED SCROLL HANDLER
=========================================*/

const header = document.getElementById("header");
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-links a");

let ticking = false;

function updateScroll() {

    const scrollY = window.scrollY;

    /*---------------------------------------
      STICKY HEADER
    ---------------------------------------*/

    if (header) {

        if (scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }


    /*---------------------------------------
      ACTIVE MENU LINK
    ---------------------------------------*/

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (scrollY >= sectionTop) {
            current = section.id;
        }

    });


    links.forEach(link => {

        const href = link.getAttribute("href");

        link.classList.toggle(
            "active",
            href === "#" + current
        );

    });

    ticking = false;

}


/*-----------------------------------------
  REQUEST ANIMATION FRAME
-----------------------------------------*/

window.addEventListener("scroll", () => {

    if (!ticking) {

        window.requestAnimationFrame(updateScroll);

        ticking = true;

    }

}, { passive: true });


/*=========================================
  SMOOTH SCROLL
=========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            e.preventDefault();

            const top =
                target.getBoundingClientRect().top +
                window.scrollY -
                80;

            window.scrollTo({
                top: top,
                behavior: "smooth"
            });

        }

    });

});


/*=========================================
  HERO SWIPER
=========================================*/

if (typeof Swiper !== "undefined" &&
    document.querySelector(".heroSwiper")) {

    const swiper = new Swiper(".heroSwiper", {

        loop: true,

        speed: 1200,

        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },

        effect: "fade",

        fadeEffect: {
            crossFade: true
        }

    });

}


/*=========================================
  REVEAL ANIMATION
  USING INTERSECTION OBSERVER
=========================================*/

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    /* Stop observing once revealed */
                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.1,
            rootMargin: "0px 0px -80px 0px"
        }

    );


    reveals.forEach(item => {

        revealObserver.observe(item);

    });

} else {

    /* Fallback for older browsers */

    reveals.forEach(item => {

        item.classList.add("active");

    });

}


/*=========================================
  FAQ ACCORDION
=========================================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    if (!question) {
        return;
    }

    question.addEventListener("click", () => {

        faqItems.forEach(faq => {

            if (faq !== item) {
                faq.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});


/*=========================================
  WHATSAPP QUOTE FORM
=========================================*/

const whatsappForm = document.getElementById("whatsappForm");

if (whatsappForm) {

    whatsappForm.addEventListener("submit", function (e) {

        e.preventDefault();


        const name =
            document.getElementById("name")?.value.trim() || "";

        const phone =
            document.getElementById("phone")?.value.trim() || "";

        const service =
            document.getElementById("service")?.value || "";

        const location =
            document.getElementById("location")?.value || "";

        const message =
            document.getElementById("message")?.value.trim() || "";


        const whatsappMessage =

`*New Quote Request*

👤 Name : ${name}

📞 Phone : ${phone}

🛠 Service : ${service}

📍 Location : ${location}

📝 Requirement :
${message}

Sent from Kranthi Safety Nets Website`;


        const url =
            `https://wa.me/919663314447?text=${encodeURIComponent(whatsappMessage)}`;


        window.open(url, "_blank");

    });

}
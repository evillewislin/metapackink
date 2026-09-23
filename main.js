document.addEventListener("DOMContentLoaded", function () {


    /*
    --------------------------------
    CONTACT FORM
    --------------------------------
    */

    const form = document.getElementById("quoteForm");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const message =
                document.getElementById("formMessage");

            const name =
                form.querySelector('[name="name"]').value;

            const email =
                form.querySelector('[name="email"]').value;

            const details =
                form.querySelector('[name="message"]').value;


            if (!name || !email || !details) {

                message.style.color = "#d33";

                message.textContent =
                    "Please complete the required fields.";

                return;

            }


            /*
            --------------------------------
            MAILTO FALLBACK
            --------------------------------
            Replace the email address below
            with your real sales email.
            --------------------------------
            */

            const company =
                form.querySelector('[name="company"]').value;

            const phone =
                form.querySelector('[name="phone"]').value;

            const packaging =
                form.querySelector('[name="packaging"]').value;

            const quantity =
                form.querySelector('[name="quantity"]').value;

            const date =
                form.querySelector('[name="date"]').value;


            const subject =
                encodeURIComponent(
                    "New Metapackink Packaging Inquiry"
                );


            const body =
                encodeURIComponent(

                    "Name: " + name + "\n" +
                    "Company: " + company + "\n" +
                    "Email: " + email + "\n" +
                    "Phone: " + phone + "\n" +
                    "Packaging: " + packaging + "\n" +
                    "Quantity: " + quantity + "\n" +
                    "Target Date: " + date + "\n\n" +
                    "Project Details:\n" +
                    details

                );


            window.location.href =
                "mailto:sales@metapackink.com" +
                "?subject=" +
                subject +
                "&body=" +
                body;


            message.style.color = "#e87522";

            message.textContent =
                "Your email client is opening. Thank you for contacting Metapackink.";

        });

    }


    /*
    --------------------------------
    HEADER SCROLL EFFECT
    --------------------------------
    */

    const header =
        document.querySelector(".site-header");


    if (header) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 20) {

                header.style.boxShadow =
                    "0 8px 30px rgba(0,0,0,.06)";

            } else {

                header.style.boxShadow =
                    "none";

            }

        });

    }


    /*
    --------------------------------
    SCROLL REVEALS
    --------------------------------
    */

    const revealItems = document.querySelectorAll(
        ".intro-section, .section-heading, .page-hero > .container, .solution-hero > .container, .contact-hero > .container, .contact-info, .contact-form-wrapper, .contact-card, .dark-cta > .container, .category-heading, .timeline-item, .finishing-grid, .industry-grid"
    );

    const staggerItems = document.querySelectorAll(
        ".product-grid, .feature-grid, .process-grid, .catalog-grid, .material-grid, .footer-grid"
    );

    revealItems.forEach(function (item) {
        item.classList.add("reveal");
    });

    staggerItems.forEach(function (item) {
        item.classList.add("reveal-stagger");
    });

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries, revealObserver) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);

                }

            });

        }, { threshold:0.12, rootMargin:"0px 0px -40px" });

        document.querySelectorAll(".reveal, .reveal-stagger").forEach(function (item) {
            observer.observe(item);
        });

    } else {

        document.querySelectorAll(".reveal, .reveal-stagger").forEach(function (item) {
            item.classList.add("is-visible");
        });

    }


    /*
    --------------------------------
    SMOOTH INTERNAL LINKS
    --------------------------------
    */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


});
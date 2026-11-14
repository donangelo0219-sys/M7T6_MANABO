const settingsKey = "portfolioSettings";

const defaultSettings = {
    theme: "light",
    visitorName: "",
    lastVisit: ""
};

let settings = { ...defaultSettings };
const savedSettings = localStorage.getItem(settingsKey);

if (savedSettings) {
    try {
        settings = { ...defaultSettings, ...JSON.parse(savedSettings) };
    } catch (error) {
        settings = { ...defaultSettings };
        localStorage.removeItem(settingsKey);
    }
}

document.documentElement.classList.toggle(
    "dark-mode",
    settings.theme === "dark"
);

settings.lastVisit = new Date().toISOString();
localStorage.setItem(settingsKey, JSON.stringify(settings));

const menuButton = document.getElementById("menu-button");
const navigationMenu = document.getElementById("navigation-menu");

if (menuButton && navigationMenu) {
    menuButton.addEventListener("click", function () {
        const menuIsOpen = menuButton.getAttribute("aria-expanded") === "true";

        navigationMenu.hidden = menuIsOpen;
        menuButton.setAttribute("aria-expanded", String(!menuIsOpen));
        navigationMenu.setAttribute("aria-hidden", String(menuIsOpen));

        if (!menuIsOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    navigationMenu.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            navigationMenu.hidden = true;
            menuButton.setAttribute("aria-expanded", "false");
            navigationMenu.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            navigationMenu.hidden = true;
            menuButton.setAttribute("aria-expanded", "false");
            navigationMenu.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
            menuButton.focus();
        }
    });
}

const darkModeButton = document.getElementById("dark-mode-button");

if (darkModeButton) {
    const darkModeOn = settings.theme === "dark";

    darkModeButton.setAttribute("aria-pressed", String(darkModeOn));
    darkModeButton.textContent = darkModeOn ? "Light mode" : "Dark mode";

    darkModeButton.addEventListener("click", function () {
        const darkModeOn = document.documentElement.classList.toggle("dark-mode");

        settings.theme = darkModeOn ? "dark" : "light";

        localStorage.setItem(settingsKey, JSON.stringify(settings));

        darkModeButton.setAttribute("aria-pressed", String(darkModeOn));
        darkModeButton.textContent = darkModeOn ? "Light mode" : "Dark mode";
    });
}

const bouquets = [
    { name: "Hinog" },
    { name: "Native" },
    { name: "Tundan" },
    { name: "Yabano" }
];

const bouquetList = document.getElementById("bouquet-list");

if (bouquetList) {
    bouquetList.innerHTML = "";

    bouquets.forEach(function (bouquet) {
        const card = document.createElement("article");
        const title = document.createElement("h3");

        card.className = "card";
        title.textContent = lemon.name;

        card.appendChild(title);
        bouquetList.appendChild(card);
    });

    if (lemons.length === 0) {
        bouquetList.textContent = "No items available.";
    }
}

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        const nameError = document.getElementById("name-error");
        const emailError = document.getElementById("email-error");
        const messageError = document.getElementById("message-error");
        const formStatus = document.getElementById("form-status");

        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        formStatus.textContent = "";

        let formIsValid = true;

        if (name.value.trim() === "") {
            nameError.textContent = "Please enter your name.";
            formIsValid = false;
        }

        if (email.value.trim() === "") {
            emailError.textContent = "Please enter your email.";
            formIsValid = false;
        } else if (!email.checkValidity()) {
            emailError.textContent = "Please enter a valid email.";
            formIsValid = false;
        }

        if (message.value.trim() === "") {
            messageError.textContent = "Please enter a message.";
            formIsValid = false;
        }

        if (formIsValid) {
            settings.visitorName = name.value.trim();
            settings.lastVisit = new Date().toISOString();

            localStorage.setItem(settingsKey, JSON.stringify(settings));

            formStatus.textContent = "Your form is valid.";
        }
    });
}
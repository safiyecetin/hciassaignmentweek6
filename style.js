const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});

backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* ===== PORTFOLIO MESSENGER ===== */

const contactChat = document.getElementById("contactChat");
const chatToggle = document.getElementById("chatToggle");
const chatPanel = document.getElementById("chatPanel");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatTyping = document.getElementById("chatTyping");
const chatNotification = document.getElementById("chatNotification");

let chatAutoOpened = false;
let replyTimer = null;

function openChat() {
    chatPanel.classList.add("is-open");
    chatPanel.setAttribute("aria-hidden", "false");
    chatToggle.setAttribute("aria-expanded", "true");
    chatNotification.style.display = "none";

    requestAnimationFrame(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}

function closeChat() {
    chatPanel.classList.remove("is-open");
    chatPanel.setAttribute("aria-hidden", "true");
    chatToggle.setAttribute("aria-expanded", "false");
}

function checkPageBottom() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const isAtBottom = scrollPosition >= pageHeight - 5;

    contactChat.classList.toggle("is-visible", isAtBottom);

    if (isAtBottom && !chatAutoOpened) {
        chatAutoOpened = true;
        openChat();
    }

    if (!isAtBottom) {
        closeChat();
    }
}

function getCurrentTime() {
    return new Intl.DateTimeFormat([], {
        hour: "2-digit",
        minute: "2-digit"
    }).format(new Date());
}

function addMessage(text, type) {
    const row = document.createElement("div");
    row.className = `message-row ${type}`;

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = type === "received" ? "S" : "♡";

    const content = document.createElement("div");
    content.className = "message-content";

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";

    // Keep user messages as plain text, not HTML
    bubble.textContent = text;

    const time = document.createElement("span");
    time.className = "message-time";
    time.textContent = getCurrentTime();

    content.append(bubble, time);
    row.append(avatar, content);
    chatMessages.appendChild(row);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getDemoReply(message) {
    const text = message.toLowerCase();

    if (text.includes("hello") || text.includes("hi") ||
        text.includes("hey") || text.includes("привет")) {
        return "Hi! ♡ Thank you for stopping by my portfolio!";
    }

    if (text.includes("work") || text.includes("project") ||
        text.includes("работ")) {
        return "Thanks for your interest in my work! ✨ This is a demo chat for now.";
    }

    if (text.includes("contact") || text.includes("email") ||
        text.includes("связ")) {
        return "I'd love to connect! This demo isn't connected to my inbox yet, but we'll add that later ♡";
    }

    return "Thank you for your message! ♡ This is a demo reply. Real messaging will be added when the chat is connected to a server.";
}

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = chatInput.value.trim();

    if (!message) return;

    // Display the visitor's message
    addMessage(message, "sent");
    chatInput.value = "";
    chatInput.focus();

    // Show a simulated typing indicator
    chatTyping.hidden = false;
    chatMessages.scrollTop = chatMessages.scrollHeight;

    clearTimeout(replyTimer);

    replyTimer = setTimeout(() => {
        chatTyping.hidden = true;

        const reply = getDemoReply(message);
        addMessage(reply, "received");

        // Show a notification if the panel was closed
        if (!chatPanel.classList.contains("is-open")) {
            chatNotification.style.display = "block";
        }
    }, 900);
});

chatToggle.addEventListener("click", () => {
    if (chatPanel.classList.contains("is-open")) {
        closeChat();
    } else {
        openChat();
    }
});

chatClose.addEventListener("click", closeChat);

window.addEventListener("scroll", checkPageBottom, {
    passive: true
});

window.addEventListener("resize", checkPageBottom);

checkPageBottom();


const projectCards = document.querySelectorAll(".project-card");

const projectModal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTechnologies = document.getElementById("modalTechnologies");

const modalClose = document.getElementById("modalClose");
const modalDone = document.getElementById("modalDone");

const projectsInfo = [
    {
        title: "Personal Portfolio",
        description:
            "A personal portfolio website created to introduce myself, present my technical skills, and share my learning journey as a Computer Science student. The website includes an About Me section, a list of skills, project cards, and contact information.",
        technologies: "HTML, CSS, JavaScript"
    },
    {
        title: "My learning journey",
        description:
            "A collection of small projects and coding exercises created while learning programming. This section represents my progress, practical experience, and continuous development of problem-solving skills.",
        technologies: "Python, JavaScript, HTML, CSS"
    }
];

function openProjectModal(index) {
    const project = projectsInfo[index];

    if (!project) return;

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTechnologies.textContent = project.technologies;

    projectModal.classList.add("active");
    projectModal.setAttribute("aria-hidden", "false");

    modalClose.focus();
}

function closeProjectModal() {
    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");
}

projectCards.forEach((card, index) => {
    card.style.cursor = "pointer";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");

    card.addEventListener("click", () => {
        openProjectModal(index);
    });

    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProjectModal(index);
        }
    });
});

modalClose.addEventListener("click", closeProjectModal);
modalDone.addEventListener("click", closeProjectModal);

projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) {
        closeProjectModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        projectModal.classList.contains("active")
    ) {
        closeProjectModal();
    }
});

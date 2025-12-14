document.addEventListener("DOMContentLoaded", () => {
    let chatbotMode = null;
    let selectedService = null;
    let contactData = {};




    // Elements
    const aiBtn = document.getElementById("aiSupportBtn");
    const aiBox = document.getElementById("aiSupportBox");
    const aiClose = document.getElementById("aiCloseBtn");
    const aiInput = document.getElementById("aiInput");
    const aiSend = document.getElementById("aiSend");
    const aiChat = document.getElementById("aiChat");

    // Open chat
    aiBtn.addEventListener("click", () => {
        aiBox.style.display = "flex";
    });

    // Close chat
    aiClose.addEventListener("click", () => {
        aiBox.style.display = "none";
    });

    // Send message
    aiSend.addEventListener("click", sendMessage);
    aiInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
        const text = aiInput.value.trim();
        if (!text) return;

        // User message
        const userMsg = document.createElement("div");
        userMsg.className = "ai-message user";
        userMsg.textContent = text;
        aiChat.appendChild(userMsg);

        aiInput.value = "";
        aiChat.scrollTop = aiChat.scrollHeight;

        // Fake Gemini reply
        setTimeout(() => {
            const botMsg = document.createElement("div");
            botMsg.className = "ai-message bot";
            botMsg.innerHTML = getGeminiResponse(text);
            aiChat.appendChild(botMsg);
            aiChat.scrollTop = aiChat.scrollHeight;
        }, 600);
    }

    // Fake Gemini Brain
    function getGeminiResponse(message) {
        message = message.toLowerCase().trim();

        // ===========================
        // Step 1: Trigger services
        // ===========================
        if (message.includes("services")) {
            chatbotMode = "services";
            return (
                "🤿 Our Services:<br><br>" +
                "1️⃣ Scuba Diving Courses<br>" +
                "2️⃣ Liveaboard Diving Holidays<br>" +
                "3️⃣ Instructor Training Sessions<br>" +
                "4️⃣ Skills Development Workshops<br><br>" +
                "👉 Reply with <b>1–4</b> to continue."
            );
        }

        // ===========================
        // Step 2: Handle service selection
        // ===========================
        if (chatbotMode === "services") {
            chatbotMode = null;
            let serviceName = "";
            if (message === "1") serviceName = "Scuba Diving Courses";
            else if (message === "2") serviceName = "Liveaboard Diving Holidays";
            else if (message === "3") serviceName = "Instructor Training";
            else if (message === "4") serviceName = "Skills Development Workshops";
            else return "❌ Please reply with <b>1, 2, 3 or 4</b>.";

            chatbotMode = "packages"; // next step
            return `✅ ${serviceName} selected!<br><br>` +
                "💰 Would you like to see our <b>packages</b>?<br>" +
                "👉 Type <b>packages</b> to continue.";
        }

        // ===========================
        // Step 3: Show packages
        // ===========================
        if (chatbotMode === "packages" && message.includes("package")) {
            chatbotMode = "packageSelected";
            return (
                "💰 Our Packages:<br><br>" +
                "1️⃣ Beginner – $475<br>" +
                "2️⃣ Intermediate – $1130<br>" +
                "3️⃣ Advanced – $3450<br><br>" +
                "👉 Reply with <b>1–3</b> to see package details."
            );
        }

        // ===========================
        // Step 4: Package selection
        // ===========================
        if (chatbotMode === "packageSelected") {
            let packageDetails = "";
            if (message === "1") {
                packageDetails = "📦 Beginner Package - $475:<br>• 2 x recreational training courses<br>• 2 x open water diving sessions<br>• Free equipment hire<br>• 5% discount on equipment purchase";
            } else if (message === "2") {
                packageDetails = "📦 Intermediate Package - $1130:<br>• 2 x recreational training courses<br>• 4 x open water diving sessions<br>• Free equipment hire<br>• 10% discount on equipment purchase";
            } else if (message === "3") {
                packageDetails = "📦 Advanced Package - $3450:<br>• 1 x instructor training course<br>• 2 x skill development workshops<br>• 2 years free equipment servicing<br>• 20% discount on one liveaboard holiday<br>• Hotel-based diving holidays";
            } else {
                return "❌ Please reply with <b>1, 2 or 3</b>.";
            }

            chatbotMode = "contactPrompt"; // next step: contact
            return packageDetails + "<br><br>✅ If you want to get in touch, type <b>contact</b> to provide your details.";
        }

        // ===========================
        // Step 5: Contact trigger
        // ===========================
        if (chatbotMode === "contactPrompt" && message.includes("contact")) {
            chatbotMode = "contactFirstName";
            contactData = {}; // reset contact data
            return "📋 Let's get your details! What is your <b>first name</b>?";
        }

        // ===========================
        // Step 6: Step-by-step contact form
        // ===========================
        if (chatbotMode === "contactFirstName") {
            contactData.firstName = message;
            chatbotMode = "contactLastName";
            return "✅ Thanks! What is your <b>last name</b>?";
        }

        if (chatbotMode === "contactLastName") {
            contactData.lastName = message;
            chatbotMode = "contactPhone";
            return "📱 Please provide your <b>phone number</b>.";
        }

        if (chatbotMode === "contactPhone") {
            contactData.phone = message;
            chatbotMode = "contactEmail";
            return "✉️ Now, enter your <b>email address</b>.";
        }

        if (chatbotMode === "contactEmail") {
            contactData.email = message;
            chatbotMode = "contactAddress";
            return "🏢 Finally, provide your <b>address</b>.";
        }

        if (chatbotMode === "contactAddress") {
            contactData.address = message;
            chatbotMode = null; // reset mode

            // Here you can send `contactData` to server/email if needed

            return `✅ Thank you, <b>${contactData.firstName} ${contactData.lastName}</b>! We have received your details:<br>` +
                `• Phone: ${contactData.phone}<br>` +
                `• Email: ${contactData.email}<br>` +
                `• Address: ${contactData.address}<br><br>` +
                "We will contact you soon to confirm your booking or answer your inquiry. 🌊🤿";
        }

        // ===========================
        // Default fallback
        // ===========================
        if (message.includes("hi") || message.includes("hello")) {
            return "👋 Hi! Type <b>services</b> to explore what we offer.";
        }

        return "🤖 Type <b>services</b> to get started.";
    }

})

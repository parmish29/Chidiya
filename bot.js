const TelegramBot = require("node-telegram-bot-api");
const moment = require("moment");

// Your Telegram bot token
const token = "7307528853:AAGTaoRA1fFlFaOHGypIgkKDG7FofVv-NcQ";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Define the complex schedule
const schedule = {
    "02:00": "Sleeping",
    "09:00": "Bathing",
    "09:30": "Breakfast",
    "10:00": "Lunch",
    "11:00": "Listening to music",
    "12:00": "Learning",
    "14:00": "Working on the job",
    "23:00": "Dinner",
    "00:00": "Talking",
    "01:00": "Watching social media",
};

// Define availability messages based on the schedule
const availability = {
    Sleeping: "He is currently sleeping. Please try contacting him later. 😴",
    Bathing: "He is currently bathing. 🚿",
    Breakfast: "He is having breakfast. 🍳",
    Lunch: "He is having lunch. 🍲",
    "Listening to music": "He is listening to music. 🎧",
    Learning: "He is learning something new. 📚",
    "Working on the job": "He is working at his job. 💼",
    Dinner: "He is having dinner. 🍽️",
    Talking: "He is talking with someone. 🗣️",
    "Watching social media": "He is watching social media. 📱",
};

// Predefined responses about friends
const friendsResponses = {
    ravi: "Ravi? Haan, apna solid bhai hai! Kabhi bhi call kar lo, mil jaayega. 😄",
    satish: "Satish? Bahut hi dependable dost hai, ek call par hazir. 👍",
    sachin: "Sachin aur main toh purane dost hain, hamesha saath dete hain. 🤝",
    rahul: "Rahul? Energy ka powerhouse hai, hamesha ready for action! ⚡",
    naresh: "Naresh kaafi composed aur thoughtful hai, uska advice priceless hai. 🤔",
    pardeep: "Pardeep? Mast banda hai, hamesha chill mode mein! 😎",
    reetu: "Reetu? Bahut pyari dost hai, hamesha support karti hai. 😊",
    aayushman: "Aayushman? Super smart dost, hamesha kuch naya sochta hai. 💡",
    amit: "Amit? Hardworking aur focused hai, always on the grind. 💪",
    chidya: "Chidya? Haan, woh toh best friend hai, unique aur special! 😇",
    tum: "main chidiya abhi toh btaya tha"
};

// Predefined funny responses for personal questions
const funnyResponses = {
    girlfriend: "Girlfriend? Arre bhai, yeh toh classified information hai! 😏",
    marriage: "Shaadi ka kya hai, abhi toh kaam se shaadi hai. 😅",
    age: "Umr ke baare mein kya kehna, bas samajh lo young aur energetic! 😎",
    salary: "Salary? Arre bhai, woh toh secret hai, bilkul Coca-Cola ki recipe jaisa! 💸",
    favorite_food: "Favorite food? Pizza aur kuch nahi, lekin share nahi karega! 🍕",
    weekend_plan: "Weekend plan? Sona, Netflix, aur kabhi kabhi coding. 😴📺",
    crush: "Crush? Yeh baat sirf dil mein hai, kisi se share nahi! 😜",
    future_goal: "Future goal? Arre bhai, Elon Musk se milna hai! 🚀",
};

// Common keywords people ask about
const commonKeywords = {
    name: "Naam? Parmod Bishnoi, yaad rakhna! 😉",
    location: "Location? Chandigarh mein rehta hai, vaha ki hawa bohot fresh hai. 🌳",
    hobbies: "Hobbies? Coding, data science padhna, aur kabhi kabhi shows dekhna. 📺",
    future_plans: "Future plans? Data analytics industry mein dhamaka karna hai! 💥",
    current_mood: "Current mood? Thoda chill, thoda hustle. 😌💼",
    favorite_quote: "Favorite quote? 'Stay hungry, stay foolish!' 🧐",
};

// Predefined responses based on resume keywords
const responses = {
    profile:
        "MBA kiya hai Business Analytics mein, data-driven insights aur strategic thinking mein expert hai. 📊",
    experience:
        "YBI Foundation mein internship ki thi, data analytics aur machine learning pe kaam kiya. Python ka accha knowledge hai. 🐍",
    skills: "MS Excel, Google Sheets, Power BI, Tableau, Python, SQL... sab aata hai. 🔧",
    certifications:
        "SQL, Python, Data Analytics, Power BI Dashboards, aur Master Data Management ke certifications hain. 🎓",
    education:
        "MBA Business Analytics mein kiya hai, Haryana School of Business se. BSc bhi kiya hai PCM mein. 📚",
    projects:
        "Kaafi projects kiye hain, jisme Student Result Bot, Data Analysis, aur Customer Segmentation include hain. 🛠️",
    awards: "Debate, elevator pitch, aur corporate poster design mein awards mile hain. 🏆",
    contact:
        "Contact karna hai? Call ya email kar sakte ho. LinkedIn pe bhi connect kar lo. 📞",
};

// Start command handler
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
        chatId,
        "Hello! Main PB ki dost, kuch bhi puchho sab pta hai uski qualifications, experience, or skills. Uska current status bhi pta hai, sab pta hai! 😊",
    );
});

// Function to determine the current activity
function getCurrentActivity() {
    const currentTime = moment().format("HH:mm");

    // Find the latest time in the schedule that is less than or equal to the current time
    let activity = "Available";
    for (let time in schedule) {
        if (currentTime >= time) {
            activity = schedule[time];
        }
    }
    return activity;
}

// General message handler
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text.toLowerCase();

    // Ignore messages that are commands (e.g., "/start")
    if (msg.text.startsWith("/")) return;

    // Determine the current activity
    const currentActivity = getCurrentActivity();

    // Check if the user is asking about the current status
    if (
        userMessage.includes("current") ||
        userMessage.includes("status") ||
        userMessage.includes("available")
    ) {
        const responseMessage =
            availability[currentActivity] || "Haan, abhi contact kar sakte ho. 👍";
        bot.sendMessage(chatId, responseMessage);
    } else {
        // Check for questions about friends
        let responseMessage = "Pata nahi, yeh usne kabhi nahi bataya. 🥲";
        for (let keyword in friendsResponses) {
            if (userMessage.includes(keyword)) {
                responseMessage = friendsResponses[keyword];
                break;
            }
        }

        // Check for personal questions
        if (responseMessage.includes("🥲")) {
            for (let keyword in funnyResponses) {
                if (userMessage.includes(keyword)) {
                    responseMessage = funnyResponses[keyword];
                    break;
                }
            }

            // Check for specific questions about resume or common keywords
            if (responseMessage.includes("🥲")) {
                for (let keyword in responses) {
                    if (userMessage.includes(keyword)) {
                        responseMessage = responses[keyword];
                        break;
                    }
                }

                // If still no match, check common keywords
                if (responseMessage.includes("🥲")) {
                    for (let keyword in commonKeywords) {
                        if (userMessage.includes(keyword)) {
                            responseMessage = commonKeywords[keyword];
                            break;
                        }
                    }
                }
            }
        }

        // Send the response
        bot.sendMessage(chatId, responseMessage);
    }
});

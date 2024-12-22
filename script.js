const ideas = {
    "web app": [
        "scientific calculator",
        "weather app",
        "to-do list",
        "blog",
        "portfolio",
        "e-commerce",
        "profile pic maker",
        "chat app",
        "music player",
        "photo editor",
        "news app",
        "job portal",
        "e-learning",
        "quiz app",
        "poll/survey app",
        "calendar",
        "coding pets",
        "AI clone",
        "password generator (but password game)"
    ],
    software: [
        "watch app",
        "alarm",
        "text editor",
        "VSCode theme extension",
        "game engine",
        "programming language",
        "CLI",
        "cool nice IDE",
        "excel plugin",
        "desktop pet"
    ],
    game: [
        "banana gun",
        "swimming",
        "weird cat in a box",
        "duck hunt",
        "simulator",
        "weird scarecrow puzzle",
        "coding adventure",
        "race to eat cookies",
        "stupid adventure game",
        "roguelike",
        "platformer",
        "rhythm game",
        "Beijing(corn) farmer",
        "pay to win",
        "geoguesser"
    ],
    hardware: [
        "smart mirror",
        "PCB keychain",
        "AI hardware",
        "IoT farming thing",
        "music player",
        "radio(blahaj) circut",
        "smart Home",
        "smart Glasses",
        "electric generating shoes",
        "cap for the blind",
        "3D printer"
    ],
    backend: [
        "Telegram bot",
        "Slack bot",
        "Discord bot",
        "Minecraft server with mod",
        "API about donuts",
        "Minecraft server on RaspPi 5",
        "login form"
    ],
};

const additionals = [
    "is retro themed",
    "involves NASA API",
    "has something about your friends",
    "is dark themed",
    "uses Inter font",
    "is chaotic",
    "is minimalistic",
    "has a tamagotchi-pet mechanism",
    "has a chatbot",
    "resembles your favourite anime character",
    "has a spooky easter egg",
    "is high seas themed",
    "is christmas themed",
    "has the world's uglist color scheme",
    "is visually un-seeable",
    "is centered around a big (not red) button",
    "has a hidden game",
    "has a secret message",
    "is Gen Z themed",
    "is all italics"
];

function randomPrompt() {
    const categories = Object.keys(ideas);
    const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
    const randomIdea =
        ideas[randomCategory][
        Math.floor(Math.random() * ideas[randomCategory].length)
        ];
    const randomAdditional =
        additionals[Math.floor(Math.random() * additionals.length)];

    return `Create a <span>${randomIdea}</span> (${randomCategory}) that <span>${randomAdditional}</span>.`;
}

const buttonImg = document.getElementById("animate");
const output = document.getElementById("output");

document.getElementById("generate").addEventListener("click", () => {
    let isThink = true;
    output.innerHTML = "";
    const intervalId = setInterval(() => {
        buttonImg.src = isThink
            ? "think1.png"
            : "think2.png";
        isThink = !isThink;
    }, 200);

    setTimeout(() => {
        clearInterval(intervalId);
        buttonImg.src = "normal.png";
        const promptText = randomPrompt();
        
        const temp = document.createElement('div');
        temp.innerHTML = promptText;
        
        output.innerHTML = "";
        
        const nodes = Array.from(temp.childNodes);
        let currentNodeIndex = 0;
        let currentCharIndex = 0;
        
        const typeInterval = setInterval(() => {
            if (currentNodeIndex < nodes.length) {
                const currentNode = nodes[currentNodeIndex];
                
                if (currentNode.nodeType === Node.TEXT_NODE) {
                    if (currentCharIndex < currentNode.textContent.length) {
                        output.appendChild(document.createTextNode(currentNode.textContent[currentCharIndex]));
                        currentCharIndex++;
                    } else {
                        currentNodeIndex++;
                        currentCharIndex = 0;
                    }
                } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
                    output.appendChild(currentNode.cloneNode(true));
                    currentNodeIndex++;
                }
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
    }, 3000);
});

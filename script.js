let selectedIngredients = [];
let countdownInterval; // To store the countdown interval

const soapTypes = {
    basic: [
        { name: "Olive Oil", amount: 350, unit: "g" },
        { name: "Coconut Oil", amount: 300, unit: "g" },
        { name: "Shea Butter", amount: 200, unit: "g" },
        { name: "Castor Oil", amount: 100, unit: "g" },
        { name: "Sweet Almond Oil", amount: 50, unit: "g" },
        { name: "Lye Mixture", isHeader: true },
        { name: "Ice", amount: 130, unit: "g" },
        { name: "Water", amount: 131, unit: "g" },
        { name: "Lye", amount: 140, unit: "g" }
    ],
    moisturizing: [],
    exfoliating: []
};

function showSoapType(type) {
    const content = document.getElementById("soap-content");
    if (!content) return;

    if (type === "basic") {
        selectedIngredients = soapTypes.basic;
        content.innerHTML = `
            <h2>Basic Soap Recipe</h2>
            <p>How many loaves are you making?</p>
            <input type="number" id="loaf-count" value="1" min="1">
            <button onclick="calculateIngredients()">Scale Ingredients</button>
            <h3 class="mt-4">Ingredients Checklist</h3>
            <ul id="ingredient-list"></ul>
            <div id="timer-container" class="mt-4" style="display: none;">
                <p id="countdown-timer"></p>
                <button onclick="handleCooled()" class="btn btn-custom">Cooled</button>
                <button onclick="restartCountdown()" class="btn btn-custom">Still Hot</button>
            </div>
        `;
        calculateIngredients();
    } else if (type === "moisturizing") {
        content.innerHTML = `<h2>Moisturizing Soap</h2><p>Coming Soon!</p>`;
    } else if (type === "exfoliating") {
        content.innerHTML = `<h2>Exfoliating Soap</h2><p>Coming Soon!</p>`;
    }
}

function calculateIngredients() {
    const loafCount = document.getElementById('loaf-count').value || 1;
    const ingredientList = document.getElementById('ingredient-list');
    ingredientList.innerHTML = '';

    selectedIngredients.forEach((ingredient, index) => {
        if (ingredient.isHeader) {
            const headerItem = document.createElement('li');
            headerItem.className = 'header-item';
            headerItem.textContent = ingredient.name;
            ingredientList.appendChild(headerItem);
        } else {
            const scaledAmount = ingredient.amount * loafCount;
            const listItem = document.createElement('li');
            listItem.className = 'ingredient';
            listItem.innerHTML = `
                <input type="checkbox" id="ingredient-${index}" onchange="updateChecklist(${index})">
                <label for="ingredient-${index}">
                    ${scaledAmount} ${ingredient.unit} of ${ingredient.name}
                </label>
            `;
            ingredientList.appendChild(listItem);
        }
    });
}

function updateChecklist(index) {
    const checkbox = document.getElementById(`ingredient-${index}`);
    const label = checkbox.nextElementSibling;

    if (checkbox.checked) {
        label.style.textDecoration = "line-through";
        label.style.color = "gray";
    } else {
        label.style.textDecoration = "none";
        label.style.color = "black";
    }

    checkLyeCompletion(); // Check if the ice, water, and lye are all checked
}

function checkLyeCompletion() {
    const iceCheckbox = document.getElementById('ingredient-6'); // Ice
    const waterCheckbox = document.getElementById('ingredient-7'); // Water
    const lyeCheckbox = document.getElementById('ingredient-8'); // Lye

    if (iceCheckbox && iceCheckbox.checked && waterCheckbox && waterCheckbox.checked && lyeCheckbox && lyeCheckbox.checked) {
        startCountdown(); // Start the timer
    } else {
        clearCountdown(); // Clear timer if any checkbox is unchecked
    }
}

function startCountdown() {
    clearCountdown(); // Clear any existing timer
    const timerContainer = document.getElementById('timer-container');
    const countdownTimer = document.getElementById('countdown-timer');
    let timeLeft = 15 * 60; // 15 minutes in seconds

    timerContainer.style.display = "block"; // Show the timer container

    countdownInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownTimer.textContent = `Time Remaining: ${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownTimer.textContent = "Time's up!";
        }

        timeLeft--;
    }, 1000); // Update every second
}

function clearCountdown() {
    clearInterval(countdownInterval); // Clear the timer
    const timerContainer = document.getElementById('timer-container');
    timerContainer.style.display = "none"; // Hide the timer container
}

function restartCountdown() {
    startCountdown(); // Restart the countdown
}

function handleCooled() {
    clearCountdown(); // Stop the timer
    alert("The lye mixture has cooled. Proceed to the next step!");
}

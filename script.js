// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQSsBCbJPnbIDGV9RPL5l9GlyEAWkmDqs",
    authDomain: "soap-opera-c8c84.firebaseapp.com",
    projectId: "soap-opera-c8c84",
    storageBucket: "soap-opera-c8c84.appspot.com",
    messagingSenderId: "984513742394",
    appId: "1:984513742394:android:ce051a91c3afa047865703"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Optional: Initialize Firebase Analytics
if (typeof firebase.analytics === "function") {
    const analytics = firebase.analytics();
    console.log("Firebase Analytics Initialized");
}

// Base ingredients for 1 loaf (1000g total weight)
const baseIngredients = [
    { name: "Olive Oil", amount: 350, unit: "g" },
    { name: "Coconut Oil", amount: 300, unit: "g" },
    { name: "Shea Butter", amount: 200, unit: "g" },
    { name: "Castor Oil", amount: 100, unit: "g" },
    { name: "Sweet Almond Oil", amount: 50, unit: "g" }
];

function calculateIngredients() {
    const loafCount = document.getElementById('loaf-count').value;
    const ingredientList = document.getElementById('ingredient-list');
    ingredientList.innerHTML = ''; // Clear the list

    // Scale ingredients and populate checklist
    baseIngredients.forEach((ingredient, index) => {
        const scaledAmount = ingredient.amount * loafCount;
        const listItem = document.createElement('li');
        listItem.className = 'ingredient';
        listItem.innerHTML = `
            <input type="checkbox" id="ingredient-${index}" onchange="updateChecklist()">
            <label for="ingredient-${index}">
                ${scaledAmount} ${ingredient.unit} of ${ingredient.name}
            </label>
        `;
        ingredientList.appendChild(listItem);
    });
}

function updateChecklist() {
    const ingredients = document.querySelectorAll('.ingredient');
    const completionMessage = document.getElementById('completion-message');
    let allChecked = true;

    ingredients.forEach(ingredient => {
        const checkbox = ingredient.querySelector('input[type="checkbox"]');
        if (!checkbox.checked) {
            allChecked = false;
        }
    });

    // Show the completion message if all are checked
    completionMessage.style.display = allChecked ? 'block' : 'none';
}

// Initial calculation for 1 loaf
calculateIngredients();

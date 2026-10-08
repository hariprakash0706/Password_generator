const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lowercase = "abcdefghijklmnopqrstuvwxyz";

const numbers = "0123456789";

const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";


// Get HTML elements

const passwordInput = document.getElementById("password");

const lengthInput = document.getElementById("length");

const lengthValue = document.getElementById("lengthValue");

const uppercaseCheckbox = document.getElementById("uppercase");

const lowercaseCheckbox = document.getElementById("lowercase");

const numbersCheckbox = document.getElementById("numbers");

const symbolsCheckbox = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");

const copyBtn = document.getElementById("copyBtn");

const copyMessage = document.getElementById("copyMessage");

const errorMessage = document.getElementById("errorMessage");

const strengthText = document.getElementById("strengthText");

const strengthFill = document.getElementById("strengthFill");


// Update password length display

lengthInput.addEventListener("input", function () {

    lengthValue.textContent = lengthInput.value;

});


// Generate Password Function

function generatePassword() {

    const length = Number(lengthInput.value);

    let characters = "";

    // Clear previous error

    errorMessage.textContent = "";

    // Add selected character types

    if (uppercaseCheckbox.checked) {
        characters += uppercase;
    }

    if (lowercaseCheckbox.checked) {
        characters += lowercase;
    }

    if (numbersCheckbox.checked) {
        characters += numbers;
    }

    if (symbolsCheckbox.checked) {
        characters += symbols;
    }


    // Check if at least one option is selected

    if (characters.length === 0) {

        errorMessage.textContent =
            "Please select at least one character type.";

        passwordInput.value = "";

        strengthText.textContent = "None";

        strengthFill.style.width = "0%";

        return;
    }


    // Generate password

    let password = "";

    for (let i = 0; i < length; i++) {

        const randomIndex =
            Math.floor(Math.random() * characters.length);

        password += characters[randomIndex];
    }


    // Display password

    passwordInput.value = password;


    // Calculate password strength

    calculateStrength(password);
}


// Password Strength Function

function calculateStrength(password) {

    let score = 0;


    // Check password length

    if (password.length >= 8) {
        score++;
    }

    if (password.length >= 12) {
        score++;
    }


    // Check uppercase

    if (/[A-Z]/.test(password)) {
        score++;
    }


    // Check lowercase

    if (/[a-z]/.test(password)) {
        score++;
    }


    // Check numbers

    if (/[0-9]/.test(password)) {
        score++;
    }


    // Check symbols

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }


    // Display strength

    if (score <= 2) {

        strengthText.textContent = "Weak";

        strengthText.style.color = "#ef4444";

        strengthFill.style.width = "25%";

        strengthFill.style.background = "#ef4444";

    }

    else if (score <= 4) {

        strengthText.textContent = "Medium";

        strengthText.style.color = "#f59e0b";

        strengthFill.style.width = "50%";

        strengthFill.style.background = "#f59e0b";

    }

    else if (score <= 5) {

        strengthText.textContent = "Strong";

        strengthText.style.color = "#22c55e";

        strengthFill.style.width = "75%";

        strengthFill.style.background = "#22c55e";

    }

    else {

        strengthText.textContent = "Very Strong";

        strengthText.style.color = "#06b6d4";

        strengthFill.style.width = "100%";

        strengthFill.style.background = "#06b6d4";

    }
}


// Generate button

generateBtn.addEventListener("click", generatePassword);


// Copy password

copyBtn.addEventListener("click", async function () {

    const password = passwordInput.value;


    if (password === "") {

        copyMessage.textContent = "Generate a password first.";

        copyMessage.style.color = "#ef4444";

        return;
    }


    try {

        await navigator.clipboard.writeText(password);

        copyMessage.textContent = "Password copied!";

        copyMessage.style.color = "#22c55e";

    }

    catch (error) {

        copyMessage.textContent =
            "Unable to copy password.";

        copyMessage.style.color = "#ef4444";
    }

});
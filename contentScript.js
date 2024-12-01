console.log("Content script loaded");

const loginPageURL = "https://el2019.kimep.kz/login/index.php";
const mainPageURL = "https://el2019.kimep.kz";

const loginSpan = document.querySelector(".login");

if (loginSpan && window.location.href !== loginPageURL) {
    console.log("User is logged out. Redirecting to login page...");
    window.location.href = loginPageURL;
} else if (window.location.href === loginPageURL) {
    console.log("Performing login process...");

    fetch(chrome.runtime.getURL('.credentials.js'))
        .then(response => response.text())
        .then(credentialsScript => {
            eval(credentialsScript); // Load credentials into this script

            // `username` and `password` variables are now available
            const usernameField = document.querySelector("input[name='username']");
            const passwordField = document.querySelector("input[name='password']");
            const loginButton = document.querySelector("button[type='submit']");

            if (usernameField && passwordField && loginButton) {
                usernameField.value = username;
                passwordField.value = password;

                // Submit the login form
                loginButton.click();
            } else {
                console.log("One or more login elements not found");
            }
        })
        .catch(error => console.error("Error loading credentials:", error));
} else if (window.location.href === mainPageURL) {
    // User is on the main page and logged in
    console.log("Already on the main page");
} else {
    console.log("No action required");
}

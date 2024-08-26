import { auth, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from '../firebase.js';

// Access DOM elements
const [loginEmail, loginPassword] = document.querySelectorAll("form input");
const loginBtn = document.getElementById("loginBtn");
const forgot = document.getElementById("forgot");
const loader = document.getElementById("loader");
const btnText = document.getElementById("btnText");

loader.style.display = "none"; // Initially hide the loader

// Define the loginUser function
const loginUser = (event) => {
    event.preventDefault(); // Prevent default form submission
    loader.style.display = "block"; // Show loader
    btnText.innerText = "Logging In"; // Update button text

    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
        .then((userCredential) => {
            // Signed in 
            loader.style.display = "none"; // Hide loader
            btnText.innerText = "Login"; // Reset button text
            Toastify({
                text: "You're Logged In",
                duration: 3000
            }).showToast();

            setTimeout(() => {
                window.location.href = "../dashboard/dashboard.html";
            }, 2000);
        })
        .catch((error) => {
            loader.style.display = "none"; // Hide loader
            btnText.innerText = "Login"; // Reset button text
            Toastify({
                text: error.message,
                duration: 3000,
                backgroundColor: "red"
            }).showToast();
        });
}

// Attach event listener to login button
loginBtn.addEventListener("click", loginUser);

// Handle sign-up redirection
const gotosignup = document.getElementById("gotosignup");
gotosignup.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "../SignUp/signup.html";
});

// Redirect if user is already authenticated
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "../dashboard/dashboard.html";
    }
});

// Handle password reset
forgot.addEventListener("click", () => {
    sendPasswordResetEmail(auth, loginEmail.value)
        .then(() => {
            Toastify({
                text: "Password reset email sent!",
                duration: 3000
            }).showToast();
        })
        .catch((error) => {
            Toastify({
                text: `Error: ${error.message}`,
                duration: 3000,
                backgroundColor: "red"
            }).showToast();
        });
});

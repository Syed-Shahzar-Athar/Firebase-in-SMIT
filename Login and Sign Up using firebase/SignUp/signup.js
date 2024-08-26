import { auth, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from '../firebase.js';

let formFields = document.querySelectorAll("form input");
const [userEmail, userPassword] = formFields;

let gotologin = document.getElementById("gotologin");
let signUpBtn = document.getElementById("btnPrimary");
let loader = document.getElementById("loader");
let btnText = document.getElementById("btnText");
let google = document.getElementById("google");

const provider = new GoogleAuthProvider();

loader.style.display = "none"; // Initially hide the loader

const signUp = (event) => {
    event.preventDefault();
    loader.style.display = "block"; // Show loader
    btnText.innerText = "Signing Up"; // Update button text

    createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
        .then((userCredential) => {
            // Signed up
            loader.style.display = "none"; // Hide loader
            btnText.innerText = "Sign Up"; // Reset button text
            const user = userCredential.user;
            Toastify({
                text: "You're Signed Up",
                duration: 3000
            }).showToast();
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = "../Login/login.html";
            }, 2000);
        })
        .catch((error) => {
            loader.style.display = "none"; // Hide loader
            btnText.innerText = "Sign Up"; // Reset button text
            const errorMessage = error.message;
            Toastify({
                text: `${errorMessage}`,
                duration: 3000,
                backgroundColor: "red"
            }).showToast();
        });
};

const googleSignUp = () => {
    event.preventDefault();
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });

}
google.addEventListener("click", googleSignUp)

const jumptoLogin = (event) => {
    event.preventDefault();
    window.location.href = "../Login/login.html";
};

signUpBtn.addEventListener("click", signUp);
gotologin.addEventListener("click", jumptoLogin);

onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "../dashboard/dashboard.html";
    }
});

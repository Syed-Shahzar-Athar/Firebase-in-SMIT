import { auth, signOut, onAuthStateChanged } from '../firebase.js';
import { db, collection, addDoc } from '../firebase.js';
import { storage, ref, uploadBytes, getDownloadURL } from '../firebase.js';

// Logout handling
document.getElementById("logout").addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            Toastify({
                text: "You have successfully logged out.",
                duration: 3000
            }).showToast();
            window.location.href = "../Login/login.html";
        })
        .catch((error) => {
            Toastify({
                text: `Error: ${error.message}`,
                duration: 3000,
                backgroundColor: "red",
            }).showToast();
        });
});

// Authentication check
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../index.html";
    }
});

// Form validation and submission
document.getElementById('blogForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission

    // Clear previous error messages
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';

    // Get form fields
    const blogTitle = document.getElementById('blogTitle').value.trim();
    const blogCategory = document.getElementById('blogCategory').value.trim();
    const blogDescription = document.getElementById('blogDescription').value.trim();
    const blogImage = document.getElementById('blogImage').files[0]; // Get the selected file
    const authorName = document.getElementById('authorName').value.trim();
    let publishBtn = document.getElementById("publishBtn");

    // Check if any field is empty
    if (blogTitle === '' || blogCategory === '' || blogDescription === '' || !blogImage || authorName === '') {
        errorMessage.textContent = 'Please fill in all fields before submitting.';
        setTimeout(() => {
            errorMessage.textContent = '';
        }, 2000);
        return; // Exit the function early
    }

    // Function to publish the blog
    async function publishTheBlog() {
        try {
            publishBtn.innerText = "Publishing..."

            // Upload image to Firebase Storage
            const storageRef = ref(storage, `blogImages/${blogImage.name}`);
            const snapshot = await uploadBytes(storageRef, blogImage);
            const imageUrl = await getDownloadURL(snapshot.ref);

            // Add the blog details to Firestore
            const docRef = await addDoc(collection(db, "blogs"), {
                title: blogTitle,
                category: blogCategory,
                description: blogDescription,
                author: authorName,
                imageUrl: imageUrl // Save the image URL in Firestore
            });
            console.log("Document written with ID: ", docRef.id);

            // Show success message
            Toastify({
                text: "Blog successfully published!",
                duration: 3000
            }).showToast();
        } catch (e) {
            console.error("Error adding document: ", e);
            // Show error message
            Toastify({
                text: `Error: ${e.message}`,
                duration: 3000,
                backgroundColor: "red",
            }).showToast();
        }
        finally {
            publishBtn.innerText = "Publish the Blog"
        }
    }

    publishTheBlog();

    // Clear form fields (optional)
    this.reset();
});

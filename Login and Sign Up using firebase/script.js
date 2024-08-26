import { db, collection, getDocs } from '../firebase.js';

let indexLogin = document.getElementById("indexLogin");

const jumptoLogin = () => {
    window.location.href = "./Login/login.html";
}

indexLogin.addEventListener("click", jumptoLogin);

// Cards Scripting

let cardContainer = document.getElementById("card-container");

const getBlog = async () => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    let cardsHtml = '';
    
    querySnapshot.forEach((doc) => {
        const { title, category, description, imageUrl, author } = doc.data();
        cardsHtml += `
        <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
          <div class="card">
            <img src="${imageUrl}" class="card-img-top" alt="Blog Image">
            <div class="card-body">
              <h2 class="card-title"><strong>Title:</strong> ${title}</h2>
              <p class="card-text"><strong>Category:</strong> ${category}</p>
              <p class="card-text"><strong>Description:</strong> ${description}</p>
              <p class="card-text"><strong>Author:</strong> ${author}</p>
            </div>
          </div>
        </div>`;
    });

    cardContainer.innerHTML = cardsHtml;
}
getBlog();

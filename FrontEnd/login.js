// Création de la fonction de connexion  
async function sendId() {
    const formId = document.querySelector(".login__form");
    const errorMessage = document.querySelector(".error-message");
  
    // Vérification de la présence du formulaire
    if (formId) {
      formId.addEventListener("submit", async function (event) {
        event.preventDefault();
  
        // Récupération des valeurs du formulaire d'identification
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
  
        const user = {
          email: email,
          password: password
        };
  
        try {
          // Appel de la fonction fetch avec toutes les informations nécessaires
          const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
          });
  
          // Vérification de la réponse 
          if (response.status === 401) {
            errorMessage.textContent = "Erreur, mot de passe incorrect.";
            errorMessage.style.display = "block";
          } else if (response.status === 404) {
                errorMessage.textContent = "Erreur, utilisateur inconnu.";
                errorMessage.style.display = "block";
          } else if (response.ok) {
            // Si la réponse est réussie, extraction des données en JSON
            const result = await response.json();
  
            // Vérification du token 
            if (result && result.token) {
              // Stockage du token dans le local storage
              localStorage.setItem("token", result.token);
  
              // Redirection vers la page d'accueil
              window.location.href = "index.html";
  
              // Changement du texte du lien une fois connecté
              deconnect();
            }
          }
        } catch (error) {
          // Message en cas d'erreurs de requête ou de connexion 
          console.error("Erreur lors de la requête d'authentification:", error);
        }
      });
    }
  }
  
  // Création de la fonction de déconnexion 
  function deconnect() {
    const loginLink = document.querySelector(".login-logout");
  
    if (loginLink) {
      // Vérification si le token est déjà stocké dans le local storage
      if (localStorage.getItem("token")) {
  
        // Changement du texte du lien "login" en "logout"
        loginLink.textContent = "logout";
  
        // Déconnexion lors du clique sur "logout"
        loginLink.addEventListener("click", function (event) {
          event.preventDefault();
  
          // Suppression du token du local storage
          localStorage.removeItem("token");
  
          // Redirection vers la page d'identification 
          window.location.href = "login.html";
        });
      }
    }
  }
  
  // les fonctions sont exécutées lorsque la page est entièrement chargée
  document.addEventListener("DOMContentLoaded", function () {
    sendId();
    deconnect();
  });
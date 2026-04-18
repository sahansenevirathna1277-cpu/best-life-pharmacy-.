// auth.js
// Firebase Authentication Configuration (Placeholder for production)
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

/*
  To use real Firebase instead of the local storage mock below:
  1. Create a Firebase project at console.firebase.google.com
  2. Enable Email/Password authentication.
  3. Replace the config below with your keys:
  
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT",
    //...
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
*/

document.addEventListener('DOMContentLoaded', () => {

    const userBtn = document.getElementById('user-btn');
    const authModalEl = document.getElementById('authModal');
    const authForm = document.getElementById('authForm');
    const authTitle = document.getElementById('authTitle');
    const toggleAuthMode = document.getElementById('toggleAuthMode');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    
    // Create BS Modal instance if exists
    let bsAuthModal;
    if (authModalEl) {
        bsAuthModal = new bootstrap.Modal(authModalEl);
    }
  
    let isLoginMode = true;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
    // Update UI based on auth state
    function updateNavbar() {
        if (!userBtn) return;
        if (currentUser) {
            userBtn.innerHTML = `<i class="fa-solid fa-user-check text-success"></i>`;
            userBtn.title = `Logged in as ${currentUser.email}`;
            userBtn.dataset.bsToggle = ""; // Remove modal toggle
            userBtn.dataset.bsTarget = "";
            userBtn.onclick = () => {
                if(confirm("Do you want to sign out?")) {
                    localStorage.removeItem('currentUser');
                    currentUser = null;
                    updateNavbar();
                    alert("Logged out successfully");
                }
            };
        } else {
            userBtn.innerHTML = `<i class="fa-regular fa-user"></i>`;
            userBtn.title = `User Account`;
            userBtn.dataset.bsToggle = "modal";
            userBtn.dataset.bsTarget = "#authModal";
            userBtn.onclick = null;
        }
    }
  
    updateNavbar();
  
    // Toggle Login / Sign Up UI
    if (toggleAuthMode) {
        toggleAuthMode.addEventListener('click', (e) => {
            e.preventDefault();
            isLoginMode = !isLoginMode;
            if (isLoginMode) {
                authTitle.innerText = "Sign In";
                authSubmitBtn.innerText = "Login";
                toggleAuthMode.innerHTML = "Don't have an account? <b>Sign Up</b>";
            } else {
                authTitle.innerText = "Create Account";
                authSubmitBtn.innerText = "Register";
                toggleAuthMode.innerHTML = "Already have an account? <b>Sign In</b>";
            }
        });
    }
  
    // Handle Form Submit (Mock LocalStorage Database for now)
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('authEmail').value;
            const password = document.getElementById('authPassword').value;
            
            // Basic localStorage mockup for authentication
            const usersDb = JSON.parse(localStorage.getItem('usersDb')) || {};
            
            if (isLoginMode) {
                // Login Flow
                if (usersDb[email] && usersDb[email] === password) {
                    currentUser = { email };
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    bsAuthModal.hide();
                    updateNavbar();
                    alert(`Welcome back, ${email}!`);
                } else {
                    alert("Invalid email or password!");
                }
            } else {
                // Register Flow
                if (usersDb[email]) {
                    alert("Account already exists with this email!");
                } else {
                    usersDb[email] = password;
                    localStorage.setItem('usersDb', JSON.stringify(usersDb));
                    currentUser = { email };
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    bsAuthModal.hide();
                    updateNavbar();
                    alert("Registration successful! You are now logged in.");
                }
            }
        });
    }
  });

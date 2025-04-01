import { userLogin } from "./hooks.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async(event) => {
        event.preventDefault(); 
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email && password) {
          const response = await userLogin( email, password );
          if(response.code === 200) {
            window.location.href = './pages/home/index.html'
          }
            console.log("Login efetuado com sucesso:", { email, password });
        } else {
            console.log("Preencha todos os campos antes do login.");
        }
    });
});
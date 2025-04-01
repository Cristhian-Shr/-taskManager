import { registerUser } from "../../js/hooks.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); 
        const nome = document.getElementById("email").value;
        const senha = document.getElementById("password").value;

        if (nome && senha) {
            try {
                await registerUser({ nome, senha });
                window.location.href = '../../index.html';
            } catch (error) {
                console.error("Erro ao cadastrar:", error);
            }
        } else {
            alert("Preencha todos os campos antes de cadastrar.");
        }
    });
});

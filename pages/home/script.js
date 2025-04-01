import {
    criarTarefa,
    atualizarTarefa,
    deletarTarefa,
    listarTarefas,
  } from "../../js/hooks.js";
  
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await listarTarefas();
      response.data.forEach((tarefa) => {
        addTaskList(tarefa);
      });
    } catch (error) {
      console.error("Erro ao listar tarefas:", error);
    }
  });
  
  document.getElementById("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("taskTitle").value;
  
    if (title.trim() !== "") {
      try {
        const response = await criarTarefa(title);
        addTaskList(response.data);
        document.getElementById("taskTitle").value = "";
      } catch (error) {
        console.error("Erro ao criar tarefa:", error);
      }
    }
  });
  
  function addTaskList(tarefa) {
    const taskList = document.getElementById("taskList");
    // taskList.addEventListener('click', () => {

    // })
    const li = document.createElement("li");
    li.classList.add(
      "bg-gray-700",
      "text-white",
      "p-2",
      "rounded",
      "mb-2",
      "flex",
      "justify-between",
      "items-center"
    );
  
    const textTask = document.createElement("span");
    textTask.textContent = tarefa.tarefa;
  
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add(
      "bg-yellow-500",
      "text-white",
      "px-2",
      "py-1",
      "rounded",
      "mr-2",
      "hover:bg-yellow-600"
    );
    editButton.addEventListener("click", () =>
      editTask(li, textTask, tarefa.codigo)
    );
  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.classList.add(
      "bg-red-500",
      "text-white",
      "px-2",
      "py-1",
      "rounded",
      "hover:bg-red-600"
    );
    deleteButton.addEventListener("click", async () => {
      try {
        await deletarTarefa(tarefa.codigo);
        li.remove();
      } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
      }
    });
  
    const buttonContainer = document.createElement("div");
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
  
    li.appendChild(textTask);
    li.appendChild(buttonContainer);
    taskList.appendChild(li);
  }
  
  async function editTask(li, textTask, codigo) {
    const newTitle = prompt("Editar tarefa:", textTask.textContent);
    if (newTitle && newTitle.trim() !== "") {
      try {
        await atualizarTarefa(codigo, { tarefa: newTitle }); 
        textTask.textContent = newTitle;
      } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
      }
    }
  }
  
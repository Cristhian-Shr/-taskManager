const API_URL = 'https://back-end-teste-facilita-system.vercel.app';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

// login
export const registerUser = async ({ nome, senha }) => {
  try {
    const response = await api.post('/api/register', { nome, senha });
    alert('Usuário cadastrado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário:');
  }
};

export const userLogin = async ( login, senha ) => {
  try {
    const response = await api.post('/api/login', { nome: login, senha });
    alert('Login realizado com sucesso:', response.data.data.token);
    sessionStorage.setItem('token', response.data.data.token)
    return response.data;
  } catch (error) {
    console.error('Erro ao realizar login:');
    alert(error.response.data.message)
  }
};

// tarefas
export const criarTarefa = async (title) => {
  try {
    alert('token', sessionStorage.getItem('token'));
    const response = await api.post('/tarefas', { tarefa: title }, {
      headers: {
        token: sessionStorage.getItem('token'),
      }
    });
    alert('Tarefa criada:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar tarefa:');
  }
};

export const listarTarefas = async () => {
  try {
    const response = await api.get('/tarefas', {
      headers: {
        token: sessionStorage.getItem('token'),
      }
    });
    console.log('Tarefas:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar tarefas:');
  }
};

export const atualizarTarefa = async (id, dados) => {
  try {
    const response = await api.put(`/tarefas/${id}`, dados, {
      headers: {
        token: sessionStorage.getItem('token')
      }
    });
    alert('Tarefa atualizada:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar tarefa:');
  }
};

export const deletarTarefa = async (id) => {
  try {
    await api.delete(`/tarefas/${id}`, {
        headers: {
          token: sessionStorage.getItem('token')
        }
    });
    alert('Tarefa deletada');
  } catch (error) {
    console.error('Erro ao deletar tarefa:');
  }
};

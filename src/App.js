import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "./services/api";


function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    try{
    const response = await api.post('/repositories', {
    title: `Desafio Node.js ${Date.now()}`,
    url: "http://github.com/...",
    techs: "[Node.js, ...]"   
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
    }
    catch(error) {
      alert( 'Erro ao adicionar repositório, tente novamente')
    }
  }

  async function handleRemoveRepository(id) {
    try{
    await api.delete(`/repositories/${id}`,{});

    setRepositories(repositories.filter(repository => repository.id !== id));
    }
    catch(error){
      alert( 'Erro ao deletar repositório, tente novamente')
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => <li key={repository.id}>{repository.title}
          
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li> )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

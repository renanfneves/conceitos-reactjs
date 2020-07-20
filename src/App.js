import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleGetRepositories() {
    try {
      const repos = await api.get("repositories");
     
      setRepositories([ ...repos.data ]);
      
    } catch (error) {
      console.log("handleAddRepository getRepositories -> error", error)
    }
  }

  async function handleAddRepository() {
    try {
      const someRandom = Math.random().toString().substring(2, 8);

      const repo = {
        title: `Repository_${someRandom}`,
        url: `www.gitrepo.com/${someRandom}`,
        techs: [
          `tech_${someRandom}_1`,
          `tech_${someRandom}_2`,
        ]
      }
     
      const response = await api.post("repositories", repo);

      setRepositories([ ...repositories, response.data ]);

    } catch (error) {
      console.log("handleRemoveRepository -> error", error)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      
      const repos = repositories.filter(repo => repo.id !== id);
      
      setRepositories([ ...repos ]);
      
    } catch (error) {
      console.log("handleRemoveRepository -> error", error)
    }
  }

  useEffect(() => {
    handleGetRepositories();
  }, []);

  return (
    <div className="container">
      <button onClick={handleAddRepository} className="add-button">Adicionar</button>
      <ul data-testid="repository-list">
        {
          repositories.map(repo => (
            <li key={repo.id} className="repo-item">
              <span className="repo-title">{repo.title}</span>
              <button onClick={() => handleRemoveRepository(repo.id)} className="delete-button">
                Remover
              </button>
            </li>
          ))
        }
      </ul>

    </div>
  );
}

export default App;

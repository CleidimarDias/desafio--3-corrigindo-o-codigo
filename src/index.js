const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository)

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const updatedRepository = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  console.log(repositoryIndex)

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }
  const repository = { ...repositories[repositoryIndex], ...updatedRepository };
  repositories[repositoryIndex] = repository;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  console.log(repositoryIndex);

  const repository = repositories.find((repository) => repository.id === id);
  if (!repository) {
    response.status(404).json({ Error: "repository not found" })
  }
  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }
  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories[repositoryIndex].likes++;

  return response.status(201).json(repositories[repositoryIndex]);
});

module.exports = app;

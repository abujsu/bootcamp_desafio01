const express = require("express");

const server = express();

server.use(express.json());

function checkProjectIDExists(req, res, next) {
  const { id } = req.params;

  req.project = projects.find(x => x.id === id);
  req.id = id;

  if (!req.project) {
    return res.status(400).json({ error: "Project does not exist" });
  }

  return next();
}

function countRequest(req, res, next) {
  countReq += 1;

  console.log(`${countReq} resquests.`);

  return next();
}

var countReq = 0;

const projects = [
  {
    id: "0",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  },
  {
    id: "1",
    title: "Projeto teste",
    tasks: ["Tarefa teste"]
  }
];

// Listar todos os projetos
server.get("/projects", countRequest, (req, res) => {
  return res.json(projects);
});

//Criar projeto
server.post("/projects", countRequest, (req, res) => {
  const { id, title } = req.body;

  const newProject = {
    id: id,
    title: title,
    tasks: []
  };

  projects.push(newProject);

  return res.json(projects);
});

//Nova tarefa
server.post("/projects/:id/tasks", countRequest, checkProjectIDExists, (req, res) => {
    const { title } = req.body;
    const { project } = req;

    project.tasks.push(title);

    return res.json(project);
  }
);

//Alterar título do projeto
server.put("/projects/:id", countRequest, checkProjectIDExists, (req, res) => {
  const { title } = req.body;
  const { project } = req;

  project.title = title;

  return res.json(project);
});

//Deletar projeto
server.delete("/projects/:id", countRequest, checkProjectIDExists, (req, res) => {
    const index = projects.indexOf(req.project);

    projects.splice(index, 1);

    return res.json(projects);
  }
);

server.listen(3000);

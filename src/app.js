const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.send(repositories)
});

app.post("/repositories", (request, response) => {
  request.body.id = uuid();
  request.body.likes = 0;
  repositories.push(request.body)
  response.send(request.body)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repIndex = repositories.findIndex( rep => rep.id === id )

  console.log(repIndex)

  if (repIndex < 0) {
    return response.status(400).json({
      success: "false",
      error: "Repository not found"
    })
  }

  repositories[repIndex].title = title,
  repositories[repIndex].url = url,
  repositories[repIndex].techs = techs

  return response.send(repositories[repIndex])

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  const repIndex = repositories.findIndex( rep => rep.id === id )

  if (repIndex < 0) {
    return response.status(400).json({
      success: "false",
      error: "Repository not found"
    })
  }

  repositories.splice(repIndex, 1)

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params;
  
  const repIndex = repositories.findIndex( rep => rep.id === id )

  if (repIndex < 0) {
    return response.status(400).json({
      success: "false",
      error: "Repository not found"
    })
  }

  repositories[repIndex].likes += 1;

  return response.send({likes: repositories[repIndex].likes})

});

module.exports = app;

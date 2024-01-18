const express = require("express");
const app = express();
app.use(express.json());

const port = 9000;
var toDoDB = [];
var currentId = 0;

function addToDo(title, desc) {
  const toDoObj = {
    id: currentId,
    title: title,
    description: desc,
  };
  toDoDB.push(toDoObj);
  currentId++;
}

function updateToDo(id, title = "", desc = "") {
  const newArr = [];
  for (let i = 0; i < toDoDB.length; i++) {
    if (toDoDB[i].id !== id) {
      newArr.push(toDoDB[i]);
    } else {
      let todo = toDoDB[i];

      if (title !== "") {
        todo.title = title;
      }

      if (desc !== "") {
        todo.description = desc;
      }

      newArr.push(todo);
    }
  }
  toDoDB = newArr;
}

function deleteToDo(id) {
  const newArr = [];
  for (let i = 0; i < toDoDB.length; i++) {
    if (toDoDB[i].id !== id) {
      newArr.push(toDoDB[i]);
    }
  }
  toDoDB = newArr;
}

addToDo("wash", "wash the clothes");
addToDo("study", "study hpc");

app.get("/todo", function (req, res) {
  res.send({ data: toDoDB });
});

app.post("/todo", function (req, res) {
  const title = req.body.title;
  const desc = req.body.desc;
  addToDo(title, desc);
  res.send("added to db");
});

app.put("/todo", function (req, res) {
  const id = req.body.id;
  const title = req.body.title;
  const desc = req.body.desc;
  updateToDo(id, title, desc);
  res.send(toDoDB);
});

app.delete("/todo", function (req, res) {
  const id = req.body.id;
  deleteToDo(id);
  res.send(toDoDB);
});

function letMeKnow() {
  console.log("server started  at port" + port);
}

app.listen(port, letMeKnow);

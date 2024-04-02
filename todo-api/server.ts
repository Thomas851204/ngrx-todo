import express, { Request, Response } from "express";
import cors from "cors";
class Todo {
  static currentId = 0;
  id: number;
  name: string;
  done: boolean;

  constructor(name: string, done: boolean) {
    this.id = Todo.currentId++;
    this.name = name;
    this.done = done;
  }
}

const todos: Todo[] = [];

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/todos", (req: Request, res: Response) => {
  res.send(todos);
});

app.get("/todos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    res.send(todo);
  } else {
    res.status(404).send({ message: "Todo not found" });
  }
});

app.post("/todos", (req: Request, res: Response) => {
  const id = todos.length + 1;
  const todo = new Todo(req.body.name, false);
  todos.push(todo);
  res.send(todo);
});

app.put("/todos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  let todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo = Object.assign(todo, req.body);
    res.send(todo);
  } else {
    res.status(404).send({ message: "Todo not found" });
  }
});

app.delete("/todos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.send({ message: "Todo deleted" });
  } else {
    res.status(404).send({ message: "Todo not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

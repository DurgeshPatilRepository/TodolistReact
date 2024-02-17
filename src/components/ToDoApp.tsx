import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Tooltip,
} from "@mui/material";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date; 
};


const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All");
  
    const addTodo = (text: string): void => {
        const newTodo: Todo = {
          id: todos.length + 1,
          text,
          completed: false,
          createdAt: new Date(), // Set creation date
        };
        setTodos([...todos, newTodo]);
      };
      
    const toggleTodo = (id: number): void => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };
  
    const toggleAll = (): void => {
      const allCompleted = todos.every((todo) => todo.completed);
      setTodos(todos.map((todo) => ({ ...todo, completed: !allCompleted })));
    };
  
    const filteredTodos = (): Todo[] => {
      switch (filter) {
        case "Active":
          return todos.filter((todo) => !todo.completed);
        case "Completed":
          return todos.filter((todo) => todo.completed);
        default:
          return todos;
      }
    };
  
    return (
      <Paper style={{ width: 400, padding: 20 }}>
        <Input
          type="text"
          placeholder="Add a new task"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
              addTodo(e.currentTarget.value.trim());
              e.currentTarget.value = "";
            }
          }}
        />
        <h3>{filter}</h3>
        <List>
        {filteredTodos().map((todo) => (
           <Tooltip key={todo.id} title={todo.createdAt ? `Created: ${todo.createdAt.toLocaleString()}` : 'Created date not available'}>
           <ListItem
              disablePadding
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <ListItemText primary={todo.text} />
            </ListItem>
          </Tooltip>
        ))}
      </List>  
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
          <Button variant="outlined" onClick={() => setFilter("All")}>
            All
          </Button>
          <Button variant="outlined" onClick={() => setFilter("Active")}>
            Active
          </Button>
          <Button variant="outlined" onClick={() => setFilter("Completed")}>
            Completed
          </Button>
          <Button variant="outlined" onClick={toggleAll}>
            Select All
          </Button>
        </div>
        <div>
          <Typography variant="body2" style={{ marginTop: 10 }}>
            {filter === "Completed" ? (
              `Tasks remain: ${todos.length - todos.filter((todo) => todo.completed).length}`
            ) : filter === "Active" ? (
              `Tasks left: ${todos.filter((todo) => !todo.completed).length}`
            ) : todos.length === 0 ? (
              ""
            ) : (
              `Tasks count: ${todos.length}`
            )}
          </Typography>
        </div>
      </Paper>
    );
  };
  
  export default TodoList;
  
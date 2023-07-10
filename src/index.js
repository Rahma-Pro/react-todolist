import React from 'react';
import ReactDOM from 'react-dom';
import "./App.css";
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { BsListCheck } from 'react-icons/bs';

function App() {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setEdit] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function removeTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEdit(null);
  }

  return (
    <div className="container">
      
      <h1> <BsListCheck /> Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter new task" 
        onChange={(e) => setTodo(e.target.value)} 
        value={todo}/>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id) }
            />
            {todo.id === todoEditing ? (
              <input
                type="text" placeholder="Edit"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit</button>
            ) : (
              <TiEdit
          onClick={() => setEdit(todo.id)}
          className='edit-icon'
        />
        )}
            <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
          </div>
        </div> 
        
      ))}
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('root'))

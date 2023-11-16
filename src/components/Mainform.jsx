import { useEffect, useState } from "react";
import styles from '../styles/Mainform.module.css'

const Mainform = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  // boolean state to know if we are editing (this will let us display
  // different inputs based on a condition (conditional rendering)
  const [isEditing, setIsEditing] = useState(false);
  // object state to set so we know which todo item we are editing
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  // function to get the value of the edit input and set the new state
  function handleEditInputChange(e) {
    // set the new state value to what's currently in the edit input box
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim()
        }
      ]);
    }

    setTodo("");
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  // function to edit a todo item
  function handleUpdateTodo(id, updatedTodo) {
    // here we are mapping over the todos array - the idea is check if the todo.id matches the id we pass into the function
    // if the id's match, use the second parameter to pass in the updated todo object
    // otherwise just use old todo
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    // set editing to false because this function will be used inside a onSubmit function - which means the data was submited and we are no longer editing
    setIsEditing(false);
    // update the todos state with the updated todo
    setTodos(updatedItem);
  }

  // function to handle when the "Edit" button is clicked
  function handleEditClick(todo) {
    // set editing to true
    setIsEditing(true);
    // set the currentTodo to the todo item that was clicked
    setCurrentTodo({ ...todo });
  }

  return (
    <div className={styles.app}>
      {/* We need to conditionally render different inputs based on if we are in editing mode */}
      {isEditing ? (
        // if we are editing - display the edit todo input
        // make sure to add the handleEditFormSubmit function in the "onSubmit" prop
        <form onSubmit={handleEditFormSubmit}>
          {/* also added a label for the input */}
          <label htmlFor="editTodo" className={styles.addTodo}>Edit todo: </label><br></br>
          {/* notice that the value for the update input is set to the currentTodo state */}
          {/* also notice the handleEditInputChange is being used */}
          <input
            name="editTodo"
            type="text"
            placeholder="Edit todo"
            value={currentTodo.text}
            onChange={handleEditInputChange}
            className={styles.inputTodo}
          />
          {/* here we added an "update" button element - use the type="submit" on the button which will still submit the form when clicked using the handleEditFormSubmit function */}
          <button type="submit" className={styles.add}>Update</button>
          {/* here we added a "Cancel" button to set isEditing state back to false which will cancel editing mode */}
          <button onClick={() => setIsEditing(false)} className={styles.add}>Cancel</button>
        </form>
      ) : (
        // if we are not editing - display the add todo input
        // make sure to add the handleFormSubmit function in the "onSubmit" prop
        <form onSubmit={handleFormSubmit}>
          {/* also added a label for the input */}
          <label htmlFor="todo" className={styles.addTodo}>Add To-Do: </label><br></br>
          {/* notice that the value is still set to the todo state */}
          {/* also notice the handleInputChange is still the same */}
          <input
            name="todo"
            type="text"
            placeholder="Create a new todo"
            value={todo}
            className={styles.inputTodo}
            onChange={handleInputChange}
          />
          {/* here we just added a "Add" button element - use the type="submit" on the button which will still submit the form when clicked using the handleFormSubmit function */}
          <button type="submit" className={styles.add}>Add</button>
        </form>
      )}
      <h3 className={styles.addTodo}>To-Do List: </h3>
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className={styles.todoText}>{todo.text}</div>
            {/* we are passing the entire todo object to the handleEditClick function*/}
            <div>
            <button onClick={() => handleEditClick(todo)} className={styles.edit}>Edit</button>
            <button onClick={() => handleDeleteClick(todo.id)} className={styles.delete}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Mainform;
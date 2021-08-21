import './App.css';
import Todo from './Todo/Todo.js';
import React, { useEffect } from 'react';
import Context from './context';
import Loader from './Loader/Loader';

const AddTodo = React.lazy(() => new Promise(resolve => {
  setTimeout(()=> {
    resolve(import('./Todo/AddTodo'))
  } , 1500)
}))

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 2999)
      })
  }, [])
  

  function toggleTodo(id){
    setTodos(
      todos.map(todo => {
        if(todo.id === id){
          todo.completed = !todo.completed;
        }
        return todo;
      })
    )
    
  }

  function removeTodo(id){
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function addTodo(title){
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false,
    }]))
  }

  return (
    <Context.Provider value={ { removeTodo } }>
      <div className="container text-center">
        <h1 className="text-primary">React Todo 📝</h1>

        <React.Suspense fallback={''}>
          <AddTodo onCreate={ addTodo } />
        </React.Suspense>

        { loading && <Loader/> }

        { todos.length ? <Todo todos={ todos } onToggle={ toggleTodo } /> : loading ? null : <div className="container text-center text-primary">Nothing to do 🎉</div>}

        
      </div>
    </Context.Provider>
  );
}

export default App;

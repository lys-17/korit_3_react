import './App.css'
import { useState, useEffect, use } from 'react';
import type { Todo } from './types/Todo';
import TodoForm from "./components/TodoForm"
import {TodoList} from "./components/TodoList"
import { addTodoApi, getAllTodos } from './services/todoService';
// import { v4 as uuid } from 'uuid';

function App() {
  const [ todos, setTodos ] = useState<Todo[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodosFromServer = async () : Promise<void> => {
      try{
        setIsLoading(true);
        const serverTodos = await getAllTodos();
        setTodos(serverTodos);
      } catch (error) {
        console.log('서버에서 데이터를 가지고 오는 데 실패했습니다 :', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodosFromServer();
  },[]);

  const handleAddTodo = async (text: string): Promise<void> {
    try {
      setIsLoading(true);
      const newTodo = await addTodoApi(text);
      setTodos(prevTodos => [...prevTodos, newTodo]);
    } catch (error) {
      console.log('todo를 추가하는 데 실패했습니다 : ', error);
    }
  }

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  } 

  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed } : todo );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo}/>
      {/* //Todoform -> 투두를 입력하면 */}
      <TodoList todos={todos} onToggleComplete={toggleComplete} onDeleteTodo={deleteTodo}/>
    </div>
  )
}

export default App

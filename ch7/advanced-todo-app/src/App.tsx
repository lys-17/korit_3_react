import './App.css'
import TodoForm from './components/TodoForm';
import {v4 as uuid} from "uuid";
import type { Todo } from './types/Todo';
import TodoList from './components/TodoList';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from './hooks/useLocalStorage';
import "./i18n/18n";

const App: React.FC = () => {
  const { t, i18n} = useTranslation();

  const changeLanguage = (lang:string) => {
    i18n.changeLanguage(lang);
  }

  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const addTodo = (text:string) => {
    const newTodo: Todo = {
      id: uuid(),
      text,
      completed:false,
    };

    const updatedTodos = [...todos, newTodo];
    console.log("newTodo --->", updatedTodos);
    setTodos(updatedTodos);
  }; 

  const deleteTodo = (id:string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id:string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? {...todo, completed: !todo.completed}: todo);
    setTodos(updatedTodos);
  }

  return (
    <div>
      <h1>{t('app_title')}</h1>
      <div>
        <button onClick={()=> changeLanguage('en')}>English</button>
        <button onClick={()=> changeLanguage('de')}>German</button>
      </div>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todos={todos} onDeleteTodo={deleteTodo} onToggleComplete= {toggleComplete}/>
    </div>
  );
};

export default App;

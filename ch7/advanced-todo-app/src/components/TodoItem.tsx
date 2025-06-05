import type { Todo } from "../types/Todo";
import { useTranslation } from 'react-i18next';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id:string) => void;
  onDeleteTodo: (id:string) => void;
}

const TodoItem: React.FC<TodoItemProps> = (props:TodoItemProps) => {
  const { t } = useTranslation();
  const {todo, onToggleComplete, onDeleteTodo} = props;
  
  return (
    <li className={`todo-item $ {todo.completd ? 'completed': ''}`}>
    <span onClick= {() => onToggleComplete(todo.id)}>{todo.text}</span>
    <button onClick= {() =>onDeleteTodo(todo.id)}> {t('delete_button')} </button>
    </li>
  );
};

export default TodoItem;
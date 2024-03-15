import { createEmitter } from '../../../utils/createEmitter';
import { Todo } from '../infra/entities/todo_entity';

const TodoEvent = createEmitter<{
  todoAdded: Todo;
  todoUpdated: Todo;
  todoRemoved: Todo;
  todoChecked: Todo;
  todoUnchecked: Todo;
}>();

export { TodoEvent };

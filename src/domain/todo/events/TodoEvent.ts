import { createEmitter } from '../../../utils/createEmitter';
import { TodoVo } from '../infra/entities/TodoVo';

const TodoEvent = createEmitter<{
  todoAdded: TodoVo;
  todoUpdated: TodoVo;
  todoRemoved: TodoVo;
  todoChecked: TodoVo;
  todoUnchecked: TodoVo;
}>();

export { TodoEvent };

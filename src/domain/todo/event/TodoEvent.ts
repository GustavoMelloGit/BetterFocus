import { createEmitter } from "../../../utils/createEmitter";
import { Todo } from "../types/Todo";

const TodoEvent = createEmitter<{
    todoAdded: Todo
    todoUpdated: Todo
    todoRemoved: Todo
    todoChecked: Todo
    todoUnchecked: Todo
}>()

export { TodoEvent }
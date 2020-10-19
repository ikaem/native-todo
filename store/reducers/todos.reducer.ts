import Todo, { TodoModelInterface } from "../../models/todo.model";
import {
  AddTodoActionInterface,
  SetPendingTodosActionInterface,
  EditTodoActionInterface,
  ArchiveTodoActionInterface,
  ARCHIVE_TODO,
  SET_PENDING_TODOS,
  ADD_TODO,
  EDIT_TODO,
} from "../actions/todos.actions";

export interface TodosStateInterface {
  allTodos: TodoModelInterface[];
  pending: TodoModelInterface[];
  completed: TodoModelInterface[];
}

type todosReducerActionTypes =
  | SetPendingTodosActionInterface
  | AddTodoActionInterface
  | EditTodoActionInterface
  | ArchiveTodoActionInterface;

const initialState: TodosStateInterface = {
  allTodos: [],
  pending: [],
  completed: [],
};

const todosReducer = (
  state: TodosStateInterface = initialState,
  action: todosReducerActionTypes
) => {
  switch (action.type) {
    case SET_PENDING_TODOS:
      const newSPTPending = action.payload;

      const newState = {
        ...state,
        pending: newSPTPending,
        allTodos: [...state.allTodos, ...newSPTPending],
      };
      return newState;

    case ADD_TODO:
      const { payload: newATTodo } = action;

      const newATTodos = [...state.allTodos, newATTodo].sort((a, b) => (a.todoDate > b.todoDate ? 1 : -1));

      return {
        ...state,
        allTodos: newATTodos,
      };

    case EDIT_TODO:
      const {
        todoId: newETTodoId,
        todoTitle: newETTodoTitle,
        todoDate: newETTodoDate,
        todoDescripton: newETTodoDescription,
        todoNotes: newETTodoNotes,
        isCompleted: newETIsCompleted,
      } = action.payload;

      try {
        const oldETTodoIndex = state.allTodos.findIndex(
          (todo) => todo.todoId === newETTodoId
        );

        if (oldETTodoIndex < 0) throw new Error("No such todo");

        const newETTodo = new Todo(
          newETTodoId,
          newETTodoTitle,
          newETTodoDate,
          newETTodoDescription,
          newETTodoNotes,
          newETIsCompleted
        );

        const newETTodos = [...state.allTodos];
        newETTodos[oldETTodoIndex] = newETTodo;

        return {
          ...state,
          allTodos: newETTodos,
        };
      } catch (error) {
        console.log(error);
        return state;
      }

    case ARCHIVE_TODO:
      const newArcTTodoID = action.payload;

      try {
        const deletedArchTTodoIndex = state.allTodos.findIndex(
          (todo) => todo.todoId === newArcTTodoID
        );

        if (deletedArchTTodoIndex < 0) throw new Error("No such todo");

        const newArcTAllTodos = [...state.allTodos];
        newArcTAllTodos.splice(deletedArchTTodoIndex, 1);

        console.log("spliced todo", newArcTAllTodos);

        return {
          ...state,
          allTodos: newArcTAllTodos,
        };
      } catch (error) {
        console.log(error);
        return state;
      }

    default:
      return state;
  }
};

export default todosReducer;

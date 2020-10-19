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
      const { payload } = action;
      const newState = {
        ...state,
        pending: payload,

        // .sort((a, b) => (b.todoDate > a.todoDate ? 1 : -1));
      };
      return newState;

    case ADD_TODO:
      const { payload: newTodo } = action;

      const newATPending = [...state.pending, newTodo];

      return {
        ...state,
        pending: newATPending,
      };

    case EDIT_TODO:
      const {
        todoId: newETTodoId,
        todoTitle: newETTodoTitle,
        isCompleted: newETIsCompleted,
      } = action.payload;

      try {
        const oldETTodoIndex = state.pending.findIndex(
          (todo) => todo.todoId === newETTodoId
        );

        if (oldETTodoIndex < 0) throw new Error("No such todo");

        const newETTodo = new Todo(
          newETTodoId,
          newETTodoTitle,
          newETIsCompleted
        );

        const newETTodoPending = [...state.pending];
        newETTodoPending[oldETTodoIndex] = newETTodo;

        return {
          ...state,
          pending: newETTodoPending,
        };
      } catch (error) {
        console.log(error);
        return state;
      }

    case ARCHIVE_TODO:
      const newArcTTodoID = action.payload;

      try {
        const deletedArchTTodoIndex = state.pending.findIndex(
          (todo) => todo.todoId === newArcTTodoID
        );

        if (deletedArchTTodoIndex < 0) throw new Error("No such todo");

        const newArcTPending = [...state.pending];
        newArcTPending.splice(deletedArchTTodoIndex, 1);

        console.log("spliced todo", newArcTPending);

        return {
          ...state,
          pending: newArcTPending,
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

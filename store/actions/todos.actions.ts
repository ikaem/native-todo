import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootStateType } from "../store.provider";

import { todos } from "../../data/fake-data";
import Todo, { TodoModelInterface } from "../../models/todo.model";
import { TodoNoteInterface } from "../../screens/todo-edit.screen";

type SET_PENDING_TODOS_IDENTIFIER = "SET_PENDING_TODOS";
type ADD_TODO_IDENTIFIER = "ADD_TODO";
type EDIT_TODO_IDENTIFIER = "EDIT_TODO";
type ARCHIVE_TODO_IDENTIFIER = "ARCHIVE_TODO";

export interface SetPendingTodosActionInterface {
  type: SET_PENDING_TODOS_IDENTIFIER;
  payload: TodoModelInterface[];
}

export interface AddTodoActionInterface {
  type: ADD_TODO_IDENTIFIER;
  payload: TodoModelInterface;
}

export interface ThunkAddTodoActionArgs {
  todoTitle: string;
  todoDescription: string;
  todoDate: Date;
  todoNotes: TodoNoteInterface[];
}

export interface EditTodoActionInterface {
  type: EDIT_TODO_IDENTIFIER;
  payload: TodoModelInterface;
}

export interface ThunkEditTodoActionArgs extends ThunkAddTodoActionArgs {
  todoId: string;
  isCompleted: boolean;
}

export interface ArchiveTodoActionInterface {
  type: ARCHIVE_TODO_IDENTIFIER;
  payload: string;
}

export const SET_PENDING_TODOS: SET_PENDING_TODOS_IDENTIFIER =
  "SET_PENDING_TODOS";
export const ADD_TODO: ADD_TODO_IDENTIFIER = "ADD_TODO";
export const EDIT_TODO: EDIT_TODO_IDENTIFIER = "EDIT_TODO";
export const ARCHIVE_TODO: ARCHIVE_TODO_IDENTIFIER = "ARCHIVE_TODO";

const setTodos = (
  pendingTodos: TodoModelInterface[]
): SetPendingTodosActionInterface => {
  return {
    type: SET_PENDING_TODOS,
    payload: pendingTodos,
  };
};

export const thunkSetPendingTodos = (): ThunkAction<
  void,
  RootStateType,
  unknown,
  Action<SET_PENDING_TODOS_IDENTIFIER>
> => {
  return async (dispatch) => {
    const pendingTodos = todos
      .filter((todo) => {
        return !todo.isCompleted;
      })
      .sort((a, b) => (a.todoDate > b.todoDate ? 1 : -1));
    dispatch(setTodos(pendingTodos));
  };
};

const addTodo = (newTodo: TodoModelInterface): AddTodoActionInterface => {
  return {
    type: ADD_TODO,
    payload: newTodo,
  };
};

export const thunkAddTodo = (
  todoData: ThunkAddTodoActionArgs
): ThunkAction<void, RootStateType, unknown, Action<ADD_TODO_IDENTIFIER>> => {
  return async (dispatch) => {
    const newTodo = new Todo(
      new Date().toISOString(),
      todoData.todoTitle,
      todoData.todoDate,
      todoData.todoDescription,
      todoData.todoNotes,
      false
    );

    dispatch(addTodo(newTodo));
  };
};

const editTodo = (editedTodo: TodoModelInterface): EditTodoActionInterface => {
  return {
    type: EDIT_TODO,
    payload: editedTodo,
  };
};

export const thunkEditTodo = (
  todoData: ThunkEditTodoActionArgs
): ThunkAction<void, RootStateType, unknown, Action<EDIT_TODO_IDENTIFIER>> => {
  return async (dispatch) => {
    const editedTodo = new Todo(
      todoData.todoId,
      todoData.todoTitle,
      todoData.todoDate,
      todoData.todoDescription,
      todoData.todoNotes,
      todoData.isCompleted
    );
    dispatch(editTodo(editedTodo));
  };
};

const archiveTodo = (todoId: string): ArchiveTodoActionInterface => {
  return {
    type: ARCHIVE_TODO,
    payload: todoId,
  };
};

export const thunkArchiveTodo = (
  todoId: string
): ThunkAction<
  void,
  RootStateType,
  unknown,
  Action<ARCHIVE_TODO_IDENTIFIER>
> => {
  return async (dispatch) => {
    dispatch(archiveTodo(todoId));
  };
};

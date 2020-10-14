import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootStateType } from "../store.provider";

import { todos } from "../../data/fake-data";
import { TodoModelInterface } from "../../models/todo.model";

type SET_PENDING_TODOS_IDENTIFIER = "SET_PENDING_TODOS";
export interface SetPendingTodosActionType {
  type: SET_PENDING_TODOS_IDENTIFIER;
  payload: TodoModelInterface[];
}

export const SET_PENDING_TODOS: SET_PENDING_TODOS_IDENTIFIER =
  "SET_PENDING_TODOS";

const setTodos = (
  pendingTodos: TodoModelInterface[]
): SetPendingTodosActionType => {
  return {
    type: SET_PENDING_TODOS,
    payload: pendingTodos,
  };
};

export const thunkSetTodos = (): ThunkAction<
  void,
  RootStateType,
  unknown,
  Action<string>
> => {
  return async (dispatch) => {
    const pendingTodos = todos.filter((todo) => {
      return !todo.isCompleted;
    });

    dispatch(setTodos(pendingTodos));
  };
};

import { TodoModelInterface } from "../../models/todo.model";
import {
  SetPendingTodosActionType,
  SET_PENDING_TODOS,
} from "../actions/todos.actions";

export interface TodosStateInterface {
  pending: TodoModelInterface[];
  completed: TodoModelInterface[];
}

type todosReducerActionTypes = SetPendingTodosActionType;

const initialState: TodosStateInterface = {
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
      };
      return newState;

    default:
      return state;
  }
};

export default todosReducer;

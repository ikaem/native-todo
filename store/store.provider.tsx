import React from "react";
import { View, Text } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import todosReducer from "./reducers/todos.reducer";

const rootReducer = combineReducers({
  todos: todosReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const StoreProvider: React.FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;

export type RootStateType = ReturnType<typeof rootReducer>;

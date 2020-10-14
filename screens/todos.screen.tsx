import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { RootStateType } from "../store/store.provider";
import { DefaultTodosScreenProps } from "./screen-types";
import * as todosActions from "../store/actions/todos.actions";
import { Dispatch } from "redux";

interface TodosScreenProps extends DefaultTodosScreenProps {}

const fetchMatchingTodos = (routeName: string, dispatch: Dispatch<any>) => {
  switch (routeName) {
    case "PendingTodosScreen":
      dispatch(todosActions.thunkSetTodos());
      return;
    case "CompletedTodosScreen":
      dispatch(todosActions.thunkSetTodos());
      return;
    default:
      return;
  }
};

const TodosScreen: React.FC<TodosScreenProps> = ({ navigation, route }) => {
  const { name: routeName } = route;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMatchingTodos(routeName, dispatch);
  }, [routeName]);

  const todos = useSelector((state: RootStateType) => {
    switch (routeName) {
      case "PendingTodosScreen":
        return state.todos.pending;
      case "CompletedTodosScreen":
        return state.todos.completed;
      default:
        return [];
    }
  });

  console.log(todos);

  return (
    <View style={styles.screen}>
      <Text>Todos Screen</Text>
    </View>
  );
};

export default TodosScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

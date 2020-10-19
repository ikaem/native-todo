import React, { useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";

import { RootStateType } from "../store/store.provider";
import { DefaultTodosScreenProps } from "./screen-types";
import * as todosActions from "../store/actions/todos.actions";
import Colors from "../constants/colors.constants";

import TodoItem from "../components/todos/todo-item.component";

interface TodosScreenProps extends DefaultTodosScreenProps {}

const setMatchingTodos = (routeName: string, dispatch: Dispatch<any>) => {
  switch (routeName) {
    case "PendingTodosScreen":
      dispatch(todosActions.thunkSetPendingTodos());
      return;
    case "CompletedTodosScreen":
      // dispatch(todosActions.thunkSetTodos());
      return;
    default:
      return;
  }
};

const TodosScreen: React.FC<TodosScreenProps> = ({ navigation, route }) => {
  const { name: routeName } = route;
  const dispatch = useDispatch();

  useEffect(() => {
    setMatchingTodos(routeName, dispatch);
  }, [routeName]);

  const todos = useSelector((state: RootStateType) => {
    switch (routeName) {
      case "PendingTodosScreen":
        return state.todos.allTodos.filter(
          (todo) => todo.isCompleted === false
        );
      case "CompletedTodosScreen":
        return state.todos.allTodos.filter((todo) => todo.isCompleted === true);
      default:
        return state.todos.allTodos;
    }
  });

  const onHandleArchiveTodo = (todoId: string) => {
    dispatch(todosActions.thunkArchiveTodo(todoId));
  };

  const onNavigateToTodoDetailed = (todoId: string) => {
    navigation.navigate("PendingTodoDetailedScreen", {
      todoId,
    });
  };

  const onArchiveTodo = (todoId: string) => {
    console.log("Archiving todo...");
  };

  const onCompleteTodo = (todoId: string) => {
    console.log("Completing todo...");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.todosContainer}>
        <View style={styles.todosSummary}>
          <Text style={styles.todosCount}>{"7"}</Text>
          <Text style={styles.todosContext}> Todos today</Text>
        </View>

        <FlatList
          contentContainerStyle={styles.todoList}
          data={todos}
          keyExtractor={(todo) => todo.todoId}
          renderItem={({ item }) => {
            return (
              <TodoItem
                item={item}
                onNavigateToTodoDetailed={onNavigateToTodoDetailed}
                onArchiveTodo={onArchiveTodo}
                onCompleteTodo={onCompleteTodo}
                onHandleArchiveTodo={onHandleArchiveTodo}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default TodosScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.pale,
  },
  todosContainer: {
    width: "100%",
  },
  todosSummary: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  todosCount: {
    fontSize: 90,
    fontWeight: "700",
  },
  todosContext: {
    fontSize: 24,
    marginBottom: 16,
  },
  todoList: {
    width: "100%",
    marginVertical: 10,
    paddingBottom: 150,
  },
});

import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import { RootStateType } from "../store/store.provider";
import { DefaultTodosScreenProps } from "./screen-types";
import * as todosActions from "../store/actions/todos.actions";
import Colors from "../constants/colors.constants";

interface TodosScreenProps extends DefaultTodosScreenProps {}

const setMatchingTodos = (routeName: string, dispatch: Dispatch<any>) => {
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
    setMatchingTodos(routeName, dispatch);
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
              <TouchableOpacity
                style={styles.todoItem}
                onPress={() => navigation.navigate("PendingTodoDetailedScreen")}
              >
                <View
                  style={{ ...styles.todoItemDate, ...styles.todoItemSection }}
                >
                  <Text style={{ color: "white", fontSize: 24 }}>{"16"}</Text>
                  <Text style={{ color: "white", textTransform: "uppercase" }}>
                    {"January"}
                  </Text>
                  <Text style={{ color: "white" }}>{"2020"}</Text>
                </View>
                <View
                  style={{
                    ...styles.todoItemSummary,
                    ...styles.todoItemSection,
                  }}
                >
                  <Text style={styles.todoItemTitle}>{item.todoTitle}</Text>
                  <Text style={styles.todoItemDescription}>
                    {"Desscription, cut off...."}
                  </Text>
                  <Text style={styles.todoItemNoteCount}>
                    {"&"} {"3"} other notes
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.todoItemActions,
                    ...styles.todoItemSection,
                  }}
                >
                  <View style={styles.todoItemActionArchive}>
                    <Text
                      style={{ color: "white", textTransform: "uppercase" }}
                    >
                      Archive
                    </Text>
                  </View>
                  <View style={styles.todoItemActionDone}>
                    <Text
                      style={{ color: "white", textTransform: "uppercase" }}
                    >
                      Done
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
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
  },
  todoItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.gray,
    marginVertical: 10,
    elevation: 1,
  },
  todoItemSection: {
    // padding: 5,
  },
  todoItemDate: {
    padding: 5,
    flex: 0.2,
    alignItems: "center",
    backgroundColor: Colors.orange,
    elevation: 4,
  },
  todoItemSummary: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 0.6,
    borderBottomColor: Colors.red,
    justifyContent: "space-between",
    borderBottomWidth: 3,
  },
  todoItemTitle: {
    fontSize: 22,
  },
  todoItemDescription: {
    color: Colors.textDarkGray,
  },
  todoItemNoteCount: {
    color: Colors.textLightGray,
    textTransform: "uppercase",
    fontSize: 12,
  },
  todoItemActions: {
    flex: 0.2,
    elevation: 4,
  },
  todoItemActionArchive: {
    flex: 0.5,
    padding: 5,
    justifyContent: "center",
    backgroundColor: Colors.purple,
    alignItems: "center",
  },
  todoItemActionDone: {
    flex: 0.5,
    padding: 5,
    justifyContent: "center",
    backgroundColor: Colors.blue,
    alignItems: "center",
  },
});

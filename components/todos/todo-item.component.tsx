import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/colors.constants";

import { TodoModelInterface } from "../../models/todo.model";

interface TodoItemProps {
  item: TodoModelInterface;
  onNavigateToTodoDetailed: (todoId: string) => void;
  onArchiveTodo: (todoId: string) => void;
  onCompleteTodo: (todoId: string) => void;
  onHandleArchiveTodo: (todoId: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  onNavigateToTodoDetailed,
  onArchiveTodo,
  onCompleteTodo,
  onHandleArchiveTodo,
}) => {
  return (
    <TouchableOpacity
      style={styles.todoItem}
      onPress={() => onNavigateToTodoDetailed(item.todoId)}
    >
      <View style={{ ...styles.todoItemDate, ...styles.todoItemSection }}>
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
          <Text style={{ color: "white", textTransform: "uppercase" }}>
            Archive
          </Text>
        </View>
        <View style={styles.todoItemActionDone}>
          <Text
            onPress={() => onHandleArchiveTodo(item.todoId)}
            style={{ color: "white", textTransform: "uppercase" }}
          >
            Done
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
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

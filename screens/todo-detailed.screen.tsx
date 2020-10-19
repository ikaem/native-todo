import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../constants/colors.constants";
import { DefaultTodoDetailedScreenProps } from "./screen-types";
import * as todosActions from "../store/actions/todos.actions";
import { RootStateType } from "../store/store.provider";

import Center from "../components/UI/center.component";
import CustomHeaderButton from "../components/UI/custom-header-button.componen";
import outputDateTime from "../helpers/output-date-time";
import TodoItemNote from "../components/todos/todo-item-note.component";

interface TodoDetailedScreenProps extends DefaultTodoDetailedScreenProps {}

const TodoDetailedScreen: React.FC<TodoDetailedScreenProps> = ({
  navigation,
  route,
}) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Edit"
              iconName="md-create"
              onPress={() =>
                navigation.navigate("PendingTodoEditScreen", { todoId })
              }
            />
          </HeaderButtons>
        );
      },
    });
  }, [navigation]);

  const { todoId } = route.params;
  const routeName = route.name;

  const dispatch = useDispatch();

  const todoDetailed = useSelector((state: RootStateType) => {
    return state.todos.allTodos.find((todo) => todo.todoId === todoId);
  });

  const onHandleArchiveTodo = (todoId: string) => {
    dispatch(todosActions.thunkArchiveTodo(todoId));
    navigation.navigate("PendingTodosScreen");
  };

  if (!todoDetailed)
    return (
      <Center>
        <Text>
          No such task, unfortunately. Which, I guess, means your schedule is
          empty. Nice job.
        </Text>
      </Center>
    );

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.todoContainer}>
        <View style={styles.todoTitleContainer}>
          <Text style={styles.todoTitle}>{todoDetailed.todoTitle}</Text>
        </View>
        <View style={styles.todoDescriptionContainer}>
          <Text style={styles.todoDescription}>
            {todoDetailed.todoDescripton}
          </Text>
        </View>

        <View style={styles.todoDateWrapper}>
          <View style={styles.todoDateContainer}>
            <Text style={styles.todoDate}>
              <Text style={{ color: "white", fontWeight: "700" }}>
                {outputDateTime(todoDetailed.todoDate, "fullDate")}
              </Text>
            </Text>
          </View>
          <View style={styles.todoDateContainer}>
            <Text style={styles.todoDate}>
              <Text style={{ color: "white", fontWeight: "700" }}>
                {outputDateTime(todoDetailed.todoDate, "time")}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.todoNotesLabelContainer}>
          <Text style={styles.todoNotesLabel}>Notes</Text>
          <Ionicons
            name="md-add-circle"
            size={28}
            color={Colors.purple}
            onPress={() => console.log("yeah")}
            style={{ marginLeft: 10 }}
          />
        </View>
        <View style={styles.todoNotesList}>

          {todoDetailed.todoNotes.map((note) => {
            return (
              <TodoItemNote
                note={note}
                key={note.noteDate.toISOString()}
                handleDeleteTodoNote={() => {}}
                handleEditTodoNote={() => {}}
              />
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.todoActions}>
        <View style={styles.todoActionWrapper}>
          <TouchableOpacity
            style={{
              ...styles.todoActionButton,
              backgroundColor: Colors.purple,
            }}
          >
            <Text
              onPress={() => onHandleArchiveTodo(todoId)}
              style={styles.todoActionButtonText}
            >
              Archive
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.todoActionWrapper}>
          <TouchableOpacity
            style={{ ...styles.todoActionButton, backgroundColor: Colors.blue }}
          >
            <Text style={styles.todoActionButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default TodoDetailedScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    padding: 20,
    // position: "relative",
    backgroundColor: Colors.pale,
  },
  todoContainer: {
    width: "100%",
  },
  todoTitleContainer: {
    alignItems: "center",
    padding: 10,
  },
  todoTitle: {
    fontSize: 40,
    fontWeight: "700",
  },
  todoDescriptionContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  todoDescription: {
    fontSize: 18,
    textAlign: "center",
  },
  todoDateWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  todoDateContainer: {
    padding: 10,

    alignItems: "center",
    width: "48%",
    backgroundColor: Colors.orange,
    borderRadius: 5,
    elevation: 2,
  },
  todoDate: {
    color: Colors.pale,
    fontSize: 20,
  },
  todoNotesLabelContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    borderTopColor: Colors.gray,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  todoNotesLabel: {
    fontSize: 20,
    textTransform: "uppercase",
    color: Colors.textLightGray,
  },

  todoNotesList: {
    width: "100%",
  },

  todoNote: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: Colors.gray,

    elevation: 1,
  },
  todoNoteContent: {
    fontSize: 15,
    color: Colors.textDarkGray,
    marginBottom: 5,
  },
  todoNoteDate: {
    fontSize: 13,
    color: Colors.textLightGray,
  },

  todoActions: {
    position: "absolute",
    bottom: 0,
    left: 20,
    flexDirection: "row",
    width: "100%",
    backgroundColor: Colors.pale,
  },
  todoActionWrapper: {
    flex: 0.5,
  },
  todoActionButton: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  todoActionButtonText: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 20,
  },
});

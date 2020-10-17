import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../../constants/colors.constants";
import { TodoNoteInterface } from "../../screens/todo-edit.screen";

interface TodoItemNoteProps {
  note: TodoNoteInterface;
  outputDateTimeString: (dateObject: Date, mode: "date" | "time") => string;
}

const TodoItemNote: React.FC<TodoItemNoteProps> = ({
  note,
  outputDateTimeString,
}) => {
  return (
    <View style={styles.todoNote}>
      <Text style={styles.todoNoteContent}>{"This is a note"}</Text>
      <Text style={styles.todoNoteDate}>
        {outputDateTimeString(note.noteDate, "date")} -{" "}
        {outputDateTimeString(note.noteDate, "time")}
      </Text>
    </View>
  );
};

export default TodoItemNote;

const styles = StyleSheet.create({
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
});

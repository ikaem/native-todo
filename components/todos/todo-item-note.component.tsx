import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";

import Colors from "../../constants/colors.constants";
import { TodoNoteInterface } from "../../screens/todo-edit.screen";

interface TodoItemNoteProps {
  note: TodoNoteInterface;
  outputDateTimeString: (dateObject: Date, mode: "date" | "time") => string;
  handleDeleteTodoNote: (noteDate: Date) => void;
  handleEditTodoNote: (note: TodoNoteInterface) => void;
}

const TodoItemNote: React.FC<TodoItemNoteProps> = ({
  note,
  outputDateTimeString,
  handleDeleteTodoNote,
  handleEditTodoNote,
}) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editTodoNoteText, setEditTodoNoteText] = useState(
    note.noteContent || ""
  );

  return (
    <View style={styles.todoNoteItem}>
      <View style={styles.todoNote}>
        <Text style={styles.todoNoteContent}>{note.noteContent}</Text>
        <Text style={styles.todoNoteDate}>
          {outputDateTimeString(note.noteDate, "date")} -{" "}
          {outputDateTimeString(note.noteDate, "time")}
        </Text>
      </View>
      <View style={styles.todoNoteItemActions}>
        <View
          style={{
            ...styles.todoNoteItemAction,
            backgroundColor: Colors.blue,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsEditModalVisible(true);
            }}
          >
            <Text style={{ color: "white" }}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...styles.todoNoteItemAction,
            backgroundColor: Colors.purple,
          }}
        >
          <TouchableOpacity onPress={() => handleDeleteTodoNote(note.noteDate)}>
            <Text style={{ color: "white" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={isEditModalVisible}>
        <View style={styles.editNoteModal}>
          <Text style={styles.editNoteModalLabel}>Edit Note</Text>
          <View style={styles.editNoteModalInputContainer}>
            <TextInput
              style={styles.editNoteModalInput}
              multiline={true}
              underlineColorAndroid="transparent"
              value={editTodoNoteText}
              onChangeText={(text) => setEditTodoNoteText(text)}
            />
          </View>

          <View style={styles.editNoteModalActions}>
            <Button
              title="Submit"
              onPress={() => {
                handleEditTodoNote({
                  noteContent: editTodoNoteText,
                  noteDate: note.noteDate,
                });

                setIsEditModalVisible(false);
                setEditTodoNoteText("");
              }}
            />
            <Button
              title="Cancel"
              onPress={() => {
                setIsEditModalVisible(false);
                setEditTodoNoteText("");
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TodoItemNote;

const styles = StyleSheet.create({
  todoNoteItem: {
    flexDirection: "row",
    width: "100%",
    // flex: 1,
    justifyContent: "space-between",
    marginVertical: 5,
  },
  todoNote: {
    // width: "70%",
    flex: 0.8,
    padding: 10,
    backgroundColor: Colors.gray,
    elevation: 1,
    justifyContent: "space-between",
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
  todoNoteItemActions: {
    // width: "30%",
    flex: 0.2,
    // height: "100%",
    // justifyContent: ""
  },
  todoNoteItemAction: {
    // padding: 5,
    justifyContent: "center",
    alignItems: "center",
    flex: 0.5,
    elevation: 2,
  },
  editNoteModal: {
    flex: 1,
    padding: 20,
    width: "100%",
    justifyContent: "center",
  },

  editNoteModalLabel: {
    textAlign: "center",
    fontSize: 18,
    textTransform: "uppercase",
    color: Colors.textLightGray,
  },

  editNoteModalInputContainer: {
    marginVertical: 20,
  },

  editNoteModalInput: {
    width: "100%",
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    fontSize: 16,
    padding: 10,
  },

  editNoteModalActions: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import outputDateTime from "../../helpers/output-date-time";
import Colors from "../../constants/colors.constants";
import { TodoNoteInterface } from "../../screens/todo-edit.screen";
import NoteInputModal from "./note-input-modal.component";

interface TodoItemNoteProps {
  note: TodoNoteInterface;
  handleDeleteTodoNote: (noteDate: Date) => void;
  handleEditTodoNote: (note: TodoNoteInterface) => void;
}

const TodoItemNote: React.FC<TodoItemNoteProps> = ({
  note,
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
        <Text style={styles.todoNoteDate}>{outputDateTime(note.noteDate)}</Text>
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

      <NoteInputModal
        isModalVisible={isEditModalVisible}
        setIsModalVisible={setIsEditModalVisible}
        onHandleSubmitInput={handleEditTodoNote}
        note={note}
      />

      {/* <Modal visible={isEditModalVisible}>
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
      </Modal> */}
    </View>
  );
};

export default TodoItemNote;

const styles = StyleSheet.create({
  todoNoteItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  todoNote: {
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
    flex: 0.2,
  },
  todoNoteItemAction: {
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

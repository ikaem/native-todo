import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../../constants/colors.constants";
import { TodoNoteInterface } from "../../screens/todo-edit.screen";

interface NoteInputModalProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onHandleSubmitInput: (note: TodoNoteInterface) => void;
  note?: TodoNoteInterface;
}

const NoteInputModal: React.FC<NoteInputModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  onHandleSubmitInput,
  note,
}) => {
  const [noteValue, setNoteValue] = useState<TodoNoteInterface>(
    note || {
      noteContent: "",
      noteDate: new Date(),
    }
  );

  const handleOnPressSubmit = () => {
    if (!noteValue.noteContent) {
      setNoteValue(
        note || {
          noteContent: "",
          noteDate: new Date(),
        }
      );
      return;
    }

    onHandleSubmitInput({
      noteContent: noteValue.noteContent,
      noteDate: noteValue.noteDate,
    });
    setIsModalVisible(false);
  };

  const handleOnPressCancel = () => {
    setIsModalVisible(false);
    setNoteValue(
      note || {
        noteContent: "",
        noteDate: new Date(),
      }
    );
  };

  return (
    <Modal visible={isModalVisible}>
      <View style={styles.noteInputModal}>
        <Text style={styles.noteInputModalLabel}>
          {note ? "Edit Note" : "Add Note"}
        </Text>
        <View style={styles.noteInputModalInputContainer}>
          <TextInput
            style={styles.noteInputModalInput}
            multiline={true}
            underlineColorAndroid="transparent"
            value={noteValue.noteContent}
            onChangeText={(text) =>
              setNoteValue((prev) => ({
                ...prev,
                noteContent: text,
              }))
            }
          />
          {!noteValue.noteContent && (
            <Text>Please make sure that the note is not empty</Text>
          )}
        </View>

        <View style={styles.noteInputModalActions}>
          <Button
            title="Submit"
            onPress={handleOnPressSubmit}
            disabled={!noteValue.noteContent}
          />
          <Button title="Cancel" onPress={handleOnPressCancel} />
        </View>
      </View>
    </Modal>
  );
};

export default NoteInputModal;

const styles = StyleSheet.create({
  noteInputModal: {
    flex: 1,
    padding: 20,
    width: "100%",
    justifyContent: "center",
  },

  noteInputModalLabel: {
    textAlign: "center",
    fontSize: 18,
    textTransform: "uppercase",
    color: Colors.textLightGray,
  },

  noteInputModalInputContainer: {
    marginVertical: 20,
  },

  noteInputModalInput: {
    width: "100%",
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    fontSize: 16,
    padding: 10,
  },

  noteInputModalActions: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

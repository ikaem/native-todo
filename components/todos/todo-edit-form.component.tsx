import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import Colors from "../../constants/colors.constants";
import {
  DateTimePickerOptionsInterface,
  TodoNoteInterface,
} from "../../screens/todo-edit.screen";
import TodoItemNote from "./todo-item-note.component";

interface TodoEditFormProps {
  title: string;
  description: string;
  notes: TodoNoteInterface[];
  date: Date;
  showDatePicker: () => void;
  showTimePicker: () => void;
  outputDateTimeString: (dateObject: Date, mode: "date" | "time") => string;
  isDatePickerShown: boolean;
  mode: "date" | "time";
  setDateTimePickerOptions: React.Dispatch<
    React.SetStateAction<DateTimePickerOptionsInterface>
  >;
  defaultDate: Date;
  setDefaultDate: React.Dispatch<React.SetStateAction<Date>>;
  handleInputChange: (text: string, inputID: "title" | "description") => void;
  handleDateChange: (dateValue: Date | undefined) => void;
}

const TodoEditForm: React.FC<TodoEditFormProps> = ({
  title,
  description,
  notes,
  date,
  showDatePicker,
  showTimePicker,
  outputDateTimeString,
  isDatePickerShown,
  mode,
  setDateTimePickerOptions,
  defaultDate,
  setDefaultDate,
  handleInputChange,
  handleDateChange,
}) => {
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.todoContainer}>
        <View style={styles.todoTitleContainer}>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.todoTitle}
            placeholder={"Todo Title"}
            value={title}
            onChangeText={(text) => handleInputChange(text, "title")}
          />
        </View>
        <View style={styles.todoDescriptionContainer}>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.todoDescription}
            placeholder="Todo Description"
            value={description}
            onChangeText={(text) => handleInputChange(text, "description")}
          />
        </View>
        <View style={styles.todoDateWrapper}>
          <View style={styles.todoDateContainer}>
            <Text style={styles.todoDate} onPress={() => showDatePicker()}>
              <Text style={{ color: "white", fontWeight: "700" }}>
                {outputDateTimeString(date, "date")}
              </Text>
            </Text>
          </View>
          <View style={styles.todoDateContainer}>
            <Text style={styles.todoDate} onPress={() => showTimePicker()}>
              <Text style={{ color: "white", fontWeight: "700" }}>
                {outputDateTimeString(date, "time")}
              </Text>
            </Text>
          </View>
        </View>
        {isDatePickerShown && (
          <DateTimePicker
            value={defaultDate}
            mode={mode}
            is24Hour={true}
            onChange={(event, selectedDate) => {
              // const currentDate = selectedDate || defaultDate;
              handleDateChange(selectedDate);

              setDateTimePickerOptions((prev) => ({
                ...prev,
                isDatePickerShown: false,
              }));
              // setDefaultDate(currentDate);
            }}
          />
        )}

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
          <View style={styles.todoNote}>
            <Text style={styles.todoNoteContent}>This is a note</Text>
            <Text style={styles.todoNoteDate}>23.4.2020</Text>
          </View>

          {notes.map((note) => {
            return (
              <TodoItemNote
                note={note}
                outputDateTimeString={outputDateTimeString}
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
            <Text style={styles.todoActionButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.todoActionWrapper}>
          <TouchableOpacity
            style={{ ...styles.todoActionButton, backgroundColor: Colors.blue }}
          >
            <Text style={styles.todoActionButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TodoEditForm;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    padding: 20,
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
    borderBottomColor: Colors.textLightGray,
    borderBottomWidth: 2,
    textAlign: "center",
  },
  todoDescriptionContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  todoDescription: {
    fontSize: 18,
    textAlign: "center",
    borderBottomColor: Colors.textLightGray,
    borderBottomWidth: 1,
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

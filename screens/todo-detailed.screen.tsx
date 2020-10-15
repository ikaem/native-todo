import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/colors.constants";

const TodoDetailedScreen = () => {
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.todoContainer}>
        <View style={styles.todoTitleContainer}>
          <Text style={styles.todoTitle}>Todo Title</Text>
        </View>
        <View style={styles.todoDescriptionContainer}>
          <Text style={styles.todoDescription}>
            Todo Description a little bit longer stuff that just won't stop
          </Text>
        </View>
        <View style={styles.todoDateContainer}>
          <Text style={styles.todoDate}>
            Due Date:{" "}
            <Text style={{ color: "white", fontWeight: "700" }}>
              {" "}
              23.08.2020
            </Text>
          </Text>
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
          <View style={styles.todoNote}>
            <Text style={styles.todoNoteContent}>This is a note</Text>
            <Text style={styles.todoNoteDate}>23.4.2020</Text>
          </View>
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
            <Text style={styles.todoActionButtonText}>Archive</Text>
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
    position: "relative",
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
  todoDateContainer: {
    padding: 20,
    marginVertical: 10,
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.orange,
    borderRadius: 5,
    elevation: 2,
  },
  todoDate: {
    color: Colors.pale,
    fontSize: 22,
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

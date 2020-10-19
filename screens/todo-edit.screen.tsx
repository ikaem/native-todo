import React, { useState, useReducer, useEffect } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import dayjs from "dayjs";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import TodoEditForm from "../components/todos/todo-edit-form.component";

import * as todosActions from "../store/actions/todos.actions";
import {
  ThunkAddTodoActionArgs,
  ThunkEditTodoActionArgs,
} from "../store/actions/todos.actions";
import { DefaultTodoEditScreenProps } from "./screen-types";
import { RootStateType } from "../store/store.provider";
import { TodoModelInterface } from "../models/todo.model";

export interface DateTimePickerOptionsInterface {
  mode: "time" | "date";
  isDatePickerShown: boolean;
}

export interface TodoNoteInterface {
  noteDate: Date;
  noteContent: string;
}

interface FormStateInterface {
  inputValues: {
    title: string;
    description: string;
    date: Date;
    notes: TodoNoteInterface[];
    // id: string;
  };
  inputValidities: {
    title: boolean;
    description: boolean;
    date: boolean;
  };
  isCompleted: boolean;
  formIsValid: boolean;
}

interface SetInputActionInterface {
  type: typeof SET_INPUT;
  payload: {
    inputValue: string;
    inputIsValid: boolean;
    inputID: "title" | "description";
  };
}

interface SetDateActionInterface {
  type: typeof SET_DATE;
  payload: {
    dateValue: Date;
    dateIsValid: boolean;
  };
}

interface AddNoteActionInterface {
  type: typeof ADD_NOTE;
  payload: TodoNoteInterface;
}

interface DeleteNoteActionInterface {
  type: typeof DELETE_NOTE;
  payload: Date;
}

interface EditNoteActionInterface {
  type: typeof EDIT_NOTE;
  payload: {
    noteDate: Date;
    noteContent: string;
  };
}

interface SetTodoForEditActionInterface {
  type: typeof SET_TODO_FOR_EDIT;
  payload: TodoModelInterface;
}

type formReducerActionsType =
  | SetDateActionInterface
  | AddNoteActionInterface
  | SetInputActionInterface
  | DeleteNoteActionInterface
  | EditNoteActionInterface
  | SetTodoForEditActionInterface;

const SET_INPUT = "SET_INPUT";
const SET_DATE = "SET_DATE";
const ADD_NOTE = "ADD_NOTE";
const EDIT_NOTE = "EDIT_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
const SET_TODO_FOR_EDIT = "SET_TODO_FOR_EDIT";

const intitialFormState: FormStateInterface = {
  inputValues: {
    title: "",
    description: "",
    date: new Date(),
    notes: [],
    // id: "",
    // isCompleted: false,
  },
  inputValidities: {
    title: false,
    description: false,
    date: false,
  },
  isCompleted: false,
  formIsValid: false,
};

const setTodoForEdit = (
  todoForEdit: TodoModelInterface
): SetTodoForEditActionInterface => {
  console.log("todo for edit from action", todoForEdit);
  return {
    type: SET_TODO_FOR_EDIT,
    payload: todoForEdit,
  };
};

const setInput = (
  inputValue: string,
  inputIsValid: boolean,
  inputID: "title" | "description"
): SetInputActionInterface => {
  return {
    type: SET_INPUT,
    payload: {
      inputValue,
      inputIsValid,
      inputID,
    },
  };
};

const setDate = (
  dateValue: Date,
  dateIsValid: boolean
): SetDateActionInterface => {
  return {
    type: SET_DATE,
    payload: {
      dateValue,
      dateIsValid,
    },
  };
};

const addNote = (note: TodoNoteInterface): AddNoteActionInterface => {
  console.log("note in the action creator", note);
  return {
    type: ADD_NOTE,
    payload: note,
  };
};

const deleteNote = (noteDate: Date): DeleteNoteActionInterface => {
  return {
    type: DELETE_NOTE,
    payload: noteDate,
  };
};

const editNote = (note: TodoNoteInterface): EditNoteActionInterface => {
  return {
    type: EDIT_NOTE,
    payload: note,
  };
};

const formReducer = (
  state: FormStateInterface,
  action: formReducerActionsType
) => {
  switch (action.type) {
    case SET_TODO_FOR_EDIT:
      const { todoTitle, isCompleted } = action.payload;

      const newSTEInputValues = {
        ...state.inputValues,
        title: todoTitle,
      };
      const newSTEInputValidities = {
        title: true,
        description: true,
        date: true,
      };

      return {
        ...state,
        inputValues: newSTEInputValues,
        inputValidities: newSTEInputValidities,
        isCompleted,
        formIsValid: true,
      };
    case EDIT_NOTE:
      const {
        noteDate: newENNoteDate,
        noteContent: newENNoteContent,
      } = action.payload;

      try {
        // fetch this note
        const oldENNote = state.inputValues.notes.find(
          (note) => note.noteDate === newENNoteDate
        );

        if (!oldENNote) throw new Error("No such note to edit");

        const newENNote = {
          ...oldENNote,
          noteContent: newENNoteContent,
        };

        const newENNotes = [
          ...state.inputValues.notes.filter(
            (note) => note.noteDate !== newENNoteDate
          ),
          newENNote,
        ].sort((a, b) => (b.noteDate > a.noteDate ? 1 : -1));

        const newENInputValues = {
          ...state.inputValues,
          notes: newENNotes,
        };

        const newENState = {
          ...state,
          inputValues: newENInputValues,
        };

        console.log("HEREEEEEEEEEEEEEEEEEE", newENState);

        return newENState;
      } catch (error) {
        console.log(error);
        return state;
      }

    case DELETE_NOTE:
      const newDNNoteDate = action.payload;

      // create notes without this note
      const newDNNotes = state.inputValues.notes
        .filter((note) => note.noteDate !== newDNNoteDate)
        .sort((a, b) => (b.noteDate > a.noteDate ? 1 : -1));

      // create input values with new notes
      const newDNInputValues = {
        ...state.inputValues,
        notes: newDNNotes,
      };

      // create new state with new input values
      const newDNState = {
        ...state,
        inputValues: newDNInputValues,
      };

      return newDNState;

    case SET_INPUT:
      const { inputValue, inputIsValid, inputID } = action.payload;

      const newIInputValues = {
        ...state.inputValues,
        [inputID]: inputValue,
      };
      const newIInputValidities = {
        ...state.inputValidities,
        [inputID]: inputIsValid,
      };

      const newIFormIsValid = !Object.values(newIInputValidities).some(
        (value) => value === false
      );

      return {
        ...state,
        inputValues: newIInputValues,
        inputValidities: newIInputValidities,
        formIsValid: newIFormIsValid,
      };

    case SET_DATE:
      const { dateValue, dateIsValid } = action.payload;

      const newDInputValues = {
        ...state.inputValues,
        date: dateValue,
      };

      const newDInputValidities = {
        ...state.inputValidities,
        date: dateIsValid,
      };

      const newDFormIsValid = !Object.values(newDInputValidities).some(
        (value) => value === false
      );

      const newDState = {
        ...state,
        inputValues: newDInputValues,
        inputValidities: newDInputValidities,
        formIsValid: newDFormIsValid,
      };

      return newDState;

    case ADD_NOTE:
      const {
        noteContent: newANNoteContent,
        noteDate: newANNoteDate,
      } = action.payload;

      const newANNotes = [
        ...state.inputValues.notes,
        { noteContent: newANNoteContent, noteDate: newANNoteDate },
      ].sort((a, b) => (b.noteDate > a.noteDate ? 1 : -1));

      const newANInputValues = {
        ...state.inputValues,
        notes: newANNotes,
      };

      const newANState = {
        ...state,
        inputValues: newANInputValues,
      };

      return newANState;

    default:
      return state;
  }
};

interface TodoEditScreenProps extends DefaultTodoEditScreenProps {}

const TodoEditScreen: React.FC<TodoEditScreenProps> = ({
  navigation,
  route,
}) => {
  const todoId = route.params?.todoId;
  const todoForEdit = useSelector((state: RootStateType) =>
    state.todos.pending.find((todo) => todo.todoId === todoId)
  );

  const [defaultDate, setDefaultDate] = useState(new Date());
  const [formState, dispatchFormState] = useReducer(
    formReducer,
    intitialFormState
  );
  const [dateTimePickerOptions, setDateTimePickerOptions] = useState<
    DateTimePickerOptionsInterface
  >({
    mode: "date",
    isDatePickerShown: false,
  });

  const [todoForEditError, setTodoForEditError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!todoId) return;

    if (!todoForEdit) return setTodoForEditError(true);

    dispatchFormState(setTodoForEdit(todoForEdit));
  }, [todoId]);

  const showMode = (currentMode: "date" | "time") => {
    setDateTimePickerOptions(() => {
      return {
        mode: currentMode,
        isDatePickerShown: true,
      };
    });
  };

  const showDatePicker = () => {
    showMode("date");
  };
  const showTimePicker = () => {
    showMode("time");
  };

  const outputDateTimeString = (dateObject: Date, mode: "date" | "time") => {
    if (mode === "date") return dayjs(dateObject).format("DD MMM YYYY");
    return dayjs(dateObject).format("HH:mm");
  };

  const handleInputChange = (
    text: string,
    inputID: "title" | "description"
  ) => {
    let isValid = true;
    if (!text) isValid = false;
    dispatchFormState(setInput(text, isValid, inputID));
    console.log("This is new state", formState, isValid);
  };

  const handleDateChange = (dateValue: Date | undefined) => {
    // validating
    let isValid = true;
    if (!dateValue) isValid = false;
    if (dateValue && dateValue < new Date()) isValid = false;
    const currentDate = dateValue || formState.inputValues.date;
    dispatchFormState(setDate(currentDate, isValid));
  };

  const handleAddTodoNote = (text: string) => {
    if (!text.trim()) return;

    dispatchFormState(
      addNote({
        noteContent: text,
        noteDate: new Date(),
      })
    );
  };

  const handleDeleteTodoNote = (noteDate: Date) => {
    dispatchFormState(deleteNote(noteDate));
  };

  const handleEditTodoNote = (note: TodoNoteInterface) => {
    console.log("editing note from", note.noteDate);
    dispatchFormState(editNote(note));
  };

  const handleSubmitTodo = () => {
    if (!formState.formIsValid) {
      Alert.alert("Invalid Todo", "Please fill all fields", [
        {
          text: "OK",
          style: "default",
        },
      ]);
      return;
    }

    if (!todoId) {
      const dataForDispatch: ThunkAddTodoActionArgs = {
        todoTitle: formState.inputValues.title,
        todoDescription: formState.inputValues.description,
        todoDate: formState.inputValues.date,
        todoNotes: formState.inputValues.notes,
      };

      dispatch(todosActions.thunkAddTodo(dataForDispatch));
      navigation.navigate("PendingTodosScreen");
      return;
    }

    const dataForDispatch: ThunkEditTodoActionArgs = {
      todoId,
      isCompleted: formState.isCompleted,
      todoTitle: formState.inputValues.title,
      todoDescription: formState.inputValues.description,
      todoDate: formState.inputValues.date,
      todoNotes: formState.inputValues.notes,
    };

    dispatch(todosActions.thunkEditTodo(dataForDispatch));
    navigation.navigate("PendingTodoDetailedScreen", {
      todoId,
    });
    return;
  };

  return (
    <TodoEditForm
      title={formState.inputValues.title}
      description={formState.inputValues.description}
      notes={formState.inputValues.notes}
      date={formState.inputValues.date}
      showDatePicker={showDatePicker}
      showTimePicker={showTimePicker}
      outputDateTimeString={outputDateTimeString}
      isDatePickerShown={dateTimePickerOptions.isDatePickerShown}
      mode={dateTimePickerOptions.mode}
      setDateTimePickerOptions={setDateTimePickerOptions}
      defaultDate={defaultDate}
      setDefaultDate={setDefaultDate}
      handleInputChange={handleInputChange}
      handleDateChange={handleDateChange}
      handleAddTodoNote={handleAddTodoNote}
      handleDeleteTodoNote={handleDeleteTodoNote}
      handleEditTodoNote={handleEditTodoNote}
      handleSubmitTodo={handleSubmitTodo}
    />
  );
};

export default TodoEditScreen;

const styles = StyleSheet.create({});

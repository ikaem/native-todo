import React, { useState, useReducer } from "react";
import { StyleSheet } from "react-native";
import dayjs from "dayjs";

import TodoEditForm from "../components/todos/todo-edit-form.component";

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
  };
  inputValidities: {
    title: boolean;
    description: boolean;
    date: boolean;
    notes: boolean;
  };
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

type formReducerActionsType =
  | SetDateActionInterface
  | AddNoteActionInterface
  | SetInputActionInterface;

const SET_TITLE = "SET_TITLE";
const SET_INPUT = "SET_INPUT";
const SET_DESCRIPTION = "SET_DESCRIPTION";
const SET_DATE = "SET_DATE";
const ADD_NOTE = "ADD_NOTE";
const EDIT_NOTE = "EDIT_NOTE";
const DELETE_NOTE = "DELETE_NOTE";

const intitialFormState: FormStateInterface = {
  inputValues: {
    title: "",
    description: "",
    date: new Date(),
    notes: [],
  },
  inputValidities: {
    title: false,
    description: false,
    date: false,
    notes: false,
  },
  formIsValid: false,
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
  return {
    type: ADD_NOTE,
    payload: note,
  };
};

const formReducer = (
  state: FormStateInterface,
  action: formReducerActionsType
) => {
  switch (action.type) {
    case SET_INPUT:
      const { inputValue, inputIsValid, inputID } = action.payload;

      const newInputValues = {
        ...state.inputValues,
        [inputID]: inputValue,
      };
      const newInputValidities = {
        ...state.inputValidities,
        [inputID]: inputIsValid,
      };

      let newTFormIsValid = !Object.values(newInputValidities).some(
        (value) => value === false
      );

      console.log("is form valid:", newTFormIsValid);

      return {
        ...state,
        inputValues: newInputValues,
        inputValidities: newInputValidities,
        formIsValid: newTFormIsValid,
      };

    default:
      return state;
  }
};

const TodoEditScreen = () => {
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

    let isValid = true;
    if (!dateValue) isValid = false;
    if (dateValue && dateValue < new Date()) isValid = false;

    const currentDate = dateValue || formState.inputValues.date;

    dispatchFormState(setDate(currentDate, isValid));
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
    />
  );
};

export default TodoEditScreen;

const styles = StyleSheet.create({});

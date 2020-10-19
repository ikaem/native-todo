import Todo from "../models/todo.model";

export const todos = [
  new Todo(
    "1",
    "Buy milk",
    new Date(2020, 2, 22, 14, 32),
    "Just a new todo that I want a description for to be too long, so I can cut it off...",
    [
      {
        noteContent: "Note 1 for this todo",
        noteDate: new Date(2020, 2, 22, 14, 32),
      },

      {
        noteContent: "Note 2 for this todo",
        noteDate: new Date(2020, 2, 24, 12, 32),
      },
    ],
    true
  ),
  new Todo(
    "2",
    "Buy apples",
    new Date(2020, 6, 22, 111, 32),
    "Just a new todo that I want a description for to be too long, so I can cut it off...",
    [
      {
        noteContent: "Note 1 for this todo",
        noteDate: new Date(2020, 1, 22, 14, 32),
      },

      {
        noteContent: "Note 2 for this todo",
        noteDate: new Date(2020, 1, 24, 12, 32),
      },
    ],
    false
  ),
  new Todo(
    "23",
    "Buy apples",
    new Date(2020, 6, 22, 111, 32),
    "Just a new todo that I want a description for to be too long, so I can cut it off...",
    [],
    false
  ),
  new Todo(
    "3",
    "Buy peanuts",
    new Date(2020, 4, 22, 14, 54),
    "Just a new todo",
    [
      {
        noteContent: "Note 1 for this todo",
        noteDate: new Date(2020, 4, 22, 14, 32),
      },

      {
        noteContent: "Note 2 for this todo",
        noteDate: new Date(2020, 4, 24, 12, 2),
      },
    ],
    true
  ),
  new Todo(
    "4",
    "Buy footballs",
    new Date(2020, 8, 22, 14, 32),
    "Just a new todo",
    [
      {
        noteContent: "Note 1 for this todo",
        noteDate: new Date(2020, 3, 22, 14, 32),
      },

      {
        noteContent: "Note 2 for this todo",
        noteDate: new Date(2020, 7, 24, 12, 42),
      },
    ],
    false
  ),
  new Todo(
    "5",
    "Buy couch",
    new Date(2020, 9, 22, 14, 32),
    "Just a new todo",
    [
      {
        noteContent: "Note 1 for this todo",
        noteDate: new Date(2020, 9, 22, 14, 32),
      },

      {
        noteContent: "Note 2 for this todo",
        noteDate: new Date(2020, 11, 24, 12, 22),
      },
    ],
    true
  ),
  new Todo(
    "6",
    "Buy leggings",
    new Date(2020, 6, 22, 14, 32),
    "Just a new todo",
    [
      {
        noteContent: "Note 1 for this todo",
        noteDate: new Date(2020, 6, 22, 14, 32),
      },

      {
        noteContent: "Note 2 for this todo",
        noteDate: new Date(2020, 6, 24, 12, 12),
      },
    ],
    false
  ),
];

import { TodoNoteInterface } from "../screens/todo-edit.screen";

export interface TodoModelInterface {
  todoId: string;
  todoTitle: string;
  todoDate: Date;
  todoDescripton: string;
  todoNotes: TodoNoteInterface[];
  isCompleted: boolean;
}

class Todo implements TodoModelInterface {
  constructor(
    public todoId: string,
    public todoTitle: string,
    public todoDate: Date,
    public todoDescripton: string,
    public todoNotes: TodoNoteInterface[],
    public isCompleted: boolean
  ) {}
}

export default Todo;

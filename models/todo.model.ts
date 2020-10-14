export interface TodoModelInterface {
  todoId: string;
  todoTitle: string;
  isCompleted: boolean;
}

class Todo implements TodoModelInterface {
  constructor(
    public todoId: string,
    public todoTitle: string,
    public isCompleted: boolean
  ) {}
}

export default Todo;

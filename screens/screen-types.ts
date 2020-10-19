import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CompletedTodosNavParamsList } from "../navigation/navigators/completed-todos.navigator";
import { PendingTodosNavParamsList } from "../navigation/navigators/pending-todos.navigator";

type StackNavigationsParamsLists = PendingTodosNavParamsList &
  CompletedTodosNavParamsList;

export interface DefaultTodosScreenProps {
  navigation: StackNavigationProp<
    StackNavigationsParamsLists,
    "PendingTodosScreen" | "CompletedTodosScreen"
  >;
  route: RouteProp<
    StackNavigationsParamsLists,
    "PendingTodosScreen" | "CompletedTodosScreen"
  >;
}

export interface DefaultTodoDetailedScreenProps {
  navigation: StackNavigationProp<
    StackNavigationsParamsLists,
    "PendingTodoDetailedScreen" | "CompletedTodoDetailedScreen"
  >;
  route: RouteProp<
    StackNavigationsParamsLists,
    "PendingTodoDetailedScreen" | "CompletedTodoDetailedScreen"
  >;
}

export interface DefaultTodoEditScreenProps {
  navigation: StackNavigationProp<
    StackNavigationsParamsLists,
    "PendingTodoEditScreen" | "CompletedTodoEditScreen"
  >;
  route: RouteProp<
    StackNavigationsParamsLists,
    "PendingTodoEditScreen" | "CompletedTodoEditScreen"
  >;
}

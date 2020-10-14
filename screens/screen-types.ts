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

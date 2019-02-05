import { createAppContainer, createStackNavigator } from "react-navigation";
import { Platform } from "react-native";

import HackerNewsDetails from "../screens/HackerNews/Details";
import HackerNewsList from "../screens/HackerNews/List";
/**
 * @function
 * @navigation
 */
const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      HackerNewsList,
      HackerNewsDetails,
      Index: {
        screen: HackerNewsList
      }
    },
    {
      initialRouteName: "Index",
      headerMode: "none",
      /*
       * Use modal on iOS because the card mode comes from the right
       */
      mode: Platform.OS === "ios" ? "modal" : "card"
    }
  )
);

export default AppNavigator;

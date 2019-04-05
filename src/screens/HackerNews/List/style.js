import { StyleSheet } from "react-native";
import { THEME_COLORS } from "../../../constants/colors";
/**
 * @style
 * @constant
 */
const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1
  },
  titleHeader: {
    fontSize: 18,
    color: THEME_COLORS.headerText
  }
});
export default styles;

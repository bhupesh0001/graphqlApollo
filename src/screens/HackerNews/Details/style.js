import { StyleSheet } from "react-native";
import { THEME_COLORS } from "../../../constants/colors";
/**
 * @style
 * @constant
 */
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  category: {
    textAlign: "right",
    flex: 1,
    margin: 10
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: THEME_COLORS.activityIndicator
  },
  pointPostedContainer: {
    flex: 1,
    flexDirection: "row"
  },
  points: {
    margin: 10,
    textAlign: "left",
    flex: 1
  },
  postedBy: {
    margin: 10,
    textAlign: "right",
    flex: 1
  },
  updated: {
    margin: 10,
    flex: 1
  },
  moreInformation: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 5,
    flex: 1
  },
  hyperlink: {
    marginHorizontal: 10,
    marginBottom: 10,
    color: THEME_COLORS.hyperLink
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  commentsText: {
    marginHorizontal: 10,
    marginTop: 5,
    fontSize: 18
  },
  titleHeader: {
    fontSize: 18,
    color: "#fff"
  }
});

export default styles;

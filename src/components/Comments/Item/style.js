import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#d6d7da"
  },
  userThumbnailContainer: {
    flex: 1
  },
  username: {
    fontSize: 10,
    marginTop: 5
  },
  commentText: {
    backgroundColor: "#F5FCFF"
  },
  textContainer: {
    flex: 7
  },
  time: {
    marginTop: 5,
    fontSize: 11,
    marginBottom: 5
  }
});

export default styles;

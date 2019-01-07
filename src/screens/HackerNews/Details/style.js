import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  category: {
    textAlign: 'right',
    flex: 1,
    margin: 10,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointPostedContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  points: {
    margin: 10,
    textAlign: 'left',
    flex: 1,
  },
  postedBy: {
    margin: 10,
    textAlign: 'right',
    flex: 1,
  },
  updated: {
    margin: 10,
    flex: 1,
  },
  moreInformation: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 5,
    flex: 1,
  },
  hyperlink: {
    marginHorizontal: 10,
    marginBottom: 10,
    color: '#0066FF',
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  commentsText: {
    marginHorizontal: 10,
    marginTop: 5,
    fontSize: 18,
  },
});

export default styles;

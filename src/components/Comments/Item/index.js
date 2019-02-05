// @flow
import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import HTMLView from "react-native-htmlview";
import { Icon } from "native-base";
import styles from "./style";

type Props = {
  item: {
    text: string,
    timeISO: string,
    by: {
      id: string
    }
  }
};
/**
 *@description(Render a comment)
 *
 * @export
 * @class CommentItem
 * @extends {PureComponent<Props>}
 */
export default class CommentItem extends PureComponent<Props> {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.userThumbnailContainer}>
          <Icon name="contact" />
          <Text style={styles.username}>{item.by.id}</Text>
        </View>
        <View style={styles.textContainer}>
          <HTMLView style={styles.commentText} value={item.text} />
          <Text style={styles.time}>
            {new Date(item.timeISO).toUTCString()}
          </Text>
        </View>
      </View>
    );
  }
}

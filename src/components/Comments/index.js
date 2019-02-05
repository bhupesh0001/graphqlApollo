// @flow
import React, { PureComponent } from "react";
import { View } from "react-native";
import CommentItem from "./Item";
import styles from "./style";

type item = {
  id: string,
  text: string,
  timeISO: string,
  by: {
    id: string
  }
};
type Props = {
  items: Array<item>
};
/**
 *
 *
 * @export
 * @class Comments
 * @extends {PureComponent<Props>}
 */
export default class Comments extends PureComponent<Props> {
  render() {
    const { items } = this.props;
    return (
      <View style={styles.container}>
        {items.map(comment => (
          <CommentItem
            item={comment}
            style={styles.commentItem}
            key={comment.id}
          />
        ))}
      </View>
    );
  }
}

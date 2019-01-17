import React, { PureComponent } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import CommentItem from "./Item";
import styles from "./style";

export default class Comments extends PureComponent {
  render() {
    const { items } = this.props;
    return (
      <View style={styles.container}>
        {items.map(comment => (
          <CommentItem item={comment} style={{ flex: 1 }} key={comment.id} />
        ))}
      </View>
    );
  }
}
Comments.propTypes = {
  items: PropTypes.array.isRequired
};

import React, { PureComponent } from 'react';
import {
  View, Text,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Icon } from 'native-base';
import moment from 'moment';
import PropTypes from 'prop-types';
import styles from './style';

export default class CommentItem extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.userThumbnailContainer}>
          <Icon name="contact" />
          <Text style={styles.username}>{item.by.id}</Text>
        </View>
        <View style={styles.textContainer}>
          <HTMLView
            style={styles.commentText}
            value={item.text}
          />
          <Text style={styles.time}>{moment(item.timeISO).format('LLL')}</Text>
        </View>

      </View>
    );
  }
}
CommentItem.propTypes = {
  item: PropTypes.object.isRequired,
};

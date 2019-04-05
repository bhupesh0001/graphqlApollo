// @flow
import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Linking,
  ScrollView,
  Share
} from "react-native";
import { Query } from "react-apollo";
import { Icon, Header } from "react-native-elements";
import { NavigationScreenProp, NavigationStateRoute } from "react-navigation";
import { FetchHackerNewsItem } from "../../../queries/hackerNews";
import {
  TOP_STORIES,
  POSTED_BY,
  CATEGORY,
  UPDATED,
  MORE_INFORMATION,
  COMMENTS,
  POINTS,
  DEFAULT_ITEM_TITLE
} from "../../../constants/staticText";
import { THEME_COLORS } from "../../../constants/colors";
import { DEFAULT_ITEM_ID } from "../../../constants/config";
import Comments from "../../../components/Comments";
import styles from "./style";

type Props = {
  navigation: NavigationScreenProp<NavigationStateRoute>
};
/**
 * @description(Render details of a HackerNews item that represented by itemId )
 *
 * @export
 * @class HackerNewsDetails
 * @extends {Component<Props>}
 */
export default class HackerNewsDetails extends Component<Props> {
  /**
   * @description(Return Left component of Header)
   *
   * @param {NavigationScreenProp<NavigationStateRoute>} navigation
   * @memberof HackerNewsDetails
   */
  _renderHeaderLeftComponent = (
    navigation: NavigationScreenProp<NavigationStateRoute>
  ) => (
    <Icon
      name="arrow-back"
      color={THEME_COLORS.iconBackground}
      onPress={() => navigation.goBack()}
    />
  );

  /**
   *
   *
   * @memberof HackerNewsDetails
   */
  _renderHeaderCenterComponent = () => (
    <Text style={styles.titleHeader}>{TOP_STORIES}</Text>
  );

  /**
   *
   *
   * @param {string} title
   * @memberof HackerNewsDetails
   */
  _renderHeaderRightComponent = (title: string) => (
    <Icon
      name="share"
      color={THEME_COLORS.iconBackground}
      onPress={() => this._onShare(title)}
    />
  );

  /**
   *
   *
   * @param {string} message
   * @memberof HackerNewsDetails
   */
  _onShare = async (message: string) => {
    await Share.share({
      message
    });
  };

  /**
   *
   * @description(render function to render on screen)
   * @returns
   * @memberof HackerNewsDetails
   */
  render() {
    const { navigation } = this.props;
    const itemDetails = navigation.getParam("itemTitle", DEFAULT_ITEM_TITLE);
    return (
      <View style={styles.container}>
        <Header
          leftComponent={this._renderHeaderLeftComponent(navigation)}
          centerComponent={this._renderHeaderCenterComponent}
          rightComponent={this._renderHeaderRightComponent(itemDetails)}
        />
        <ScrollView>
          <Text style={styles.title}>{itemDetails}</Text>
          <Query
            query={FetchHackerNewsItem}
            variables={{
              itemId: navigation.getParam("itemId", DEFAULT_ITEM_ID)
            }}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return (
                  <ActivityIndicator
                    style={styles.activityIndicator}
                    color={THEME_COLORS.activityIndicator}
                  />
                );
              }
              if (error) return <Text>{`Error: ${error}`}</Text>;
              const { item } = data.hn;
              return (
                <View>
                  <Text style={styles.category}>
                    {`${CATEGORY}${item.type}`}
                  </Text>
                  <View style={styles.pointPostedContainer}>
                    <Text style={styles.points}>
                      {`${POINTS}${item.score}`}
                    </Text>
                    <Text style={styles.postedBy}>
                      {`${POSTED_BY}${item.by.id}`}
                    </Text>
                  </View>
                  <Text style={styles.updated}>
                    {`${UPDATED}${new Date(item.timeISO).toUTCString()}`}
                  </Text>
                  <Text style={styles.moreInformation}>{MORE_INFORMATION}</Text>
                  <Text
                    style={styles.hyperlink}
                    onPress={() => Linking.openURL(item.url)}
                  >
                    {item.url}
                  </Text>
                  <Text style={styles.commentsText}>{COMMENTS}</Text>
                  <Comments items={item.kids} />
                </View>
              );
            }}
          </Query>
        </ScrollView>
      </View>
    );
  }
}

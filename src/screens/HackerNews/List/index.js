// @flow
import React, { Component } from "react";
import { FlatList, Text, ActivityIndicator, View } from "react-native";
import { Query } from "react-apollo";
import { Header, ListItem } from "react-native-elements";
import { NavigationScreenProp, NavigationStateRoute } from "react-navigation";
import { FetchHackerNewsTopStories } from "../../../queries/hackerNews";
import {
  PAGE_SIZE,
  INITIAL_NUMBER_RENDER_LIST,
  MAX_RENDER_PER_BATCH_LIST
} from "../../../constants/config";
import { TOP_STORIES, ERROR } from "../../../constants/staticText";
import { THEME_COLORS } from "../../../constants/colors";
import styles from "./style";

type Props = {
  navigation: NavigationScreenProp<NavigationStateRoute>
};
/**
 * @description(Render List of HackerNews)
 *
 * @export
 * @class HackerNewsList
 * @extends {Component<Props>}
 */
export default class HackerNewsList extends Component<Props> {
  constructor(props: Props) {
    super(props);
    (this: any).onItemPress = this.onItemPress.bind(this);
  }

  /**
   * @description(render List of Items)
   *
   * @param {*} { item }
   * @memberof HackerNewsList
   */
  _renderItem = ({ item }) => (
    <ListItem
      onPress={() => this.onItemPress(item.id, item.title)}
      title={item.title}
      key={item.id}
      chevron
      bottomDivider
    />
  );

  /**
   * @description (navigate to Detail screen)
   *
   * @param {string} itemId
   * @param {string} itemTitle
   * @memberof HackerNewsList
   */
  onItemPress(itemId: string, itemTitle: string) {
    const { navigation } = this.props;
    navigation.navigate("HackerNewsDetails", {
      itemId,
      itemTitle
    });
  }

  /**
   * @description(Return center component of Header)
   *
   * @memberof HackerNewsList
   */
  _renderHeaderCenterComponent = () => (
    <Text style={styles.titleHeader}>{TOP_STORIES}</Text>
  );

  /**
   * @description(Render HackerNews in List style)
   *
   * @memberof HackerNewsList
   */
  render() {
    return (
      <View style={styles.container}>
        <Header centerComponent={this._renderHeaderCenterComponent} />
        {/* Query to backend and update the UI */}
        <Query
          query={FetchHackerNewsTopStories}
          variables={{ pageSize: PAGE_SIZE, offset: 0 }}
        >
          {({ loading, error, data, fetchMore }) => {
            if (loading)
              return (
                <ActivityIndicator
                  style={styles.activityIndicator}
                  color={THEME_COLORS.activityIndicator}
                />
              );
            if (error) return <Text>{`${ERROR}${error}`}</Text>;
            return (
              <FlatList
                style={{ flex: 1 }}
                keyExtractor={item => item.id}
                data={data.hn.topStories}
                renderItem={item => this._renderItem(item)}
                initialNumToRender={INITIAL_NUMBER_RENDER_LIST}
                maxToRenderPerBatch={MAX_RENDER_PER_BATCH_LIST}
                onEndReachedThreshold={1}
                onEndReached={() => {
                  fetchMore({
                    variables: {
                      pageSize: PAGE_SIZE,
                      offset: data.hn.topStories.length + 1
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      // Don't do anything if there weren't any new items
                      if (
                        !fetchMoreResult ||
                        fetchMoreResult.hn.topStories.length === 0
                      ) {
                        return previousResult;
                      }
                      return {
                        // Concatenate the new feed results after the old ones
                        hn: {
                          __typename: previousResult.hn.__typename,
                          topStories: [
                            ...previousResult.hn.topStories,
                            ...fetchMoreResult.hn.topStories
                          ]
                        }
                      };
                    }
                  });
                }}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}

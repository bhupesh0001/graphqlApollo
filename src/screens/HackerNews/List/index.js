// @flow
import React, { Component } from "react";
import { FlatList, Text, ActivityIndicator, View } from "react-native";
import { Query } from "react-apollo";
import { Header, ListItem } from "react-native-elements";
import { NavigationScreenProp, NavigationStateRoute } from "react-navigation";
import { FetchHackerNewsTopStories } from "../../../queries/hackerNews";
import { PAGE_SIZE } from "../../../constants/config";
import { TOP_STORIES, ERROR } from "../../../constants/staticText";
import { THEME_COLORS } from "../../../constants/colors";
import styles from "./style";

type Props = {
  navigation: NavigationScreenProp<NavigationStateRoute>
};
/**
 *@description(Render List of HackerNews)
 *
 * @export
 * @class HackerNewsList
 * @extends {Component<Props>}
 */
export default class HackerNewsList extends Component<Props> {
  // render Item of Flatlist
  _renderItem = ({ item }) => (
    <ListItem
      onPress={() => {
        /* 1. Navigate to the Details route with params */
        this.props.navigation.navigate("HackerNewsDetails", {
          itemId: item.id,
          itemTitle: item.title
        });
      }}
      title={item.title}
      key={item.id}
      chevron
      bottomDivider
    />
  );

  _renderHeaderCenterComponent = () => (
    <Text style={styles.titleHeader}>{TOP_STORIES}</Text>
  );

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
                initialNumToRender={12}
                maxToRenderPerBatch={2}
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

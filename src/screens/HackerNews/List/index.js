// @flow
import React, { Component } from "react";
import { FlatList, Text, ActivityIndicator } from "react-native";
import { Query } from "react-apollo";
import {
  Container,
  Header,
  Body,
  Title,
  ListItem,
  Left,
  Right,
  Icon
} from "native-base";
import { NavigationScreenProp, NavigationStateRoute } from "react-navigation";
import { FetchHackerNewsTopStories } from "../../../queries/hackerNews";
import { PAGE_SIZE } from "../../../constants/config";
import { TOP_STORIES, ERROR } from "../../../constants/staticText";
import styles from "./style";

type Props = {
  navigation: NavigationScreenProp<NavigationStateRoute>
};
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
    >
      <Left>
        <Text>{item.title}</Text>
      </Left>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  );

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>{TOP_STORIES}</Title>
          </Body>
        </Header>
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
                  size="small"
                  color="#00ff00"
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
      </Container>
    );
  }
}

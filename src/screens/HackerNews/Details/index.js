import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Linking,
  ScrollView
} from "react-native";
import { Query } from "react-apollo";
import {
  Container,
  Header,
  Title,
  Left,
  Icon,
  Button,
  Right
} from "native-base";
import { FetchHackerNewsItem } from "../../../queries/hackerNews";
import {
  TOP_STORIES,
  POSTED_BY,
  CATEGORY,
  UPDATED,
  MORE_INFORMATION,
  COMMENTS,
  POINTS
} from "../../../constants/staticText";
import Comments from "../../../components/Comments";
import styles from "./style";

export default class HackerNewsDetails extends Component {
  // render function to render on screen
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                // Back to List Screen
                navigation.goBack();
              }}
            >
              <Icon name="arrow-back" />
              <Title>{TOP_STORIES}</Title>
            </Button>
          </Left>
          <Right />
        </Header>
        <ScrollView>
          <Text style={styles.title}>
            {navigation.getParam("itemTitle", "Details")}
          </Text>
          <Query
            query={FetchHackerNewsItem}
            variables={{ itemId: navigation.getParam("itemId", "34") }}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return <ActivityIndicator size="small" color="#00ff00" />;
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
      </Container>
    );
  }
}

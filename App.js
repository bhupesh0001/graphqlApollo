import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { GRAPHQLHUB_URL } from "./src/constants/config";
import AppNavigator from "./src/navigation/appNavigator";

/**
 * @description(create apolloclient with uri point to grapghql hub)
 */
const client = new ApolloClient({
  uri: GRAPHQLHUB_URL
});
/**
 *
 *
 * @export
 * @class App
 * @extends {Component}
 */
export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    );
  }
}

import gql from 'graphql-tag';

const FetchHackerNewsTopStories = gql`

  query ($pageSize: Int!, $offset: Int!) {
    hn{
      topStories(limit: $pageSize, offset: $offset) {
        id
        title
      }
    }
  }
`;

const FetchHackerNewsNewStories = gql`

query ($pageSize: Int!, $offset: Int!) {
  hn{
    newStories(limit: $pageSize, offset: $offset) {
      id
      title
    }
  }
}
`;

const FetchHackerNewsItem = gql`
query ($itemId: Int!) {
  hn{
    item(id: $itemId) {
      url
      type
      time
      score
      url
      by {
        id
      }
      kids {
        id
        text
        timeISO
        by {
          id
        }
      }
    }
  }
}
`;


export { FetchHackerNewsItem, FetchHackerNewsNewStories, FetchHackerNewsTopStories };

import gql from 'graphql-tag';

const FetchHackerNewsTopStories = gql`

  query ($pageSize: Int!, $offset: Int!) {
    hn{
      topStories(limit: $pageSize, offset: $offset) {
        id
        title
        type
        time
        timeISO
        score
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
      type
      time
      timeISO
      score
    }
  }
}
`;

const FetchHackerNewsItem = gql`
query ($itemId: Int!) {
  hn{
    item(id: $itemId) {
      title
      url
      type
      time
      score
      descendants
      url
      by {
        id
      }
      kids {
        type
        time
        text
        by {
          id
        }
      }
    }
  }
}
`;


export { FetchHackerNewsItem, FetchHackerNewsNewStories, FetchHackerNewsTopStories };

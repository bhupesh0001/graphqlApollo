import gql from "graphql-tag";
/**
 * @description Query to fetch Top Stories of HackerNews
 */
const FetchHackerNewsTopStories = gql`
  query($pageSize: Int!, $offset: Int!) {
    hn {
      topStories(limit: $pageSize, offset: $offset) {
        id
        title
      }
    }
  }
`;
/**
 * @description Query to fetch New Stories of HackerNews
 */
const FetchHackerNewsNewStories = gql`
  query($pageSize: Int!, $offset: Int!) {
    hn {
      newStories(limit: $pageSize, offset: $offset) {
        id
        title
      }
    }
  }
`;
/**
 * @description Query to fetch HackerNews item by itemId
 */
const FetchHackerNewsItem = gql`
  query($itemId: Int!) {
    hn {
      item(id: $itemId) {
        url
        type
        timeISO
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

export {
  FetchHackerNewsItem,
  FetchHackerNewsNewStories,
  FetchHackerNewsTopStories
};

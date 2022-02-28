import { gql } from "@apollo/client";

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
    id
    user {
      username
      id
    }
  }
`;

const FOR_CACHE_AUTH_BOOK = gql`
fragment CacheData on Book {
  title
      author {
        ...AuthorDetails
      }
      published
      genres
      id
      user {
        username
        id
      }
}
${AUTHOR_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const ALL_BOOKS = gql`
  query ($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        ...AuthorDetails
      }
      published
      genres
      id
      user {
        username
        id
      }
    }
  }
  ${AUTHOR_DETAILS}
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornAt: Int!) {
    editAuthor(name: $name, setBornAt: $setBornAt) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`;

export const ALL_CACHE = gql`
  query AllCache($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
    allAuthors {
      ...AuthorDetails
    }
  }
  ${BOOK_DETAILS}
  ${AUTHOR_DETAILS}
`;

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...CacheData
  }
}
${FOR_CACHE_AUTH_BOOK}
`
const { gql } = require("apollo-server");

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    books: [Book]
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    user: User!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    books: [Book]
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
    allUsers: [User]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book!

    editAuthor(name: String!, setBornAt: Int!): Author

    createUser(
      username: String!
      favoriteGenre: String!
      password: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`;

module.exports = typeDefs 
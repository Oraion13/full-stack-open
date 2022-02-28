const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub()

const Subscription = {
    bookAdded: {
        subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
    }
}

module.exports = { pubsub, Subscription }
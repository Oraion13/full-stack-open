const { UserInputError } = require("apollo-server");
const Book = require("../../models/book");
const Author = require("../../models/author");

Not this

const Mutation = {
    addBook: async (root, args) => {
        if(!args.title || !args.author || !args.published || !args.genres){
            throw new UserInputError("Args missing", {
                invalidArgs: "some args are missing"
            })
        }

        const book = new Book({
            title: args.title,
            author: args.author,

        })
    }
}

module.exports = Mutation;
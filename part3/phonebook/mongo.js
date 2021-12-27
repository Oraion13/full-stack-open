const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://oraion:${password}@cluster0.ykelk.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const bookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Book = mongoose.model("Contact", bookSchema);

if (process.argv.length < 4) {
  Book.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(contact);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length < 5) {
  console.log("Missing name or number");
  process.exit(1);
} else {
  const contact = new Book({
    name: process.argv[3],
    number: process.argv[4],
  });

  contact.save().then((result) => {
    console.log(
      `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    );
    mongoose.connection.close();
  });
}

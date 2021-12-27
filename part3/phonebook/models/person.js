const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connencting to DB");

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log("error connecting to mongodb:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3 },
  number: { type: String, required: true, unique: true, minlength: 8 },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});


module.exports = mongoose.model("Person", personSchema);
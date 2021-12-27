require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
app.use(express.static("build"));

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);
app.use(cors());

morgan.token("data", (req, res) => JSON.stringify(req.body));

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

//Intital page
app.get("/", (request, response) => {
  response.send("Navigate to /api/persons to see details");
});

//To get the persons details
app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

//Access the info
app.get("/info", (request, response) => {
  Person.countDocuments().then((count) => {
    console.log("Total Docs:", count);
    response.send(
      `Phonebook has info for ${count} people` +
        "<br /><br />" +
        `${new Date()}`
    );
  });
});

//To get person info by id
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));

  //const id = Number(request.params.id);

  // const person = persons.find((person) => person.id === id);
  // if (person) response.json(person);
  // else response.status(404).end();
});

//Delete details for the given id
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(200).end();
    })
    .catch((error) => next(error));

  // const id = Number(request.params.id);
  // persons = persons.filter((person) => person.id !== id);

  // response.status(200).end();
});

//Update person
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson.toJSON());
    })
    .catch((error) => next(error));
});

//Add new person
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (body.name === "") {
    return response.status(400).json({
      error: "name missing",
    });
  } else if (body.number === "") {
    return response.status(400).json({
      error: "number missing",
    });
  }
  // else if (persons.find((person) => person.name === body.name)) {
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  const person = new Person({

    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedNote) => savedNote.toJSON())
    .then((savedAndFormattedPerson) => {
      console.log("Added new Person");
      response.json(savedAndFormattedPerson);
    })
    .catch((error) => next(error));

  //persons = persons.concat(person);

  //response.json(person);
});

//Error Handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if(error.name === "ValidationError"){
    return response.status(400).send({ error: error.message })
  }
  if(error.name === "createError"){
    return response.status(400).send({ error: error.message })
  }

  next(error);
};

app.use(errorHandler);

//Listining port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  //const port = app.address().port;
  console.log(`Server running in port: ${PORT}`);
});

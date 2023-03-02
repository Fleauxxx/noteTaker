const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("./helpers/uuid");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  let notesJson = fs.readFileSync("db/db.json");
    let notes = JSON.parse(notesJson);
    res.json(notes)
});

// Post request to add a note
app.post("/api/notes", (req, res) => {
  // Log that a Post request was received
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  console.log(text);
  console.log(title);

  // if all requirement properties are present
  if (title && text) {
    // variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };
    console.log(newNote);

    // Convert the data to a string so we can save it
    const noteString = JSON.stringify(newNote);

    let notesJson = fs.readFileSync("db/db.json");

    let notes = JSON.parse(notesJson);

    notes.push(newNote);

    notesJson = JSON.stringify(notes);

    fs.writeFileSync("db/db.json", notesJson, (err) =>
      err
        ? console.error(err)
        : console.log(`Note for ${newNote.title} has been written to JSON file`)
    );

    const response = {
      status: "success",
      body: noteString,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in adding note");
  }
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

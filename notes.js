const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your notes";
};

const addNotes = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes); //save the note to file system
  } else {
    console.log("Title already taken");
  }
};

const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJSON);
};
const loadNotes = () => {
  try {
    const databuffer = fs.readFileSync("notes.json");
    const databufferjson = databuffer.toString();
    return JSON.parse(databufferjson);
  } catch (e) {
    return [];
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);
  if (filteredNotes.length === notes.length) {
    console.log(chalk.red("Note not found!"));
  } else {
    saveNotes(filteredNotes);
    console.log(chalk.green("Note removed"));
  }
};

const listNotes = () => {
  console.log(chalk.green("Your notes:"));
  const notes = loadNotes();
  notes.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((nt) => nt.title === title);
  if (note) {
    console.log(chalk.green(note.title) +" " +note.body);
  } else {
    console.log(chalk.red("No note found!"));
  }
};

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};

const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

//Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Description",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNotes(argv.title, argv.body);
  },
});
//Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Title of the Note to be removed",
      demandoption: true,
      type: "string",
    },
  },
  handler: (argv) => notes.removeNote(argv.title),
});
//Create list command
yargs.command({
  command: "list",
  describe: "show the lists",
  handler: () => notes.listNotes(),
});
//Create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => notes.readNote(argv.title),
});

//add,remove,read,list
yargs.parse();

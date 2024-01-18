const express = require("express");
const router = express.Router();
const checkMillionDollarIdea = require("./checkMillionDollarIdea");

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

// GET all ideas
router.get("/", (req, res) => {
  const ideas = getAllFromDatabase("ideas");
  res.status(200).send(ideas);
});

// GET idea by ID
router.get("/:ideaId", (req, res) => {
  const { ideaId } = req.params;
  const idea = getFromDatabaseById("ideas", ideaId);
  if (!idea) {
    res.status(404).send("Idea not found!");
  } else {
    res.status(200).send(idea);
  }
});

// Create new idea
router.post("/", checkMillionDollarIdea, (req, res) => {
  const idea = req.body;
  const savedIdea = addToDatabase("ideas", idea);
  if (!savedIdea) {
    res.status(400).send("There was an error saving the idea");
  } else {
    res.status(201).send(savedIdea);
  }
});
// Update  idea by ID
router.put("/:ideaId", (req, res) => {
  const idea = req.body;
  const updatedIdea = updateInstanceInDatabase("ideas", idea);
  if (!updatedIdea) {
    res.status(404).send("There was an error updating the idea");
  } else {
    res.status(200).send(updatedIdea);
  }
});

//DELETE idea by ID
router.delete("/:ideaId", (req, res) => {
  const { ideaId } = req.params;
  const isDeleted = deleteFromDatabasebyId("ideas", ideaId);
  if (!isDeleted) {
    res.status(404).send();
  } else {
    res.status(204).send();
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");
const workRouter = require("./workRouter");

router.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (!minion) {
    res.status(404).send("Minion not found");
  } else {
    req.id = id;
    req.minion = minion;
    next();
  }
});

// GET minions
router.get("/", (req, res) => {
  const minions = getAllFromDatabase("minions");
  res.status(200).send(minions);
});
// GET minion by id
router.get("/:minionId", (req, res) => {
  const { minion } = req;
  res.status(200).send(minion);
});

// Create a minion to DB
router.post("/", (req, res, next) => {
  const { name, title, salary, weaknesses } = req.body;

  const minion = addToDatabase("minions", { name, title, salary, weaknesses });
  res.status(201).send(minion);
});

// Updated a minion by ID
router.put("/:minionId", (req, res) => {
  const minion = req.body;
  const updatedMinion = updateInstanceInDatabase("minions", minion);

  if (!updatedMinion) {
    res.status(400).send("Something went wrong!");
  } else {
    res.status(200).send(updatedMinion);
  }
});

router.delete("/:minionId", (req, res) => {
  const deletedMinion = deleteFromDatabasebyId("minions", req.id);
  if (!deletedMinion) {
    res.status(404).send("Minion not found");
  } else {
    res.status(204).send();
  }
});

router.use("/:minionId/work", workRouter);

module.exports = router;

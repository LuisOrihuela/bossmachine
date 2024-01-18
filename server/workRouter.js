const express = require("express");
const { getFromDatabaseById, getAllFromDatabase } = require("./db");
const router = express.Router();

router.param("minionId", (req, res, next, id) => {
  req.id = id;
  next();
});

router.get("/", (req, res) => {
  const work = getFromDatabaseById("work", req.id);
  if (work) {
    res.status(200).send([work]);
  } else {
    res.status(404).send();
  }
});

module.exports = router;

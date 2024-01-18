const express = require("express");
const router = express.Router();

const {
  getAllFromDatabase,
  createMeeting,
  addToDatabase,
  deleteAllFromDatabase,
} = require("./db");

router.get("/", (req, res) => {
  const meetings = getAllFromDatabase("meetings");

  res.status(200).send(meetings);
});

router.post("/", (req, res) => {
  const meeting = createMeeting();
  const createdMeeting = addToDatabase("meetings", meeting);
  if (meeting) {
    res.status(201).send(createdMeeting);
  } else {
    res.status(400).send();
  }
});

router.delete("/", (req, res) => {
  const meetings = deleteAllFromDatabase("meetings");
  if (meetings) {
    res.status(204).send();
  } else {
    res.status(400).send();
  }
});

module.exports = router;

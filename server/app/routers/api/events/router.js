const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  add,
  editValidate,
} = require("../../../controllers/eventActions");

router.get("/", browse);
router.get("/:id", read);
router.post("/", add);
router.patch("/:id", editValidate);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  dashboardStats,
  getUsers,
} = require("../controllers/adminController");

router.get("/stats", dashboardStats);
router.get("/users", getUsers);

module.exports = router;
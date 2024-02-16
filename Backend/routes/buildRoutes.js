const express = require("express");
const router = express.Router();
const buildController = require("../controllers/buildController");
const authMiddleware = require("../middleware/authMiddleware");

// Route for creating a new build
router.post("/", buildController.createBuild);

// Route for getting all builds for a user
router.get("/:userId", authMiddleware, buildController.getUserBuilds);

// Route for updating a build
router.put("/:buildId", authMiddleware, buildController.updateBuild);

// Route for deleting a build
router.delete("/:buildId", authMiddleware, buildController.deleteBuild);

module.exports = router;

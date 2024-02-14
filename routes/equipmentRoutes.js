const express = require("express");
const router = express.Router();

const equipmentController = require("../controllers/equipmentController");

// GET /api/equipment (get all equipment)
router.get("/", equipmentController.getAll);

// POST /api/equipment (create new equipment)
router.post("/", equipmentController.create);

// GET /api/equipment/:id (get equipment by ID)
router.get("/:id", equipmentController.getById);

// PUT /api/equipment/:id (update equipment by ID)
router.put("/:id", equipmentController.update);

// DELETE /api/equipment/:id (delete equipment by ID)
router.delete("/:id", equipmentController.delete);

module.exports = router;

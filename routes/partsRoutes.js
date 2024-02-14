const express = require("express");
const router = express.Router();

const partsController = require("../controllers/partsController");

// GET /api/parts (get all parts)
router.get("/", partsController.getAll);

// POST /api/parts (create new parts)
router.post("/", partsController.create);

// GET /api/parts/:id (get parts by ID)
router.get("/:id", partsController.getById);

// PUT /api/parts/:id (update parts by ID)
router.put("/:id", partsController.update);

// DELETE /api/parts/:id (delete parts by ID)
router.delete("/:id", partsController.delete);

module.exports = router;

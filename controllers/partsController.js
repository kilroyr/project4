const PartDB = require("../models/parts");
const validatePart = require("../validators/PartValidator");

// GET /api/Part (get all Part)
const getAll = async (req, res) => {
  try {
    const Part = await PartDB.find();
    return res.json(Part);
  } catch (error) {
    console.log("getAll Part error", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// POST /api/Part (create new Part)
const create = async (req, res) => {
  try {
    const { error } = validatePart(req.body);
    if (error)
      return res.status(400).json({
        error: error.details[0].message,
      });

    const PartData = await new PartDB(req.body).save();

    return res.json({
      message: "Part created successfully",
      PartId: PartData._id,
    });
  } catch (error) {
    console.log("create Part error", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// GET /api/Part/:id (get Part by ID)
const getById = async (req, res) => {
  try {
    const Part = await PartDB.findById(req.params.id);
    if (!Part) {
      return res.status(404).json({
        error: "Part not found",
      });
    }
    return res.json(Part);
  } catch (error) {
    console.log("getById Part error", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// PUT /api/Part/:id (update Part by ID)
const update = async (req, res) => {
  try {
    const { error } = validatePart(req.body);
    if (error)
      return res.status(400).json({
        error: error.details[0].message,
      });

    const updatedPart = await PartDB.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPart) {
      return res.status(404).json({
        error: "Part not found",
      });
    }
    return res.json({
      message: "Part updated successfully",
      Part: updatedPart,
    });
  } catch (error) {
    console.log("update Part error", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// DELETE /api/Part/:id (delete Part by ID)
const remove = async (req, res) => {
  try {
    const deletedPart = await PartDB.findByIdAndRemove(req.params.id);
    if (!deletedPart) {
      return res.status(404).json({
        error: "Part not found",
      });
    }
    return res.json({
      message: "Part deleted successfully",
      Part: deletedPart,
    });
  } catch (error) {
    console.log("remove Part error", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
};

const equipmentDB = require("../models/equipment");
const validateEquipment = require("../validators/equipmentValidator");

// Handler function for creating equipment
const createEquipment = async (req, res) => {
  try {
    // Validate the request body
    const { error } = validateEquipment(req.body);
    if (error)
      return res.status(400).json({
        error: error.details[0].message,
      });

    // Create a new equipment document and save it to the database
    const equipmentData = await new equipmentDB(req.body).save();

    // Return success response with the equipment ID
    return res.json({
      message: "Equipment created successfully",
      equipmentId: equipmentData._id,
    });
  } catch (error) {
    // Handle errors
    console.log("createEquipment error", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = createEquipment;

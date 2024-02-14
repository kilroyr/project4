const Joi = require("joi");

// Validation function for equipment data
const validateEquipment = (equipmentData) => {
  const schema = Joi.object({
    type: Joi.string().required(), // Validate type field as required string
    model: Joi.string().required(), // Validate model field as required string
    modification: Joi.string(), // Validate modification field as optional string
  });

  // Validate against the schema
  return schema.validate(equipmentData);
};

module.exports = validateEquipment;

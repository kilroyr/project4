const Joi = require("joi");

// Validation function for equipment data
const validateEquipment = (equipmentData) => {
  const schema = Joi.object({
    name: Joi.string().required(), // Validate type field as required string
    price: Joi.string().number(), // Validate model field as required Number
  });

  // Validate against the schema
  return schema.validate(equipmentData);
};

module.exports = validateEquipment;

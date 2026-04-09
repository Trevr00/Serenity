const Joi = require("joi");

/**
 * Returns an Express middleware that validates req.body against a Joi schema.
 * On failure it responds 422 with the first validation error message.
 */
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: true, stripUnknown: true });
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }
  next();
};

// ── Schemas ───────────────────────────────────────────────────────────────────

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
  phone: Joi.string()
    .trim()
    .pattern(/^[\d\s+\-()]{7,20}$/)
    .required()
    .messages({ "string.pattern.base": "Please provide a valid phone number." }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

const bookingSchema = Joi.object({
  service: Joi.string()
    .valid(
      "Shaving Parlour",
      "Full Body Massage",
      "Mini-Gym",
      "Sauna",
      "Steam Bath",
      "Manicure & Pedicure",
      "Hairstylist"
    )
    .required(),
  packageName: Joi.string().trim().max(100).optional().allow("", null),
  date: Joi.date().iso().min("now").required().messages({
    "date.min": "Booking date must be in the future.",
  }),
  time: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .required()
    .messages({ "string.pattern.base": "Time must be in HH:MM format." }),
  notes: Joi.string().trim().max(500).optional().allow("", null),
  amount: Joi.number().min(0).optional(),
});

const mpesaInitSchema = Joi.object({
  bookingId: Joi.string().hex().length(24).required(),
  phone: Joi.string()
    .pattern(/^(254|0|07|01)\d{8,9}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone must be a valid Kenyan number (e.g. 0712345678 or 254712345678).",
    }),
  amount: Joi.number().integer().min(1).required(),
});

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  bookingSchema,
  mpesaInitSchema,
};

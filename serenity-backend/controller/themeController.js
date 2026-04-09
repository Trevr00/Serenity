const Theme = require("../models/theme");

// ── Default palettes ──────────────────────────────────────────────────────────
const DEFAULT_THEMES = [
  {
    name: "Serenity Rose",
    slug: "serenity-rose",
    isDefault: true,
    isActive: true,
    colors: {
      primary:    "#de6d93",
      secondary:  "#a591db",
      background: "#fdf7fa",
      accent:     "#f7c5d4",
      text:       "#2e1629",
    },
  },
  {
    name: "Calm Nature",
    slug: "calm-nature",
    isDefault: true,
    colors: {
      primary:    "#6B8E7A",
      secondary:  "#A8C3A0",
      background: "#F4F7F5",
      accent:     "#DCE5DC",
      text:       "#2F3E34",
    },
  },
  {
    name: "Luxury Spa",
    slug: "luxury-spa",
    isDefault: true,
    colors: {
      primary:    "#C6A769",
      secondary:  "#1E2A28",
      background: "#F8F6F2",
      accent:     "#E5D3A1",
      text:       "#111111",
    },
  },
  {
    name: "Soft Feminine Wellness",
    slug: "soft-feminine",
    isDefault: true,
    colors: {
      primary:    "#E8B4B8",
      secondary:  "#F6D6D8",
      background: "#FFF8F9",
      accent:     "#D4A5A5",
      text:       "#4A3A3A",
    },
  },
  {
    name: "Aqua Therapy",
    slug: "aqua-therapy",
    isDefault: true,
    colors: {
      primary:    "#5DA9A6",
      secondary:  "#A3D5D3",
      background: "#F0FBFB",
      accent:     "#D6F0EF",
      text:       "#1F3A3A",
    },
  },
  {
    name: "Dark Zen",
    slug: "dark-zen",
    isDefault: true,
    colors: {
      primary:    "#7ED1B2",
      secondary:  "#2C2C2C",
      background: "#181818",
      accent:     "#7ED1B2",
      text:       "#EAEAEA",
    },
  },
];

const seedIfEmpty = async () => {
  const count = await Theme.countDocuments();
  if (count === 0) {
    await Theme.insertMany(DEFAULT_THEMES);
  }
};

// ── Controllers ───────────────────────────────────────────────────────────────

/**
 * GET /api/themes
 * Returns all themes (seeds defaults if collection is empty)
 */
exports.getThemes = async (req, res, next) => {
  try {
    await seedIfEmpty();
    const themes = await Theme.find().sort({ isDefault: -1, createdAt: 1 });
    res.json({ themes });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/themes/active  (public)
 * Returns the currently active theme's colors
 */
exports.getActiveTheme = async (req, res, next) => {
  try {
    await seedIfEmpty();
    const theme = await Theme.findOne({ isActive: true });
    res.json({ theme: theme || null });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/themes/apply
 * Set a theme as active (deactivates all others)
 */
exports.applyTheme = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(422).json({ error: "Theme id is required." });

    const theme = await Theme.findById(id);
    if (!theme) return res.status(404).json({ error: "Theme not found." });

    await Theme.updateMany({}, { isActive: false });
    theme.isActive = true;
    await theme.save();

    res.json({ theme });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/themes
 * Create a custom theme
 */
exports.createTheme = async (req, res, next) => {
  try {
    const { name, colors } = req.body;
    if (!name || !colors) return res.status(422).json({ error: "name and colors are required." });

    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now();

    const theme = await Theme.create({
      name,
      slug,
      colors,
      isCustom: true,
      createdBy: req.user._id,
    });

    res.status(201).json({ theme });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/themes/:id
 * Update a custom theme's colors or name
 */
exports.updateTheme = async (req, res, next) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (!theme) return res.status(404).json({ error: "Theme not found." });
    if (!theme.isCustom) return res.status(403).json({ error: "Built-in themes cannot be edited." });

    const { name, colors } = req.body;
    if (name) theme.name = name;
    if (colors) theme.colors = { ...theme.colors, ...colors };
    await theme.save();

    res.json({ theme });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/themes/:id
 * Delete a custom theme
 */
exports.deleteTheme = async (req, res, next) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (!theme) return res.status(404).json({ error: "Theme not found." });
    if (!theme.isCustom) return res.status(403).json({ error: "Built-in themes cannot be deleted." });
    if (theme.isActive) return res.status(400).json({ error: "Cannot delete the active theme." });

    await theme.deleteOne();
    res.json({ message: "Theme deleted." });
  } catch (err) {
    next(err);
  }
};

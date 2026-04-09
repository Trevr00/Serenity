const Package = require("../models/package");

/**
 * GET /api/admin/packages
 * List all packages (admin view — includes inactive)
 */
exports.getPackages = async (req, res, next) => {
  try {
    const packages = await Package.find().sort({ price: 1 });
    res.json({ packages });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/packages (public)
 * List active packages only
 */
exports.getPublicPackages = async (req, res, next) => {
  try {
    const packages = await Package.find({ isActive: true }).sort({ price: 1 });
    res.json({ packages });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/packages
 * Create a new package
 */
exports.createPackage = async (req, res, next) => {
  try {
    const { name, slug, tagline, description, price, billingCycle, duration, features, isActive, isPopular } =
      req.body;

    const pkg = await Package.create({
      name,
      slug,
      tagline,
      description,
      price,
      billingCycle,
      duration,
      features,
      isActive,
      isPopular,
      priceHistory: [{ price, changedBy: req.user._id }],
    });

    res.status(201).json({ package: pkg });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/admin/packages/:id
 * Update a package (tracks price history if price changed)
 */
exports.updatePackage = async (req, res, next) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ error: "Package not found." });

    const { name, slug, tagline, description, price, billingCycle, duration, features, isActive, isPopular } =
      req.body;

    if (price !== undefined && price !== pkg.price) {
      pkg.priceHistory.push({ price, changedBy: req.user._id });
    }

    Object.assign(pkg, {
      ...(name !== undefined && { name }),
      ...(slug !== undefined && { slug }),
      ...(tagline !== undefined && { tagline }),
      ...(description !== undefined && { description }),
      ...(price !== undefined && { price }),
      ...(billingCycle !== undefined && { billingCycle }),
      ...(duration !== undefined && { duration }),
      ...(features !== undefined && { features }),
      ...(isActive !== undefined && { isActive }),
      ...(isPopular !== undefined && { isPopular }),
    });

    await pkg.save();
    res.json({ package: pkg });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/admin/packages/:id
 * Delete a package
 */
exports.deletePackage = async (req, res, next) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ error: "Package not found." });
    res.json({ message: "Package deleted successfully." });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/admin/packages/bulk-price
 * Bulk price update by percentage
 */
exports.bulkPriceUpdate = async (req, res, next) => {
  try {
    const { percentage, ids } = req.body;
    if (typeof percentage !== "number") {
      return res.status(422).json({ error: "percentage must be a number." });
    }

    const filter = ids?.length ? { _id: { $in: ids } } : {};
    const packages = await Package.find(filter);

    await Promise.all(
      packages.map(async (pkg) => {
        const newPrice = Math.round(pkg.price * (1 + percentage / 100));
        pkg.priceHistory.push({ price: newPrice, changedBy: req.user._id });
        pkg.price = newPrice;
        return pkg.save();
      })
    );

    res.json({ message: `Updated ${packages.length} packages by ${percentage}%.` });
  } catch (err) {
    next(err);
  }
};

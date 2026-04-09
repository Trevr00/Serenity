const AuditLog = require("../models/auditLog");

/**
 * Creates an audit log entry. Safe to call fire-and-forget (errors are swallowed).
 */
const logAction = async ({ admin, action, resource, resourceId, details, ip }) => {
  try {
    await AuditLog.create({ admin, action, resource, resourceId, details, ip });
  } catch {
    // Never let audit logging break the primary request
  }
};

/**
 * Express middleware factory — logs admin actions automatically.
 * Usage: router.post('/users/:id/role', protect, adminOnly, auditMiddleware('ROLE_CHANGE', 'User'), handler)
 */
const auditMiddleware = (action, resource, getResourceId = (req) => req.params.id) => {
  return (req, _res, next) => {
    const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress;
    // Fire-and-forget — don't await
    logAction({
      admin: req.user._id,
      action,
      resource,
      resourceId: getResourceId(req),
      details: { body: req.body, query: req.query },
      ip,
    });
    next();
  };
};

module.exports = { logAction, auditMiddleware };
